import React from 'react';
import StatCard from './StatCard';

interface StatisticsProps {
    data: {
        pacientesActivos: number;
        totalPacientes: number;
        totalDonantes: number;
        totalEntregas: number;
    };
}

const Statistics: React.FC<StatisticsProps> = ({ data }) => (
    <div className="grid grid-cols-4 gap-4 mt-4">
        <StatCard title="Pacientes Activos" value={data.pacientesActivos} color="bg-[#2890c8]" />
        <StatCard title="Pacientes Totales Atendidos" value={data.totalPacientes} color="bg-[#2890c8]" />
        <StatCard title="Número de Donantes" value={data.totalDonantes} color="bg-[#2890c8]" />
        <StatCard title="Número de Entregas" value={data.totalEntregas} color="bg-[#2890c8]" />
    </div>
);

export default Statistics;
