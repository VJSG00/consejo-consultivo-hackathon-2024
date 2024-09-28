import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Paciente } from '../../types/paciente';
import { Medicamento } from '../../types/medicamento';
import { Entrega } from '../../types/entregas';
import { Donante } from '../../types/donante';

interface PaginatedTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  searchKeys: (keyof T)[];
  entityName: string;
  getData: () => Promise<T[]>;
}

const PaginatedTable = <T extends { id: number }>({
  data,
  columns,
  searchKeys,
  entityName,
  getData,
}: PaginatedTableProps<T>) => {
  const { data: fetchedData, error, isLoading } = useQuery({
    queryKey: [entityName],
    queryFn: getData,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const fuse = new Fuse(fetchedData!, {
    keys: searchKeys as string[],
  });

  const filteredData = searchTerm ? fuse.search(searchTerm).map(result => result.item) : fetchedData;
  const totalPages = Math.ceil(filteredData!.length / itemsPerPage);
  const currentItems = filteredData!.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="m-12">
      <input
        type="text"
        placeholder={`Buscar ${entityName}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#005d90] text-white">
          <tr>
            {columns.map((column) => (
              <th key={column.key as string} className="py-2 px-4">
                {column.label}
              </th>
            ))}
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-[#35a1da]">
              {columns.map((column) => (
                <td key={column.key as string} className="py-2 px-4">
                  {item[column.key as string]}
                </td>
              ))}
              <td className="py-2 px-4">
                <Link to={`/${entityName}/${item.id}`} className="text-blue-600 hover:text-blue-900">
                  Ver
                </Link>
                <Link to={`/${entityName}/${item.id}/editar`} className="ml-4 text-green-600 hover:text-green-900">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border border-gray-300 rounded"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 border border-gray-300 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
