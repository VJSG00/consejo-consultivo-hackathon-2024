import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Navbar from './NavbarTest';
import Footer from './Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import PaginatedTable from '../../../components/Tablas/PaginatedTableProps';

interface Paciente {
  id: number;
  nombreCompleto: string;
  fechaNacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
  identificador: string;
  cedula: string | null;
  partidaNacimiento: string;
  antecedentes: string[];
  enfermedadesCronicas: string[];
  medicamentosBasicos: string[];
  medicamentosEsenciales: string[];
  prioridad: boolean;
  periodoTratamiento: string;
  observaciones: string;
  comunidad: string;
  tipoComunidad: string;
  tipoVivienda: string;
  genero: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Medicamento {
  nombre: string;
  presentacion: string;
  marca: string;
  tipo: string[];
  estatus: string;
}

interface PacienteData {
  paciente: Paciente;
  medicamentos: Medicamento[];
  proximosRetiro: string | null;
}

interface DecodedToken {
  id: number;
  role: string;
  email: string;
  idPaciente: number;
  idDonante: number | null;
  iat: number;
  exp: number;
}



// const PaginatedTable: React.FC<PaginatedTableProps> = ({ items, columns, searchKeys }) => {
//   // Implementación del componente
//   return (
//     <table className="min-w-full bg-white">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.key} className="py-2">{column.label}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {items.map((item, index) => (
//           <tr key={index} className="text-center">
//             {columns.map((column) => (
//               <td key={column.key} className="py-2">{item[column.key as keyof Medicamento]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

const PacienteView: React.FC = () => {
  const [data, setData] = useState<PacienteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/vista-paciente/${id}`;
        const response = await axios.get(url);
        console.log('Datos recibidos del backend:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('AUTH_TOKEN'); // Asumiendo que el token está almacenado en localStorage
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      fetchData(decoded.idPaciente);
    } else {
      setLoading(false);
      console.error('No token found');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader size={50} color={"#005d90"} loading={loading} />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  const { paciente, medicamentos, proximosRetiro } = data;
  const today = new Date();
  const proximosRetiroDate = proximosRetiro ? new Date(proximosRetiro) : null;
  const showAlert = proximosRetiroDate && (proximosRetiroDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) < 14;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Información del Paciente</h1>
        {showAlert && proximosRetiro && (
          <div className="mt-2 p-4 bg-red-200 text-red-800">
            Debe dirigirse a buscar sus medicamentos el {proximosRetiro}.
          </div>
        )}
        {paciente && (
          <div className="mb-4">
            <p><strong>Status:</strong> {paciente.status}</p>
            <p><strong>Identificador:</strong> {paciente.identificador === 'cedula' ? paciente.cedula : paciente.partidaNacimiento}</p>
            <p><strong>Dirección:</strong> {paciente.direccion}</p>
          </div>
        )}
        <h2 className="text-xl font-bold mb-2">Medicamentos</h2>
        {medicamentos && medicamentos.length > 0 ? (
          <PaginatedTable
            items={medicamentos}
            columns={[
              { key: 'nombre', label: 'Nombre' },
              { key: 'presentacion', label: 'Presentación' },
              { key: 'marca', label: 'Marca' },
              { key: 'estatus', label: 'Estatus' }
            ]}
            searchKeys={['nombre', 'presentacion', 'marca']}
          />
        ) : (
          <p>No hay medicamentos asignados.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PacienteView;
