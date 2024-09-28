import React from 'react';
import { Link } from 'react-router-dom';
import usePaginatedSearch from './PaginatedSearch';

interface Patient {
  id: number;
  nombreCompleto: string;
  fechaNacimiento: string;
  telefono: string;
  cedula: string | "no tiene";
  enfermedadesCronicas: string[];
  comunidad: string;
  status: string;
}

interface PaginatedTableProps {
  patients: Patient[];
}

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

const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const PaginatedTable: React.FC<PaginatedTableProps> = ({ patients }: PaginatedTableProps) => {
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
  } = usePaginatedSearch(patients, ['cedula', 'enfermedadesCronicas', 'comunidad'], 5);

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
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="cedula">Cédula</option>
        <option value="enfermedadesCronicas">Enfermedades Crónicas</option>
        <option value="comunidad">Comunidad</option>
      </select>
      <select
        value={itemsPerPageState}
        onChange={(e) => setItemsPerPageState(Number(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <table className="min-w-full bg-white border rounded-sm border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border border-gray-300">Nombre Completo</th>
            <th className="py-2 border border-gray-300">Edad</th>
            <th className="py-2 border border-gray-300">Teléfono</th>
            <th className="py-2 border border-gray-300">Cédula</th>
            <th className="py-2 border border-gray-300">Enfermedades Crónicas</th>
            <th className="py-2 border border-gray-300">Comunidad</th>
            <th className="py-2 border border-gray-300">Status</th>
            <th className="py-2 border border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((patient) => (
              <tr key={patient.id} className={communityColors[patient.comunidad] || 'bg-white'}>
                <td className="py-2 px-1 text-sm whitespace-nowrap border border-gray-300">{patient.nombreCompleto}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{calculateAge(patient.fechaNacimiento)}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.telefono}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.cedula}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.enfermedadesCronicas.join(', ')}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.comunidad}</td>
                <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.status}</td>
                <td className="py-2 px-1 gap-2  text-sm text-center whitespace-nowrap border border-gray-300">
                  <Link to={`/edit/${patient.id}`}><button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Editar</button></Link>
                  <Link to={`/assign-medicine/${patient.id}`}><button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Asignar Medicamento</button></Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-2 text-center">
                No se encontraron pacientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-sm ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#005d90] hover:bg-[#35a1da] text-white'}`}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-sm ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#005d90] hover:bg-[#35a1da] text-white'}`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
