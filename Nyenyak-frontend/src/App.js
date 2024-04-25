import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DiagnosisDetail from './pages/DiagnosisDetail';
import FormDiagnosis from './pages/FormDiagnosis';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnosis/:id" element={<DiagnosisDetail />} /> 
        <Route path="/form-diagnosis" element={<FormDiagnosis />} />
      </Routes>
    </Router>
  );
}

export default App;
