import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateUsers() {
  
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        await setUser(response.data.user);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [formData, setFormData] = useState({
    name: user.name,
    gender: user.gender,
    birthDate: user.birthDate,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mengubah format tanggal menjadi "dd-MM-yyyy"
      const formattedBirthDate = formatDate(formData.birthDate);
  
      const response = await axios.put('/users', {
        name: formData.name,
        gender: formData.gender,
        birthDate: formattedBirthDate // Menggunakan format tanggal yang sesuai
      }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
  
      setUser(response.data.user);
      alert(response.data.message);
      console.log('User data updated successfully:', response.data.user);
      navigate(`/profile`);
    } catch (error) {
      console.log('Error updating user data:', error);
      // Penanganan kesalahan
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

  
  // Fungsi untuk memformat tanggal menjadi "dd-MM-yyyy"
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('-');
  };
  

  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">Update Detail Pengguna</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">Birth Date</label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={() => navigate('/profile')} className="btn btn-info mt-3">Back</button>
          <button type="submit" className="btn btn-primary mt-3">Update</button>
        </form>
    </div>

  );
}

export default UpdateUsers;