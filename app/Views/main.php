<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="<?= base_url('assets/css/style.css'); ?>">

  <title>CI4 CRUD with VanillaJS</title>
</head>

<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">CI4 CRUD with VanillaJS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->

  <div class="container mt-3">
    <div class="alert-container"></div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="my-auto">Data User</h4>
            <button type="button" class="btn btn-primary btn-tambah">
              Tambah
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive table">
              <!-- Skeleton -->
              <div class="lines">
                <div class="thumb pulse"></div>
              </div>
              <!-- End Skeleton -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Github repository link -->
  <div class="fixed-bottom ml-4 mb-4">
    <a href="https://github.com/bandabahariputra/ci4-crud-with-vanillajs" class="text-dark" target="_blank" data-toggle="tooltip" data-placement="top" title="Github Repository"><i class="fab fa-lg fa-github"></i></a>
  </div>

  <!-- Modal -->
  <div class="modal fade">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        </div>
        <div class="modal-body">

          <!-- Input yang disembunyikan untuk value ID -->
          <input type="hidden" class="input-id">

          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control input-name">
            <div class="invalid-feedback">Name required.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control input-email">
            <div class="invalid-feedback">Email required.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control input-username">
            <div class="invalid-feedback">Username required.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Role</label>
            <input type="text" class="form-control input-role">
            <div class="invalid-feedback">Role required.</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-close-modal">Batal</button>
          <button type="button" class="btn btn-primary btn-save">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Confirm -->
  <div class="modal fade modal-confirm">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Yakin ingin menghapus?</h5>
        </div>
        <div class="modal-body">

          <p><b class="name-on-modal"></b> akan dihapus.</p>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary btn-delete-ya">
            Ya
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Optional JavaScript -->
  <!-- Popper.js first, then Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js" integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>

  <!-- Custom JS -->
  <script src="<?= base_url('assets/js/script.js'); ?>"></script>
</body>

</html>