import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

const ListFilteredDiagnosis = ({ diagnoses }) => {
  const navigate = useNavigate();

  // Mendapatkan bulan dan tahun saat ini
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Menggunakan +1 karena bulan dimulai dari 0
  const currentYear = currentDate.getFullYear();

  if (!diagnoses || diagnoses.length === 0) {
    return <div>Belum ada data diagnosis.</div>;
  }

  // Filter diagnoses untuk menampilkan hanya diagnosis bulan ini
  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    // Memecah string tanggal menjadi bagian hari, bulan, dan tahun
    const parts = diagnosis.date.split('-');
    const diagnosisDay = parseInt(parts[0], 10);
    const diagnosisMonth = parseInt(parts[1], 10);
    const diagnosisYear = parseInt(parts[2], 10);
    
    // Membandingkan bulan dan tahun diagnosis dengan bulan dan tahun saat ini
    return diagnosisMonth === currentMonth && diagnosisYear === currentYear;
  });

  // Jika tidak ada diagnosis yang sesuai dengan filter, tampilkan pesan
  if (filteredDiagnoses.length === 0) {
    return <div>Tidak ada diagnosis untuk bulan ini.</div>;
  }

  return (
    <div className="mt-5">
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

export default ListFilteredDiagnosis;