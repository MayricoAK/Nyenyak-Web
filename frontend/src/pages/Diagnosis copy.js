import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Dashboard() {
  const navigate = useNavigate();
  const [diagnoses, setDiagnoses] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState(null);

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
  }, [navigate]);

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

  const sleepDisorderCounts = {
    'None' : 0,
    'Insomnia': 0,
    'Sleep Apnea': 0
  };

  diagnoses.forEach(diagnosis => {
    const disorder = diagnosis.sleepDisorder;
    if (disorder in sleepDisorderCounts) {
      sleepDisorderCounts[disorder]++;
    }
  });

  const handleFilterByMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    setFilteredMonth(currentMonth);
  };

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <Navbar />
          <h2 className="text-center mt-5">Riwayat Diagnosis</h2>
          <div className="text-center mt-3">
            <p>Total Insomnia: {sleepDisorderCounts["Insomnia"]}</p>
            <p>Total Sleep Apnea: {sleepDisorderCounts["Sleep Apnea"]}</p>
            <p>Total tidak memiliki gangguan tidur: {sleepDisorderCounts["None"]}</p>
            <button onClick={handleAddDiagnosis} className="btn btn-primary">
              Tambah Diagnosis
            </button>
            <button onClick={handleFilterByMonth} className="btn btn-secondary ml-3">
              Filter Bulan Ini
            </button>
          </div>
          <div className="mt-5">
            <ListGroup as="ol" numbered>
              {diagnoses.map((diagnosis) => {
                const [day, month, year] = diagnosis.date.split('-');
                const diagnosisMonth = parseInt(month, 10); // Convert month to integer
                if (!filteredMonth || diagnosisMonth === filteredMonth) {
                  return (
                    <ListGroup.Item key={diagnosis.id} action onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} as="li" className="d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{diagnosis.sleepDisorder}</div>
                        {diagnosis.solution} <br />
                      </div>
                      <Badge bg="primary" pill>
                        {diagnosis.date}
                      </Badge>
                    </ListGroup.Item>
                  );
                } else {
                  return null;
                }
              })}
            </ListGroup>
          </div>
          <p className="text-left">
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Dashboard</button>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;