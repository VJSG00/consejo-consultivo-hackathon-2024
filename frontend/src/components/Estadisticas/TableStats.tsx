import React from 'react';

interface TableStatsProps {
  title: string;
  data: { name: string; value: number }[];
}

const TableStats: React.FC<TableStatsProps> = ({ title, data }) => (
  <div className="container mx-auto bg-white shadow-xl">
    <div className="w-max-80 mx-auto">
      <div className="bg-white">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-[#2890c8] font-bold uppercase text-sm text-white border-b border-grey-light">{title}</th>
              <th className="py-4 px-6 text-center bg-[#2890c8] font-bold uppercase text-sm text-white border-b border-grey-light">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">{item.name}</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TableStats;
