import { div } from 'framer-motion/client';
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#35a1da', '#2890c8', '#1b7fb5', '#0d6ea3'];

const PieChartComponent: React.FC = () => (
  <div className='bg-white border border-[#0d6ea3] rounded-lg shadow-2xl p-4'>
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

);

const BarChartComponent: React.FC = () => (
  <div className='bg-white rounded-lg border border-[#0d6ea3] shadow-2xl p-4'>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#2890c8" />
      </BarChart>
    </ResponsiveContainer>
  </div>

);

const LineChartComponent: React.FC = () => (
  <div className='bg-white rounded-lg border border-[#0d6ea3] shadow-2xl p-4'>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#35a1da" />
      </LineChart>
    </ResponsiveContainer>
  </div>

);

export { PieChartComponent, BarChartComponent, LineChartComponent };
