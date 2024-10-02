import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AgeDistributionChartProps {
  data: { ageRange: string; count: number }[];
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data }) => (
  <BarChart width={450} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="ageRange" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#0d6ea3" />
  </BarChart>
);

export default AgeDistributionChart;
