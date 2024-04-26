import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DiagnosisDetail from './pages/DiagnosisDetail';
import FormDiagnosis from './pages/FormDiagnosis';
import UserProfile from './pages/Profile';
import UpdateUsers from './pages/UpdateUsers';
import UpdatePassword from './pages/UpdatePassword';
import DiagnosisHistory from './pages/Diagnosis';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnosis/:id" element={<DiagnosisDetail />} /> 
        <Route path="/diagnosis" element={<DiagnosisHistory />} />
        <Route path="/form-diagnosis" element={<FormDiagnosis />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/update" element={<UpdateUsers />} />
        <Route path="/profile/update-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
