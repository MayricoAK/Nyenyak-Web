import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

const ListFilteredDiagnosis = ({ diagnoses }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter diagnoses untuk menampilkan hanya diagnosis bulan ini
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Menggunakan +1 karena bulan dimulai dari 0
  const currentYear = currentDate.getFullYear();
  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    // Memecah string tanggal menjadi bagian hari, bulan, dan tahun
    const parts = diagnosis.date.split('-');
    const diagnosisMonth = parseInt(parts[1], 10);
    const diagnosisYear = parseInt(parts[2], 10);
    // Membandingkan bulan dan tahun diagnosis dengan bulan dan tahun saat ini
    return diagnosisMonth === currentMonth && diagnosisYear === currentYear;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDiagnoses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Jika tidak ada diagnosis yang sesuai dengan filter, tampilkan pesan
  if (filteredDiagnoses.length === 0) {
    return <div>Tidak ada diagnosis untuk bulan ini.</div>;
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
      </ListGroup><br />
      <div className="mt-3 d-flex justify-content-center">
        <Pagination>
          {Array.from({ length: Math.ceil(filteredDiagnoses.length / itemsPerPage) }, (_, i) => (
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
    </div>
  );
};

export default ListFilteredDiagnosis;