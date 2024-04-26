import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('/users/update-password', {
        newPassword 
      }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setSuccessMessage(response.data.message);
      console.log('Diagnosis added:', response.data);
      alert(response.data.message)
      setErrorMessage('');
      setNewPassword('');
      setConfirmPassword('');
      navigate(`/profile`);
    } catch (error) {
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
  };
}

  return (
    <div className="container mt-5">
      <h2 className="text-center">Update Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        <Button onClick={() => navigate('/profile')} className="btn btn-info">Back</Button>
        <Button variant="primary" type="submit">
          Update Password
        </Button>
        
      </Form>
    </div>
  );
}

export default UpdatePassword;