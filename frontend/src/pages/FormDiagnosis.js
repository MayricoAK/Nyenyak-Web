import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiInfoCircle } from 'react-icons/bi';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function FormDiagnosis() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
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
      <div className="col-12">
        <Navbar />
        <h2 className="text-center mb-4">Tambah Diagnosis Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="weight" className="form-label me-2">
              Berat Badan (kg)
            </label>
            <input
              type="number"
              placeholder="Masukkan berat badan Anda (kg)"
              className="form-control me-2"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="height" className="form-label me-2">
            Tinggi Badan (cm)
            </label>
            <input
              type="number"
              placeholder="Masukkan tinggi badan Anda (cm)"
              className="form-control"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="sleepDuration" className="form-label me-2">
              Durasi Tidur (jam)
            </label>
            <input
              type="number"
              placeholder="Masukkan durasi tidur Anda"
              step="0.1"
              className="form-control"
              id="sleepDuration"
              name="sleepDuration"
              value={formData.sleepDuration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="physicalActivityLevel" className="form-label me-2">
              Durasi Aktivitas Fisik dalam sehari (jam)
            </label>
            <input
              type="number"
              placeholder="Masukkan durasi kegiatan fisik Anda dalam sehari (jam)"
              step="0.1"
              className="form-control"
              id="physicalActivityLevel"
              name="physicalActivityLevel"
              value={formData.physicalActivityLevel}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="qualityOfSleep" className="form-label me-2">
              Kualitas Tidur
            </label>
            <input
              type="number"
              placeholder="Masukkan penilaian subyektif terhadap kualitas tidur Anda (1-10)"
              min="1"
              max="10"
              className="form-control"
              id="qualityOfSleep"
              name="qualityOfSleep"
              value={formData.qualityOfSleep}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="stressLevel" className="form-label me-2">
              Tingkat Stress
            </label>
            <input
              type="number"
              placeholder="Masukkan penilaian subyektif terhadap tingkat stress Anda (1-10)"
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
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="bloodPressure" className="form-label me-2">
              Tekanan Darah
            </label>
            <Button variant="link" onClick={() => setModalShow(true)}>
              <BiInfoCircle />
            </Button>
            <select
              ref={selectRef}
              className="form-control"
              placeholder="Masukkan jenis tekanan darah yang Anda miliki"
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
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="heartRate" className="form-label me-2">
              Detak Jantung (bpm)
            </label>
            <input
              type="number"
              placeholder="Masukkan detak jantung Anda dalam satu menit (bpm)"
              className="form-control"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="dailySteps" className="form-label me-2">
              Langkah yang ditempuh dalam sehari
            </label>
            <input
              type="number"
              placeholder="Masukkan jumlah langkah harian Anda"
              className="form-control"
              id="dailySteps"
              name="dailySteps"
              value={formData.dailySteps}
              onChange={handleInputChange}
              required
            />
          </div>

          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" >Kembali</button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          
        </form>
      </div>
    </Layout>
  );
}

export default FormDiagnosis;