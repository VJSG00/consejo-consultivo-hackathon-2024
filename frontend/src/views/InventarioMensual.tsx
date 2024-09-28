import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { populateInventarioMensual } from '../api/InventarioApi';
import { InventarioMensual } from '../types/inventarioMensual';

const InventarioMensualTable = () => {
  const { data: inventario, error, isLoading } = useQuery({
    queryKey: ['inventarioMensual'],
    queryFn: populateInventarioMensual,
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const fuse = new Fuse(inventario!, {
    keys: ['medicamentosMasSolicitados.nombre', 'comunidadesConMasPeticiones.comunidad'],
  });

  const filteredInventario = searchTerm ? fuse.search(searchTerm).map(result => result.item) : inventario;

  return (
    <div className="m-12">
      <button
        onClick={populateInventarioMensual}
        className="mb-4 p-2 bg-[#005d90] text-white rounded"
      >
        Populate Inventario Mensual
      </button>
      <input
        type="text"
        placeholder="Buscar en inventario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#005d90] text-white">
          <tr>
            <th>Pacientes Activos</th>
            <th>Total Pacientes</th>
            <th>Total Donantes</th>
            <th>Total Entregas</th>
            <th>Medicamentos Más Solicitados</th>
            <th>Comunidades Con Más Peticiones</th>
            <th>Clubes de Enfermedades Comunes</th>
            <th>Pacientes</th>
            <th>Medicamentos Por Mes</th>
            <th>Donantes Por Mes</th>
            <th>Porcentaje Demanda Abastecida</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventario!.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-slate-100">
              <td>{item.pacientesActivos}</td>
              <td>{item.totalPacientes}</td>
              <td>{item.totalDonantes}</td>
              <td>{item.totalEntregas}</td>
              <td>
                {item.medicamentosMasSolicitados.map((med) => (
                  <div key={med.nombre}>{med.nombre}: {med.value}</div>
                ))}
              </td>
              <td>
                {item.comunidadesConMasPeticiones.map((com) => (
                  <div key={com.comunidad}>{com.comunidad}: {com.value}</div>
                ))}
              </td>
              <td>{item.clubesDeEnfermedadesComunes.length}</td>
              <td>{item.pacientes.length}</td>
              <td>
                {item.medicamentosPorMes.map((med) => (
                  <div key={med.mes}>{new Date(med.mes).toLocaleDateString()}: {med.cantidad}</div>
                ))}
              </td>
              <td>
                {item.donantesPorMes.map((don) => (
                  <div key={don.mes}>{new Date(don.mes).toLocaleDateString()}: {don.cantidad}</div>
                ))}
              </td>
              <td>{item.porcentajeDemandaAbastecida}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioMensualTable;
