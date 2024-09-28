import { ActionFunctionArgs, Link, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { getDonantes, updateDonante } from '../../api/DonanteApi';
import { Donante } from '../../types/donante';

// Loader para obtener los donantes
export async function loader() {
  const donantes = await getDonantes();
  return donantes;
}

export default function Donantes() {
  const navigate = useNavigate();
  const donantes = useLoaderData() as Donante[];
  const fetcher = useFetcher();

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Donantes</h2>
        <Link
          to='nuevo'
          className='rounded-md p-3 bg-[#005d90] text-sm font-bold text-white shadow-sm hover:bg-[#35a1da]'
        >
          Agregar Donante
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-[#005d90] text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Teléfono
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Correo
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Frecuencia
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Tipo
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donantes.map((donante) => (
            <tr key={donante.id} className="odd:bg-white even:bg-slate-100">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {donante.nombre}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {donante.telefono}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {donante.correo}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {donante.frecuencia}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {donante.tipo}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Link to={`/donantes/${donante.id}/editar`} className="text-white bg-[#005d90] hover:bg-[#35a1da] py-1 px-3 rounded">
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
