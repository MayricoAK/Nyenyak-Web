import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Table from 'react-bootstrap/Table';


function DiagnosisDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const response = await axios.get(`/diagnosis/${id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setDiagnosis(response.data);
      } catch (error) {
        const { data } = error.response;
        if (data.error === 'failed') {
          alert(data.message);
        }
        console.log('Error fetching diagnosis detail:', error);
      }
    };

    fetchDiagnosis();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus diagnosis ini?')) {
      try {
        const response=await axios.delete(`/diagnosis/${diagnosis.id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        alert(response.data.message)
        navigate('/dashboard');
      } catch (error) {
        if (error.response) {
          // Handle error responses from the server (e.g., validation errors)
          const { status, data } = error.response;
    
          if (status === 400) {
            // Bad request (validation errors from backend)
            alert(data.message);
          } else if (status === 500) {
            // Internal server error
            alert(data.message);
          } else {
            // Other unexpected errors
            alert('An unexpected error occurred. Please try again.');
          }
        }
        
      }
    }
  };

  if (!diagnosis) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <Navbar />
          <h2>Detail Diagnosis ({diagnosis.date})</h2>
          <Table responsive="sm" striped>
          <tbody>
            <tr>
              <td>Hasil Diagnosis</td>
              <td><b>{diagnosis.sleepDisorder}</b></td>
            </tr>
            <tr>
              <td>Durasi Tidur</td>
              <td>{diagnosis.sleepDuration} jam</td>
            </tr>
            <tr>
              <td>Durasi Aktivitas</td>
              <td>{diagnosis.physicalActivityLevel} menit</td>
            </tr>
            <tr>
              <td>Kategori BMI</td>
              <td>{diagnosis.BMIcategory}</td>
            </tr>
            <tr>
              <td>Tekanan Darah</td>
              <td>{diagnosis.bloodPressure}</td>
            </tr>
            <tr>
              <td>Detak Jantung</td>
              <td>{diagnosis.heartRate} bpm</td>
            </tr>
            <tr>
              <td>Tingkat Kualitas Tidur</td>
              <td>{diagnosis.qualityOfSleep}0 %</td>
            </tr>
            <tr>
              <td>Tingkat Stress</td>
              <td>{diagnosis.stressLevel}0 %</td>
            </tr>
            <tr>
              <td>Solusi</td>
              <td>{diagnosis.solution}</td>
            </tr>
          </tbody>
          </Table>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mt-3">Kembali</button>
          <button onClick={handleDelete} className="btn btn-danger mt-3">Hapus Diagnosis</button>
        </div>
      </div>
    </Layout>
  );
}

export default DiagnosisDetail;