import React from 'react';
import StatCard from '../../components/Estadisticas/StatCard';

interface DonorStatisticsProps {
  data: {
    totalDonations: number;
    patientsServed: number;
  };
}

const DonorStatistics: React.FC<DonorStatisticsProps> = ({ data }) => (
  <div className="grid grid-cols-2 gap-4 mt-8 mx-4">
    <StatCard title="Total de Medicamentos Donados" value={data.totalDonations} color="bg-[#2890c8]" />
    <StatCard title="Pacientes Atendidos" value={data.patientsServed} color="bg-[#2890c8]" />
  </div>
);

export default DonorStatistics;
