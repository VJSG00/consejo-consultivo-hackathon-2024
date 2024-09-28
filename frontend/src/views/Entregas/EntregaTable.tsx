import { ActionFunctionArgs, Link, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { getEntregas, updateEntrega } from '../../api/EntregaApi';
import { Entrega } from '../../types/entregas';

// Loader para obtener las entregas
export async function loader() {
  const entregas = await getEntregas();
  return entregas;
}

export default function Entregas() {
  const navigate = useNavigate();
  const entregas = useLoaderData() as Entrega[];
  const fetcher = useFetcher();

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Entregas</h2>
        <Link
          to='nuevo'
          className='rounded-md p-3 bg-[#005d90] text-sm font-bold text-white shadow-sm hover:bg-[#35a1da]'
        >
          Agregar Entrega
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-[#005d90] text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Fecha de Donante
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Donante
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Cantidad de Unidades
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Motivo
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Comunidad
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entregas.map((entrega) => (
            <tr key={entrega.id} className="odd:bg-white even:bg-slate-100">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {new Date(entrega.fechaDonante).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {entrega.idDonante}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {entrega.cantidadUnidades.join(', ')}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {entrega.motivo}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {entrega.comunidad}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Link to={`/entregas/${entrega.id}/editar`} className="text-white bg-[#005d90] hover:bg-[#35a1da] py-1 px-3 rounded">
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
