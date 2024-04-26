import React, { useState, useRef, useEffect } from 'react';
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
  const [bloodPressureOptions, setBloodPressureOptions] = useState([
    { value: '', label: 'Pilih Tekanan Darah', hidden: false }, // Default option
    { value: 'stage 1', label: 'Stage 1', hidden: false },
    { value: 'stage 2', label: 'Stage 2', hidden: false },
    { value: 'advanced', label: 'Advanced', hidden: false }
  ]);
  const selectRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectClick = () => {
    // Hide the "Pilih Tekanan Darah" option when the dropdown is clicked
    setBloodPressureOptions((options) =>
      options.map((option) =>
        option.value === '' ? { ...option, hidden: true } : option
      )
    );
  };

  const handleSubmit = async (e) => {
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
  
    try {
      const response = await axios.post('/diagnosis', postData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
  
      console.log('Diagnosis added:', response.data);
      alert(response.data.message)
  
      // Extract the ID of the newly created diagnosis from the response
      const newDiagnosisId = response.data.newDiagnosis.id;
  
      // Navigate to the detail page of the newly created diagnosis
      navigate(`/diagnosis/${newDiagnosisId}`); // Replace '/diagnosis/${newDiagnosisId}' with your actual detail page URL
    } catch (error) {
      console.log('Error adding diagnosis:', error);
  
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
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from the server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an error
        alert('Error processing the request. Please try again.');
      }
    }
  };  

  useEffect(() => {
    setBloodPressureOptions((options) =>
      options.map((option) =>
        option.value === '' ? { ...option, hidden: false } : option
      )
    );
  }, []);

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
            ref={selectRef}
            className="form-control"
            id="bloodPressure"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleInputChange}
            onClick={handleSelectClick}
            required
          >
            {bloodPressureOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                hidden={option.hidden}
              >
                {option.label}
              </option>
            ))}
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
          <button onClick={() => navigate('/dashboard')} className="btn btn-info" >Back to Dashboard</button><br></br>
        </form>
        
      </div>
    </Layout>
  );
}

export default FormDiagnosis;