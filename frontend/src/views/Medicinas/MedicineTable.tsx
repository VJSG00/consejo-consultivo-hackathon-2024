import { ActionFunctionArgs, Link, useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { getMedicines } from '../../api/MedicineApi';
import { Medicamento } from '../../types/medicamento';

// Loader para obtener los medicamentos
export async function loader() {
  const medicamentos = await getMedicines();
  return medicamentos;
}

export default function Medicamentos() {
  const navigate = useNavigate();
  const medicamentos = useLoaderData() as Medicamento[];
  const fetcher = useFetcher();

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Medicamentos</h2>
        <Link
          to='nuevo'
          className='rounded-md p-3 bg-[#005d90] text-sm font-bold text-white shadow-sm hover:bg-[#35a1da]'
        >
          Agregar Medicamento
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-[#005d90] text-white">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Esencial
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Fecha de Vencimiento
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Presentación
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Marca
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Precio
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id} className="odd:bg-white even:bg-slate-100">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {medicamento.nombre}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {medicamento.esencial ? 'Sí' : 'No'}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {new Date(medicamento.fechaVencimiento).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {medicamento.presentacion}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {medicamento.marca}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                ${medicamento.precio.toFixed(2)}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Link to={`/medicamentos/${medicamento.id}/editar`} className="text-white bg-[#005d90] hover:bg-[#35a1da] py-1 px-3 rounded">
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
