import React from 'react';
import { Link } from 'react-router-dom';
import usePaginatedSearch from './PaginatedSearch';

const patients = [
  { id: 1, nombreCompleto: 'Juan Pérez', fechaNacimiento: '1993-01-01', telefono: '123456789', cedula: '12345678', enfermedadesCronicas: ['Diabetes', 'Hipertensión'], comunidad: 'El Cercado', status: 'activo' },
  { id: 2, nombreCompleto: 'María García', fechaNacimiento: '1998-02-02', telefono: '987654321', cedula: '87654321', enfermedadesCronicas: ['Hipertensión', 'Asma'], comunidad: 'Santa Rosa', status: 'inactivo' },
  { id: 3, nombreCompleto: 'Carlos López', fechaNacimiento: '1985-03-03', telefono: '234567890', cedula: '23456789', enfermedadesCronicas: ['Diabetes', 'Enfermedad Renal'], comunidad: 'La Carucieña', status: 'activo' },
  { id: 4, nombreCompleto: 'Ana Martínez', fechaNacimiento: '1975-04-04', telefono: '345678901', cedula: '34567890', enfermedadesCronicas: ['Hipertensión', 'Artritis'], comunidad: 'El Ujano', status: 'fallecido' },
  { id: 5, nombreCompleto: 'Luis Rodríguez', fechaNacimiento: '1965-05-05', telefono: '456789012', cedula: '45678901', enfermedadesCronicas: ['Asma', 'Enfermedad Cardíaca'], comunidad: 'La Ruezga', status: 'activo' },
  { id: 6, nombreCompleto: 'Sofía Fernández', fechaNacimiento: '1990-06-06', telefono: '567890123', cedula: '56789012', enfermedadesCronicas: ['Diabetes', 'Hipertensión'], comunidad: 'Tamaca', status: 'inactivo' },
  { id: 7, nombreCompleto: 'Miguel Torres', fechaNacimiento: '1980-07-07', telefono: '678901234', cedula: '67890123', enfermedadesCronicas: ['Enfermedad Renal', 'Artritis'], comunidad: 'El Manzano', status: 'activo' },
  { id: 8, nombreCompleto: 'Laura Sánchez', fechaNacimiento: '1970-08-08', telefono: '789012345', cedula: '78901234', enfermedadesCronicas: ['Hipertensión', 'Enfermedad Cardíaca'], comunidad: 'El Cují', status: 'fallecido' },
  { id: 9, nombreCompleto: 'Pedro Gómez', fechaNacimiento: '1960-09-09', telefono: '890123456', cedula: '89012345', enfermedadesCronicas: ['Diabetes', 'Asma'], comunidad: 'San Jacinto', status: 'activo' },
  { id: 10, nombreCompleto: 'Carmen Díaz', fechaNacimiento: '1950-10-10', telefono: '901234567', cedula: '90123456', enfermedadesCronicas: ['Enfermedad Cardíaca', 'Artritis'], comunidad: 'Los Rastrojos', status: 'inactivo' },
  { id: 11, nombreCompleto: 'Jorge Ramírez', fechaNacimiento: '1992-11-11', telefono: '012345678', cedula: '01234567', enfermedadesCronicas: ['Diabetes', 'Hipertensión'], comunidad: 'La Pastora', status: 'activo' },
  { id: 12, nombreCompleto: 'Elena Vargas', fechaNacimiento: '1982-12-12', telefono: '123456780', cedula: '12345670', enfermedadesCronicas: ['Asma', 'Enfermedad Renal'], comunidad: 'El Tostao', status: 'inactivo' },
  { id: 13, nombreCompleto: 'Ricardo Castillo', fechaNacimiento: '1972-01-13', telefono: '234567801', cedula: '23456780', enfermedadesCronicas: ['Hipertensión', 'Artritis'], comunidad: 'El Trompillo', status: 'activo' },
  { id: 14, nombreCompleto: 'Patricia Morales', fechaNacimiento: '1962-02-14', telefono: '345678912', cedula: '34567891', enfermedadesCronicas: ['Diabetes', 'Enfermedad Cardíaca'], comunidad: 'El Jebe', status: 'fallecido' },
  { id: 15, nombreCompleto: 'Fernando Ruiz', fechaNacimiento: '1952-03-15', telefono: '456789023', cedula: '45678902', enfermedadesCronicas: ['Asma', 'Hipertensión'], comunidad: 'El Obelisco', status: 'activo' },
  { id: 16, nombreCompleto: 'Gabriela Herrera', fechaNacimiento: '1991-04-16', telefono: '567890134', cedula: '56789013', enfermedadesCronicas: ['Enfermedad Renal', 'Artritis'], comunidad: 'El Parque', status: 'inactivo' },
  { id: 17, nombreCompleto: 'Alberto Mendoza', fechaNacimiento: '1981-05-17', telefono: '678901245', cedula: '67890124', enfermedadesCronicas: ['Diabetes', 'Enfermedad Cardíaca'], comunidad: 'El Cardenalito', status: 'activo' },
  { id: 18, nombreCompleto: 'Isabel Romero', fechaNacimiento: '1971-06-18', telefono: '789012356', cedula: '78901235', enfermedadesCronicas: ['Hipertensión', 'Asma'], comunidad: 'El Pedregal', status: 'fallecido' },
  { id: 19, nombreCompleto: 'Daniela Soto', fechaNacimiento: '1961-07-19', telefono: '890123467', cedula: '89012346', enfermedadesCronicas: ['Enfermedad Renal', 'Artritis'], comunidad: 'El Trigal', status: 'activo' },
  { id: 20, nombreCompleto: 'Francisco Jiménez', fechaNacimiento: '1951-08-20', telefono: '901234578', cedula: '90123457', enfermedadesCronicas: ['Diabetes', 'Hipertensión'], comunidad: 'El Garabatal', status: 'inactivo' },
  { id: 21, nombreCompleto: 'Lucía Pérez', fechaNacimiento: '1990-09-21', telefono: '012345679', cedula: '01234568', enfermedadesCronicas: ['Asma', 'Enfermedad Cardíaca'], comunidad: 'El Cercado', status: 'activo' },
  { id: 22, nombreCompleto: 'Roberto García', fechaNacimiento: '1980-10-22', telefono: '123456790', cedula: '12345679', enfermedadesCronicas: ['Hipertensión', 'Artritis'], comunidad: 'Santa Rosa', status: 'inactivo' },
  { id: 23, nombreCompleto: 'Marta López', fechaNacimiento: '1970-11-23', telefono: '234567801', cedula: '23456780', enfermedadesCronicas: ['Diabetes', 'Enfermedad Renal'], comunidad: 'La Carucieña', status: 'activo' },
  { id: 24, nombreCompleto: 'José Martínez', fechaNacimiento: '1960-12-24', telefono: '345678912', cedula: '34567891', enfermedadesCronicas: ['Hipertensión', 'Asma'], comunidad: 'El Ujano', status: 'fallecido' },
  { id: 25, nombreCompleto: 'Rosa Rodríguez', fechaNacimiento: '1950-01-25', telefono: '456789023', cedula: '45678902', enfermedadesCronicas: ['Enfermedad Cardíaca', 'Artritis'], comunidad: 'La Ruezga', status: 'activo' },
  { id: 26, nombreCompleto: 'Carlos Fernández', fechaNacimiento: '1995-02-26', telefono: '567890134', cedula: '56789013', enfermedadesCronicas: ['Diabetes', 'Hipertensión'], comunidad: 'Tamaca', status: 'inactivo' },
  { id: 27, nombreCompleto: 'Ana Torres', fechaNacimiento: '1985-03-27', telefono: '678901245', cedula: '67890124', enfermedadesCronicas: ['Asma', 'Enfermedad Renal'], comunidad: 'El Manzano', status: 'activo' },
  { id: 28, nombreCompleto: 'Luis Sánchez', fechaNacimiento: '1975-04-28', telefono: '789012356', cedula: '78901235', enfermedadesCronicas: ['Hipertensión', 'Artritis'], comunidad: 'El Cují', status: 'fallecido' },
]

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
  'Los Rastrojos': 'bg-blue-100',
  'La Pastora': 'bg-green-100',
  'El Tostao': 'bg-yellow-100',
  'El Trompillo': 'bg-red-100',
  'El Jebe': 'bg-purple-100',
  'El Obelisco': 'bg-pink-100',
  'El Parque': 'bg-indigo-100',
  'El Cardenalito': 'bg-teal-100',
  'El Pedregal': 'bg-orange-100',
  'El Trigal': 'bg-blue-200',
  'El Garabatal': 'bg-green-200',
};


