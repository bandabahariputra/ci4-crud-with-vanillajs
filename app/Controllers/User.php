<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class User extends BaseController
{
	use ResponseTrait;

	public function __construct()
	{
		$this->model = new UserModel();
	}

	public function index($id = false)
	{
		if ($this->request->isAJAX()) {
			if ($id === false) {
				return $this->respond($this->model->findAll(), 200);
			} else {
				return $this->respond($this->model->find($id), 200);
			}
		}

		return view('main');
	}

	public function create()
	{
		$data = $this->request->getJson();

		$this->model->insert([
			'name' => $data->name,
			'email' => $data->email,
			'username' => $data->username,
			'password' => password_hash($data->username, PASSWORD_DEFAULT),
			'role' => $data->role
		]);

		return $this->respondCreated($data, 'created');
	}

	public function update()
	{
		$data = $this->request->getJson();

		$this->model->update($data->id, [
			'name' => $data->name,
			'email' => $data->email,
			'username' => $data->username,
			'password' => password_hash($data->username, PASSWORD_DEFAULT),
			'role' => $data->role
		]);

		return $this->respond($data, 200, 'updated');
	}

	public function delete()
	{
		$data = $this->request->getJson();

		$this->model->delete($data->id);

		return $this->respondDeleted($data, 'deleted');
	}
}
