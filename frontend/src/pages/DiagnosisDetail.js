import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Diagnosis Detail</h2>
      <p><strong>Date:</strong> {diagnosis.date}</p>
      <p><strong>BMI Category:</strong> {diagnosis.BMIcategory}</p>
      <p><strong>Blood Pressure:</strong> {diagnosis.bloodPressure}</p>
      <p><strong>Heart Rate:</strong> {diagnosis.heartRate}</p>
      <p><strong>Physical Activity Level:</strong> {diagnosis.physicalActivityLevel}</p>
      <p><strong>Quality of Sleep:</strong> {diagnosis.qualityOfSleep}</p>
      <p><strong>Sleep Disorder:</strong> {diagnosis.sleepDisorder}</p>
      <p><strong>Sleep Duration:</strong> {diagnosis.sleepDuration}</p>
      <p><strong>Stress Level:</strong> {diagnosis.stressLevel}</p>
      <p><strong>Solution:</strong> {diagnosis.solution}</p>

      <button onClick={handleDelete} className="btn btn-danger mt-3">Delete Diagnosis</button>
      <button onClick={() => navigate('/dashboard')} className="btn btn-info mt-3">Back to Dashboard</button>
    </div>
  );
}

export default DiagnosisDetail;