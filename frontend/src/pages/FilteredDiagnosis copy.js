import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

const FilteredDiagnosis = ({ diagnoses }) => {
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const filteredData = diagnoses.filter((diagnosis) => {
      const diagnosisDate = new Date(diagnosis.date);
      return diagnosisDate.getMonth() === currentMonth && diagnosisDate.getFullYear() === currentYear;
    });

    setFilteredDiagnoses(filteredData);
  }, [diagnoses]);

  return (
    <div>
      <h3>Riwayat Diagnosis (Bulan Ini)</h3>
      <ListGroup as="ol" numbered>
        {filteredDiagnoses.map((diagnosis) => (
          <ListGroup.Item key={diagnosis.id} action onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{diagnosis.sleepDisorder}</div>
              {diagnosis.solution} <br />
            </div>
            <Badge bg="primary" pill>
              {diagnosis.date}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FilteredDiagnosis;
