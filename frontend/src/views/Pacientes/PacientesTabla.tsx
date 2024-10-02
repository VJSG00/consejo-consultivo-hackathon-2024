import { useLoaderData, Link } from 'react-router-dom';
import { Paciente } from '../../types/paciente';
import PaginatedTablePatients from './PacientePaginatedTable';
import { getPacientes } from '../../api/PacienteApi';

// Loader para obtener el inventario mensual
export async function loader() {
  const pacientes = await getPacientes();
  return pacientes;
}

const columns = [
  { key: 'nombreCompleto', label: 'Nombre Completo' },
  { key: 'fechaNacimiento', label: 'Fecha de Nacimiento' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'correo', label: 'Correo' },
  { key: 'identificador', label: 'Identificador' },
  { key: 'cedula', label: 'Cédula' },
  { key: 'partidaNacimiento', label: 'Partida de Nacimiento' },
  { key: 'antecedentes', label: 'Antecedentes' },
  { key: 'enfermedadesCronicas', label: 'Enfermedades Crónicas' },
  { key: 'medicamentosBasicos', label: 'Medicamentos Básicos' },
  { key: 'medicamentosEsenciales', label: 'Medicamentos Esenciales' },
  { key: 'prioridad', label: 'Prioridad' },
  { key: 'periodoTratamiento', label: 'Periodo de Tratamiento' },
  { key: 'observaciones', label: 'Observaciones' },
  { key: 'comunidad', label: 'Comunidad' },
  { key: 'tipoComunidad', label: 'Tipo de Comunidad' },
  { key: 'tipoVivienda', label: 'Tipo de Vivienda' },
  { key: 'genero', label: 'Género' },
  { key: 'status', label: 'Status' },
];

const searchKeys = ['nombreCompleto', 'cedula', 'comunidad', 'partidaNacimiento'];

export default function PacientesTable() {
  const pacientesData = useLoaderData() as Paciente[];

  return (
    <>
      <div className="flex justify-between">
      <Link to="nuevo" className="mb-4 p-2 bg-[#005d90] hover:bg-[#35a1da] text-white rounded">
          Crear Paciente
        </Link>

        <Link to="/dashboard/index/" className="mb-4 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded">
          Volver al Inicio
        </Link>
      </div>

      <PaginatedTablePatients items={pacientesData} columns={columns} searchKeys={searchKeys} />
    </>
  );
}
