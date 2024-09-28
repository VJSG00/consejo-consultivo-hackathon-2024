import React from 'react';
import TableStats from '../../components/Estadisticas/TableStats';

interface DonorTableStatsProps {
  essentialMeds: { name: string; value: number }[];
  requestedSupplies: { name: string; value: number }[];
  basicMeds: { name: string; value: number }[];
}

const DonorTableStats: React.FC<DonorTableStatsProps> = ({ essentialMeds, requestedSupplies, basicMeds }) => (
  <div className="grid grid-cols-3 gap-4 mt-4">
    <TableStats title="Medicamentos Esenciales Más Demandados" data={essentialMeds} />
    <TableStats title="Insumos Más Solicitados" data={requestedSupplies} />
    <TableStats title="Medicamentos Básicos Más Solicitados" data={basicMeds} />
  </div>
);

export default DonorTableStats;
