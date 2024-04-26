import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar'; // Import Navbar component

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Dashboard() {
  const navigate = useNavigate();
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('token')) {
          navigate('/');
          return;
        }
        
        await getDiagnoses();
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          <Navbar /> {/* Render the Navbar component */}
          <h2 className="text-center mt-5">Riwayat Diagnosis</h2>
          <div className="text-center mt-3">
            <button onClick={handleAddDiagnosis} className="btn btn-primary">
              Tambah Diagnosis
            </button>
          </div>
          {/* Render Diagnosis Data */}
          <div className="mt-5">
            <ListGroup as="ol" numbered>
            {diagnoses.map((diagnosis) => (
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;