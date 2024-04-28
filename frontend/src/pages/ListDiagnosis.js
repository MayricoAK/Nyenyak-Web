import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const ListDiagnosis = ({diagnoses}) => {
  const navigate = useNavigate();

  // Periksa apakah prop diagnoses tersedia dan memiliki nilai sebelum melakukan pemetaan
  if (!diagnoses || diagnoses.length === 0) {
    return <div>Belum ada data diagnosis.</div>;
  }

  return (
    <div className="mt-5">
      <ListGroup as="ol" numbered>
        {diagnoses.map((diagnosis) => (
          <ListGroup.Item key={diagnosis.id} action onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{diagnosis.sleepDisorder}</div>
              {diagnosis.solution} <br />
            </div>
            <Badge bg="primary" pill>
              {diagnosis.date} <br></br>{diagnosis.timestamp}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListDiagnosis;