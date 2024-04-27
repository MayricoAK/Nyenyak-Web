import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar'; // Import Navbar component

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('token')) {
          navigate('/');
          return;
        }
        
        await getUser();
        await getDiagnoses();
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('/users', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setUser(response.data.user);
    } catch (error) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem('token');
      }
      console.log('Error fetching user data:', error);
    }
  };

  const getDiagnoses = async () => {
    try {
      const response = await axios.get('/diagnosis', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setDiagnoses(response.data);
    } catch (error) {
      console.log('Error fetching diagnosis data:', error);
    }
  };

  const handleAddDiagnosis = () => {
    navigate('/form-diagnosis');
  };

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <Navbar />
          <h2 className="text-center mt-5">Selamat Datang, {user.name || 'Guest'}!</h2>
          <div className="text-center mt-3">
            <button onClick={handleAddDiagnosis} className="btn btn-primary">
              Tambah Diagnosis
            </button>
          </div>
          {/* Render Diagnosis Data */}
          <div className="mt-5">
            <h3 className="text-center">Riwayat Diagnosis</h3><br></br>
            <ListGroup as="ol" numbered>
            {diagnoses.slice(0, 3).map((diagnosis) => (
            <ListGroup.Item key={diagnosis.id} action onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{diagnosis.sleepDisorder}</div>
                  {diagnosis.solution} <br></br>
                </div>
                <Badge bg="primary" pill>
                  {diagnosis.date}
                </Badge>
              
              </ListGroup.Item>
            ))}
            </ListGroup>
            <p className="text-left">
              <button onClick={() => navigate('/diagnosis')} className="btn btn-secondary mt-3">Lihat selengkapnya</button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;