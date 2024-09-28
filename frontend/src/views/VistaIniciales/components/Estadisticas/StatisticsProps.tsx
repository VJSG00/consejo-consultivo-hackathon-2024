import React from 'react';
import StatCard from './StatCard';

interface StatisticsProps {
    data: {
        activePatients: number;
        totalPatients: number;
        donors: number;
        deliveries: number;
        mostRequestedMedications: { name: string; value: number }[];
        communitiesWithMostRequests: { name: string; value: number }[];
        commonDiseaseClubs: { name: string; value: number }[];
    };
}

const Statistics: React.FC<StatisticsProps> = ({ data }) => (
    <div className="grid grid-cols-4 gap-4 mt-4">
        <StatCard title="Pacientes Activos" value={data.activePatients} color="bg-[#2890c8]" />
        <StatCard title="Pacientes Totales Atendidos" value={data.totalPatients} color="bg-[#2890c8]" />
        <StatCard title="Número de Donantes" value={data.donors} color="bg-[#2890c8]" />
        <StatCard title="Número de Entregas" value={data.deliveries} color="bg-[#2890c8]" />
    </div>
);

export default Statistics;
