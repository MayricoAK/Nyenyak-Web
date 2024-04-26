import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState, useNavigate } from 'react';
import axios from 'axios';


function ListDiagnosis() {
    const navigate = useNavigate();
    const [diagnoses, setDiagnoses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (!localStorage.getItem('token')) {
              navigate('/');
              return;
            }
            await getDiagnoses();
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    const getDiagnoses = async () => {
        try {
          const response = await axios.get('/diagnosis', {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
          });
          setDiagnoses(response.data);
        } catch (error) {
          console.log('Error fetching diagnosis data:', error);
        }
      };

  return (
    <ListGroup as="ol" numbered>
    {diagnoses.map((diagnosis) => (
        <ListGroup.Item key={diagnosis.id} action onClick={() => navigate(`/diagnosis/${diagnosis.id}`)} as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
            <div className="fw-bold">{diagnosis.sleepDisorder}</div>
                {diagnosis.solution} <br></br>
            </div>
            <Badge bg="primary" pill>
                {diagnosis.date}
            </Badge>
        </ListGroup.Item>
    ))}
    </ListGroup>
  );
}

export default ListDiagnosis;