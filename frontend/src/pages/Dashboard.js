import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
      navigate('/');
    } else {
      getUser();
      getDiagnoses(); // Fetch diagnosis data when component mounts
    }
  }, []);

  const getUser = () => {
    axios
      .get('/users', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  };

  const getDiagnoses = () => {
    axios
      .get('/diagnosis', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        setDiagnoses(response.data); // Update diagnoses state with diagnosis data
      })
      .catch((error) => {
        console.log('Error fetching diagnosis data:', error);
      });
  };

  const logoutAction = () => {
    axios
      .post('/auth/logout')
      .then((response) => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  const handleAddDiagnosis = () => {
    navigate('/form-diagnosis');
  };

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Dashboard
              </a>
              <div className="d-flex">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a onClick={logoutAction} className="nav-link" aria-current="page" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <h2 className="text-center mt-5">Welcome, {user.name || 'Guest'}!</h2>
          <div className="text-center mt-3">
            <button onClick={handleAddDiagnosis} className="btn btn-primary">Tambah Diagnosis</button>
          </div>
          {/* Render Diagnosis Data */}
          <div className="mt-5">
            <h3 className="text-center">Diagnosis History</h3>
            <ul className="list-group">
            {diagnoses.map((diagnosis) => (
            <li key={diagnosis.id} className="list-group-item">
                <strong>Date:</strong> {diagnosis.date} <br />
                <strong>Sleep Disorder:</strong> {diagnosis.sleepDisorder} <br />
                <button onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} className="btn btn-primary mt-2">Detail</button>
            </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;