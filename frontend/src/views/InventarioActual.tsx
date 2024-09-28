import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { populateInventarioActual } from '../api/InventarioApi';
import { Inventario } from '../types/inventariosActual';

const InventarioActualTable = () => {
  const { data: inventario, error, isLoading } = useQuery({
    queryKey: ['inventarioActual'],
    queryFn: populateInventarioActual,
  });
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const fuse = new Fuse(inventario!, {
    keys: ['nombreMedicamento', 'club', 'marca'],
  });

  const filteredInventario = searchTerm ? fuse.search(searchTerm).map(result => result.item) : inventario;

  return (
    <div className="m-12">
      <button
        onClick={populateInventarioActual}
        className="mb-4 p-2 bg-[#005d90] text-white rounded"
      >
        Populate Inventario Actual
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
            <th>ID</th>
            <th>Nombre Medicamento</th>
            <th>Cantidad</th>
            <th>Demanda</th>
            <th>Esencial</th>
            <th>Mes</th>
            <th>Club</th>
            <th>Marca</th>
            <th>Precio Unidad</th>
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventario!.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-slate-100">
              <td>{item.id}</td>
              <td>{item.nombreMedicamento}</td>
              <td>{item.cantidad}</td>
              <td>{item.demanda}</td>
              <td>{item.esencial ? 'Sí' : 'No'}</td>
              <td>{item.mes}</td>
              <td>{item.club}</td>
              <td>{item.marca}</td>
              <td>{item.precioUnidad}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioActualTable;
