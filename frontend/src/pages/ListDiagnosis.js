import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

const ListDiagnosis = ({ diagnoses }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = diagnoses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Periksa apakah prop diagnoses tersedia dan memiliki nilai sebelum melakukan pemetaan
  if (!diagnoses || diagnoses.length === 0) {
    return <div>Belum ada data diagnosis.</div>;
  }

  return (
    <div className="mt-5">
      <ListGroup as="ol" numbered>
        {currentItems.map((diagnosis) => (
          <ListGroup.Item
            key={diagnosis.id}
            action
            onClick={() => navigate(`/diagnosis/${diagnosis.id}`)}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
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
      <div className="mt-3 d-flex justify-content-center">
        <Pagination>
        {Array.from({ length: Math.ceil(diagnoses.length / itemsPerPage) }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      {/* <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(diagnoses.length / itemsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}

    </div>
  );
};

export default ListDiagnosis;