const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const sendNotification = (message: string) => {
  if (Notification.permission === 'granted') {
    new Notification(message);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
};

const PaginatedTable: React.FC = () => {
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
      <table className="min-w-full bg-white border border-gray-300">
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
          {currentItems.map((patient) => (
            <tr key={patient.id} className={communityColors[patient.comunidad] || 'bg-white'}>
              <td className="py-2 px-1 text-sm whitespace-nowrap border border-gray-300">{patient.nombreCompleto}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{calculateAge(patient.fechaNacimiento)}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.telefono}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.cedula}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.enfermedadesCronicas.join(', ')}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">{patient.comunidad}</td>
              <td className="py-2 px-1 text-sm text-center whitespace-nowrap border border-gray-300">
                <button onClick={() => sendNotification('Status updated!')} className="px-2 py-1 text-sm inline-flex leading-5 bg-[#005d90] font-semibold rounded-sm hover:bg-[#35a1da]">
                  {patient.status}
                </button>
              </td>
              <td className="py-2 px-1 gap-2  text-sm text-center whitespace-nowrap border border-gray-300">
                <Link to={`/edit/${patient.id}`}><button className='px-2 py-1 mx-1 rounded-sm hover:bg-[#35a1da]'>Editar</button></Link>
                <Link to={`/assign-medicine/${patient.id}`}><button className='px-2 py-1 mx-1 rounded-sm bg-[#005d90] hover:bg-[#35a1da]'>Asignar Medicamento</button></Link>
              </td>
            </tr>
          ))}
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
}  

export default PaginatedTable;
