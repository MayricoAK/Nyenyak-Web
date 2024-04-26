import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const loginAction = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        email,
        password,
      };

      const response = await axios.post('/auth/login', payload);
      const { data } = response;

      setIsSubmitting(false);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setIsSubmitting(false);

      if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          setValidationErrors(data.message);
        } else if (data.error) {
          setValidationErrors({ general: data.error, message: data.message });
        }
      }

      console.log('Login Error:', error);
    }
  };

  return (
    <Layout>
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign In</h5>
              <form onSubmit={loginAction}>
                {validationErrors.general && (
                  <p className="text-center">
                    <small className="text-danger">{validationErrors.message}</small>
                  </p>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                  <p className="text-center">
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
