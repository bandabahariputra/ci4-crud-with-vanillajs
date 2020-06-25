// fungsi untuk mengirim HTTP Request
const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
    })
        .then(response => response.json())
}

// fungsi untuk fetch data ke tabel
const fetchData = async () => {
    const users = await sendHttpRequest('GET', 'http://localhost:8080/user').then(result => result);
    const tr = loopTr(users);
    const tbody = showTbody(tr);
    const table = document.querySelector('.table');
    table.innerHTML = showTable(tbody);
}

// menjalankan fungsi fetch data
fetchData();

// fungsi untuk looping data
const loopTr = data => {
    let tr = '';
    data.forEach(item => {
        tr += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.username}</td>
                <td>${item.role}</td>
                <td>
                    <button class="btn btn-sm btn-success btn-edit" data-id="${item.id}">Edit</button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}" data-name="${item.name}">Hapus</button>
                </td>
            </tr>
        `;
    });

    return tr;
}

// fungsi untuk menampilkan looping ke tbody
const showTbody = tr => {
    return `<tbody>${tr}</tbody>`;
}

// fungsi untuk menampilkan tabel
const showTable = tbody => {
    return `<table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Aksi</th>
            </tr>
        </thead>
        ${tbody}
    </table>`;
}

// modal form
const modal = new bootstrap.Modal(document.querySelector('.modal'), { backdrop: 'static' });

// judul modal
const modalTitle = document.querySelector('.modal-title');

// fungsi tutup modal
const closeModal = () => {
    modal.hide();
    inputId.value = '';
    inputName.value = '';
    inputEmail.value = '';
    inputUsername.value = '';
    inputRole.value = '';
    modalTitle.innerHTML = '';
    btnSave.innerHTML = 'Simpan';
}

// ketika tombal tambah diklik
const btnTambah = document.querySelector('.btn-tambah');
btnTambah.addEventListener('click', () => {
    modalTitle.innerHTML = 'Tambah User';
    modal.show();
});

// ketika tombol batal yang ada di modal diklik
const btnCloseModal = document.querySelector('.btn-close-modal');
btnCloseModal.addEventListener('click', () => {
    closeModal();
});

const inputId = document.querySelector('.input-id');
const inputName = document.querySelector('.input-name');
const inputEmail = document.querySelector('.input-email');
const inputUsername = document.querySelector('.input-username');
const inputRole = document.querySelector('.input-role');
const btnSave = document.querySelector('.btn-save');

const field = [inputName, inputEmail, inputUsername, inputRole];

// form validation
const requireValidation = () => {
    for (let i = 0; i < field.length; i++) {
        if (field[i].value == '') {
            field[i].classList.add('is-invalid');
        }
    }
}

// ketika field diisi
for (let i = 0; i < field.length; i++) {
    field[i].addEventListener('keyup', function () {
        field[i].classList.remove('is-invalid');
    });
}

// fungsi jika validasi terpenuhi
const successValidation = () => {
    if (
        inputName.value !== '' &&
        inputEmail.value !== '' &&
        inputUsername.value !== '' &&
        inputRole.value !== ''
    ) {
        return true
    }
}

// ketika tombol simpan yang ada di modal diklik
btnSave.addEventListener('click', function (e) {
    e.preventDefault();

    requireValidation();

    if (successValidation() === true) {
        const data = {
            id: inputId.value,
            name: inputName.value,
            email: inputEmail.value,
            username: inputUsername.value,
            role: inputRole.value,
        };
        saveData(data);
    }
});

// fungsi simpan data
const saveData = data => {
    // kalau ada id maka update data
    // kalau tidak ada id maka create data
    btnSave.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    setTimeout(() => {
        if (data.id !== '') {
            updateData(data);
        } else {
            createData(data);
        }
    }, 1000);
}

// fungsi create data
const createData = data => {
    sendHttpRequest('POST', 'http://localhost:8080/user', data).then(result => {
        closeModal();
        showAlert('Data berhasil ditambahkan.');
        fetchData();
    });
}

// fungsi update data
const updateData = data => {
    sendHttpRequest('PUT', 'http://localhost:8080/user', data).then(result => {
        closeModal();
        showAlert('Data berhasil diedit.');
        fetchData();
    });
}

// fungsi hapus data
const deleteData = id => {
    sendHttpRequest('DELETE', 'http://localhost:8080/user', { id: id }).then(result => {
        closeModalConfirm();
        showAlert('Data berhasil dihapus.');
        fetchData();
    });
}

// alert
const showAlert = msg => {
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.innerHTML = `<div class="alert alert-success fade show" role="alert">${msg}</div>`;
    setTimeout(() => {
        const alertNode = document.querySelector('.alert');
        const alert = new bootstrap.Alert(alertNode);
        alert.close();
    }, 1000);
}

// ketika salah satu tombol edit diklik
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.dataset.id;
        const user = await sendHttpRequest('GET', `http://localhost:8080/user/${id}`).then(result => result);
        inputId.value = user.id;
        inputName.value = user.name;
        inputEmail.value = user.email;
        inputUsername.value = user.username;
        inputRole.value = user.role;
        modalTitle.innerHTML = 'Edit User';
        modal.show();
    }
});

// ketika salah satu tombol hapus diklik
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        showModalConfirm(id, name);
    }
});

// modal konfirmasi
const modalConfirm = new bootstrap.Modal(document.querySelector('.modal-confirm'), { backdrop: 'static' });

// fungsi untuk menampilkan modal konfirmasi
const showModalConfirm = (id, name) => {
    const nameOnModal = document.querySelector('.name-on-modal');
    btnDeleteYa.dataset.id = id;
    nameOnModal.innerHTML = name;
    modalConfirm.show();
}

// fungsi tutup modal konfirmasi
const closeModalConfirm = () => {
    modalConfirm.hide();
}

// ketika tombol ya pada modal konfirmasi hapus diklik
const btnDeleteYa = document.querySelector('.btn-delete-ya');
btnDeleteYa.addEventListener('click', function () {
    const id = this.dataset.id;
    btnDeleteYa.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    setTimeout(() => {
        deleteData(id);
    }, 1000);
});
