import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DiagnosisDetail() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    axios
      .get(`/diagnosis/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((response) => {
        setDiagnosis(response.data);
      })
      .catch((error) => {
        console.log('Error fetching diagnosis detail:', error);
      });
  }, [id]);

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
    </div>
  );
}

export default DiagnosisDetail;
