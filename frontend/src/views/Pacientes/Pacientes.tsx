import { ActionFunctionArgs, Link, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { getPacientes, updatePaciente } from '../../api/PacienteApi';
import { Paciente } from '../../types/paciente';

// Loader para obtener los pacientes
export async function loader() {
  const patients = await getPacientes();
  return patients;
}

export default function Pacientes() {
  const navigate = useNavigate();
  const patients = useLoaderData() as Paciente[];
  const fetcher = useFetcher();

  return (
    <>
      <div className='flex justify-between pb-4'>
        <h2 className='text-4xl font-black text-slate-500'>Pacientes</h2>
        <Link
          to='nuevo'
          className='rounded-md p-3 bg-[#005d90] text-sm font-bold text-white shadow-sm hover:bg-[#35a1da]'
        >
          Agregar Paciente
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-[#005d90] text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Fecha de Nacimiento
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Dirección
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Teléfono
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Correo
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient) => (
            <tr key={patient.id} className="odd:bg-white even:bg-slate-100">
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-2" onClick={() => navigate(`/pacientes/${patient.id}/editar`)} style={{ cursor: 'pointer' }}>
                    <div className="text-sm font-medium text-gray-900">
                      {patient.nombreCompleto}
                    </div>
                    <div className="text-sm text-gray-500">
                      C.i: {patient.cedula || patient.partidaNacimiento}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {new Date(patient.fechaNacimiento).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {patient.direccion}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {patient.telefono}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {patient.correo}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Link to={`/pacientes/${patient.id}/editar`} className="text-white bg-[#005d90] hover:bg-[#35a1da] py-1 px-3 rounded">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
