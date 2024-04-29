import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiInfoCircle } from 'react-icons/bi';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';

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
          Penjelasan Input
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tekanan Darah</h4>
        <p>
        Tingkat tekanan darah (blood pressure) dibagi ke dalam beberapa kategori berdasarkan ukuran tekanan sistolik dan diastolik. 
        Berikut penjelasan pada pilihan input merujuk pada tingkat keparahan hipertensi (tekanan darah tinggi) yang dimiliki.
        </p>
        <p>
        Stage 1 Hypertension (Hipertensi Tahap 1): <br></br>
        Sistolik: 130-139 mmHg/ Diastolik: 80-89 mmHg
        </p>
        <p>
        Stage 2 Hypertension (Hipertensi Tahap 2):<br></br>
        Sistolik: 140 mmHg/ Diastolik: 90 mmHg
        </p>
        <p>
        Advanced Hypertension (Hipertensi Lanjut):<br></br>
        Sistolik: Di atas 180 mmHg/ Diastolik: Di atas 120 mmHg
        </p>
        <p>
        Catatan:<br></br>
        1. Tekanan sistolik adalah tekanan darah pada saat jantung berkontraksi atau memompa darah ke dalam arteri (tekanan maksimum dalam siklus detak jantung).<br></br>
        2. Tekanan diastolik adalah tekanan darah pada saat jantung beristirahat di antara detak jantung (tekanan minimum dalam siklus detak jantung).<br></br>
        3. Contoh pengukuran tekanan darah, seperti 120/80 mmHg, menggambarkan tekanan sistolik (120 mmHg) di atas tekanan diastolik (80 mmHg).<br></br>
        4. Harap cari rujukan ke ahli medis terdekat untuk mendapatkan hasil pengukuran yang akurat
        5. Untuk hasil pengukuran selain tiga di atas, harap memilih "Hipertensi Tahap 1"
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
    { value: 'stage 1', label: 'Hipertensi Tahap 1', hidden: false },
    { value: 'stage 2', label: 'Hipertensi Tahap 2', hidden: false },
    { value: 'advanced', label: 'Hipertensi Lanjut', hidden: false }
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
    <Navbar />
      <div className="container mt-5">  
          <h2 className="text-center mb-4">Tambah Diagnosis Baru</h2>
            <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Table borderless responsive>
              <thead></thead>
                <tbody>
                  <tr>
                    <td>Berat Badan</td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  {/* Input lainnya... */}
                  <tr>
                    <td>Tinggi Badan</td>
                    <td colSpan={2}>
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
                    </td>
                  </tr>
                  <tr>
                    <td>Durasi Tidur</td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Durasi Aktivitas Fisik</td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Penilaian Kualitas Tidur diri (1-10)</td>
                    <td>
                    <input
                      size='30%'
                      type="number"
                      placeholder="Secara subyektif (1-10)"
                      min="1"
                      max="10"
                      className="form-control"
                      id="qualityOfSleep"
                      name="qualityOfSleep"
                      value={formData.qualityOfSleep}
                      onChange={handleInputChange}
                      required
                    />
                    </td>
                    <td>
                      <Form.Control
                        type="range"
                        min="1"
                        max="10"
                        className="form-control mb-3"
                        id="qualityOfSleep"
                        name="qualityOfSleep"
                        value={formData.qualityOfSleep}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Penilaian Tingkat Stress diri (1-10)</td>
                    <td>
                    <input
                      type="number"
                      placeholder="Secara subyektif (1-10)"
                      min="1"
                      max="10"
                      className="form-control"
                      id="stressLevel"
                      name="stressLevel"
                      value={formData.stressLevel}
                      onChange={handleInputChange}
                      required
                    />
                    </td>
                    <td>
                    <Form.Control
                        type="range"
                        min="1"
                        max="10"
                        className="form-control mb-3"
                        id="stressLevel"
                        name="stressLevel"
                        value={formData.stressLevel}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Tekanan Darah
                      <Button variant="link" onClick={() => setModalShow(true)}>
                        <BiInfoCircle />
                      </Button>
                    </td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Detak Jantung</td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Jumlah Langkah Harian</td>
                    <td colSpan={2}>
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
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" >Kembali</button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            </Form>
      </div>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
    </Layout>
  );
}

export default FormDiagnosis;