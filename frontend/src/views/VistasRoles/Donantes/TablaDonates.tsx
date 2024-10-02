import React from 'react';
import TableStats from '../../../components/Estadisticas/TableStats';

interface DonorTableStatsProps {
  essentialMeds: { name: string; value: number }[];
  basicMeds: { name: string; value: number }[];
}

const DonorTableStats: React.FC<DonorTableStatsProps> = ({ essentialMeds, basicMeds }) => (
  <div className="flex flex-col-2 justify-between gap-4 mt-4">
    <TableStats title="Medicamentos Esenciales Más Demandados" data={essentialMeds} />
    <TableStats title="Medicamentos Básicos Más Solicitados" data={basicMeds} />
  </div>
);

export default DonorTableStats;
