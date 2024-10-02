import React from 'react';
import { Link } from 'react-router-dom';
import usePaginatedSearch from '../../components/Tablas/PaginatedSearch';
import { Medicamento } from '../../types/medicamento';

interface PaginatedTableMedicamentosProps {
  items: Medicamento[];
  columns: { key: string; label: string }[];
  searchKeys: string[];
}

const PaginatedTableMedicamentos: React.FC<PaginatedTableMedicamentosProps> = ({ items, columns, searchKeys }: PaginatedTableMedicamentosProps) => {
  const {
    query,
    setQuery,
    currentPage,
    setCurrentPage,
    itemsPerPageState,
    setItemsPerPageState,
    currentItems,
    totalPages,
    searchKey,
    setSearchKey,
  } = usePaginatedSearch(items, searchKeys, 5);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateWeeksUntil = (dateString: string) => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const timeDifference = targetDate.getTime() - now.getTime();
    const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);
    return Math.ceil(weeksDifference);
  };

  const getDisplayValue = (key: string, value: any) => {
    switch (key) {
      case 'fechaVencimiento':
        return formatDate(value)
      case 'fechaPaciente':
        return value ? formatDate(value) : 'No entregado';
      case 'insumo':
        return value ? 'Insumo' : 'No';
      case 'esencial':
        return value ? 'Sí' : 'No';
      case 'devuelto':
        return value ? 'Sí' : 'No';
      default:
        return Array.isArray(value) ? value.join(', ') : value;
    }
  };


  
  const expiringSoon = currentItems.filter(item => calculateWeeksUntil(item.fechaVencimiento) <= 2);

  return (
    <div>
      {expiringSoon.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <strong>¡Atención!</strong> Los siguientes medicamentos están por vencerse:
          <ul>
            {expiringSoon.map(item => (
              <li key={item.id}>{item.nombre} (Vence en {calculateWeeksUntil(item.fechaVencimiento)} semanas)</li>
            ))}
          </ul>
        </div>
      )}
      <input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <select
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="mb-4 px-2 py-2.5 border border-gray-300 rounded"
      >
        {searchKeys.map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <select
        value={itemsPerPageState}
        onChange={(e) => setItemsPerPageState(Number(e.target.value))}
        className="mb-4 px-2 py-2.5 border border-gray-300 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-sm border-gray-300">
          <thead className="bg-[#005d90] text-white">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="py-2 border border-gray-300">{column.label}</th>
              ))}
              <th className="py-2 border border-gray-300">Semanas Restantes</th>
              <th className="py-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="odd:bg-white even:bg-slate-100">
                  {columns.map(column => (
                    <td key={column.key} className="py-2 px-1 text-sm whitespace-nowrap border border-gray-300">
                      {getDisplayValue(column.key, item[column.key])}
                    </td>
                  ))}
                  <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">
                    {calculateWeeksUntil(item.fechaVencimiento)}
                  </td>
                  <td className="py-2 px-1 gap-2 text-sm text-center whitespace-nowrap border border-gray-300">
                    <Link to={`/edit-medicine/${item.id}`}>
                      <button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Editar</button>
                    </Link>
                    <Link to={`/assign-medicine/${item.id}`}>
                      <button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Asignar</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="py-2 px-1 text-sm text-center border border-gray-300">No se encontraron resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-[#005d90] hover:bg-[#35a1da] rounded-sm disabled:opacity-50 disabled:bg-gray-400"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-[#005d90] hover:bg-[#35a1da] rounded-sm disabled:opacity-50 disabled:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedTableMedicamentos;
