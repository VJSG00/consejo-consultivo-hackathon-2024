import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChronicDiseasesChartProps {
  data: { disease: string; count: number }[];
}

const ChronicDiseasesChart: React.FC<ChronicDiseasesChartProps> = ({ data }) => (
  <BarChart width={450} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="disease" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#35a1da" />
  </BarChart>
);

export default ChronicDiseasesChart;
