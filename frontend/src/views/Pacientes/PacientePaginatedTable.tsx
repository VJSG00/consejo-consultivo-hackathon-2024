import React from 'react';
import { Link } from 'react-router-dom';
import usePaginatedSearch from '../../components/Tablas/PaginatedSearch';

interface PaginatedTablePatientsProps {
  items: any[];
  columns: { key: string; label: string }[];
  searchKeys: string[];
}

const PaginatedTablePatients: React.FC<PaginatedTablePatientsProps> = ({ items, columns, searchKeys }: PaginatedTablePatientsProps) => {
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

  const calculateAge = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const communityColors: { [key: string]: string } = {
    'El Cercado': 'bg-blue-50',
    'Santa Rosa': 'bg-green-50',
    'La Carucieña': 'bg-yellow-50',
    'El Ujano': 'bg-red-50',
    'La Ruezga': 'bg-purple-50',
    'Tamaca': 'bg-pink-50',
    'El Manzano': 'bg-indigo-50',
    'El Cují': 'bg-teal-50',
    'San Jacinto': 'bg-orange-50',
    'Los Rastrojos': '#E0F7FA',
    'La Pastora': '#E8F5E9',
    'El Tostao': '#FFFDE7',
    'El Trompillo': '#FFEBEE',
    'El Jebe': '#F3E5F5',
    'El Obelisco': '#FCE4EC',
    'El Parque': '#E8EAF6',
    'El Cardenalito': '#E0F2F1',
    'El Pedregal': '#FFF3E0',
    'El Trigal': '#E3F2FD',
    'Comunidad B': 'bg-red-50',
  };

  return (
    <div>
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
              <th className="py-2 border border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className={communityColors[item.comunidad] || 'bg-white'}>
                  {columns.map(column => (
                    <td key={column.key} className="py-2 px-1 text-sm whitespace-nowrap border border-gray-300">
                      {column.key === 'Edad' ? calculateAge(item[column.key]) :
                       column.key === 'periodoTratamiento' ? formatDate(item[column.key]) :
                       Array.isArray(item[column.key]) ? item[column.key].join(', ') : item[column.key]}
                    </td>
                  ))}
                  <td className="py-2 px-1 gap-2 text-sm text-center whitespace-nowrap border border-gray-300">
                    <Link to={`${item.id}/editar`}>
                      <button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Editar</button>
                    </Link>
                    <Link to={`/dashboard/index/pacientes/${item.id}/asignar-medicamentos`}>
                      <button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Asignar Medicamento</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-2 px-1 text-sm text-center border border-gray-300">No se encontraron resultados</td>
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

export default PaginatedTablePatients;
