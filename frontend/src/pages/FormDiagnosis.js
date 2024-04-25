import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function FormDiagnosis() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    sleepDuration: '',
    qualityOfSleep: '',
    physicalActivityLevel: '',
    bloodPressure: '',
    stressLevel: '',
    heartRate: '',
    dailySteps: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      sleepDuration: parseFloat(formData.sleepDuration),
      qualityOfSleep: parseInt(formData.qualityOfSleep),
      physicalActivityLevel: parseFloat(formData.physicalActivityLevel),
      bloodPressure: formData.bloodPressure,
      stressLevel: parseInt(formData.stressLevel),
      heartRate: parseFloat(formData.heartRate),
      dailySteps: parseInt(formData.dailySteps)
    };

    axios
      .post('/diagnosis', postData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .then((response) => {
        console.log('Diagnosis added:', response.data);
        navigate('/dashboard'); // Redirect to dashboard after adding diagnosis
      })
      .catch((error) => {
        console.log('Error adding diagnosis:', error);
        alert('Failed to add diagnosis. Please check your input and try again.');
      });
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Tambah Diagnosis Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Berat Badan (kg)
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="height" className="form-label">
              Tinggi Badan (cm)
            </label>
            <input
              type="number"
              className="form-control"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sleepDuration" className="form-label">
              Durasi Tidur (jam)
            </label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              id="sleepDuration"
              name="sleepDuration"
              value={formData.sleepDuration}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="qualityOfSleep" className="form-label">
              Kualitas Tidur
            </label>
            <input
              type="number"
              min="1"
              max="24"
              className="form-control"
              id="qualityOfSleep"
              name="qualityOfSleep"
              value={formData.qualityOfSleep}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="physicalActivityLevel" className="form-label">
              Durasi Aktivitas Fisik dalam sehari (jam)
            </label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              id="physicalActivityLevel"
              name="physicalActivityLevel"
              value={formData.physicalActivityLevel}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bloodPressure" className="form-label">
              Tekanan Darah
            </label>
            <select
              className="form-control"
              id="bloodPressure"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              required
            >
              <option value="stage 1">Stage 1</option>
              <option value="stage 2">Stage 2</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="stressLevel" className="form-label">
              Tingkat Stress
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className="form-control"
              id="stressLevel"
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="heartRate" className="form-label">
              Detak jantung normal
            </label>
            <input
              type="number"
              className="form-control"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dailySteps" className="form-label">
              Langkah yang ditempuh dalam sehari
            </label>
            <input
              type="number"
              className="form-control"
              id="dailySteps"
              name="dailySteps"
              value={formData.dailySteps}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default FormDiagnosis;