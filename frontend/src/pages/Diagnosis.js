import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import ListDiagnosis from './ListDiagnosis';
import FilteredDiagnosis from './FilteredDiagnosis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Diagnosis = () => {
  const [showFilteredDiagnosis, setShowFilteredDiagnosis] = useState(false);
  const [diagnoses, setDiagnoses] = useState([]);
  const navigate = useNavigate();

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

  const handleFilterDiagnosis = () => {
    setShowFilteredDiagnosis(!showFilteredDiagnosis);
  };

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <Navbar />
          <h2 className="text-center mt-5">Riwayat Diagnosis</h2>
          <div className="text-center mt-3">
            <button onClick={() => navigate('/form-diagnosis')} className="btn btn-primary ml-3">
              Tambah Diagnosis
            </button>
            <button onClick={handleFilterDiagnosis} className="btn btn-secondary ml-3">
              {showFilteredDiagnosis ? 'Semua Riwayat' : 'Riwayat Bulan Ini'}
            </button>
          </div>

          {showFilteredDiagnosis ? <FilteredDiagnosis diagnoses={diagnoses} /> : <ListDiagnosis diagnoses={diagnoses} />}
        </div>
          <p className="text-left">
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Dashboard</button>
          </p>
      </div>
    </Layout>
  );
};

export default Diagnosis;