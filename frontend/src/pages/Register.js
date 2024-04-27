import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Form from 'react-bootstrap/Form';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formattedDate = formData.birthDate.split("-").reverse().join("-");

    try {
      const response = await axios.post('/auth/register', { ...formData, birthDate: formattedDate });
      setIsSubmitting(false);
      alert(response.data.message, ', Silahkan login')
      navigate('/');
    } catch (error) {
      const { data } = error.response;
      setIsSubmitting(false);
      alert(data.message);
      if (error.response.data.errors !== undefined) {
        setValidationErrors(error.response.data.errors);
        alert(data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Register</h5>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.name[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.email[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.password[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.confirmPassword[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                    Jenis Kelamin
                </label>
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="Laki-laki"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        type="radio"
                    />
                    <Form.Check
                        inline
                        label="Perempuan"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        type="radio"
                    />
                </div>
                {validationErrors.gender && (
                    <div className="flex flex-col">
                    <small className="text-danger">
                        {validationErrors.gender[0]}
                    </small>
                    </div>
                )}
                </div>
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                  {validationErrors.birthDate && (
                    <div className="flex flex-col">
                      <small className="text-danger">
                        {validationErrors.birthDate[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Daftar
                  </button>
                  <p className="text-center">
                    Sudah memilki <Link to="/">Login kesini</Link>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;