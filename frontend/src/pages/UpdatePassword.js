import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  
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
    newPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/users', {
        newPassword: formData.password,
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
  
  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">Update Password Pengguna</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Password</label>
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
            <label htmlFor="gender" className="form-label">Konfirmasi Password Baru</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={() => navigate('/profile')} className="btn btn-info mt-3">Back</button>
          <button type="submit" className="btn btn-primary mt-3">Update</button>
        </form>
    </div>

  );
}

export default UpdatePassword;