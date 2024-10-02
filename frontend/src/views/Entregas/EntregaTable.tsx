import { Link, useLoaderData } from 'react-router-dom';
import { getEntregas } from '../../api/EntregaApi';
import { Entrega } from '../../types/entregas';
import PaginatedTableDonantes from './EntregasPaginatedTable';

// Loader para obtener las entregas
export async function loader() {
  const entregas = await getEntregas();
  return entregas;
}

const columns = [
  { key: 'fechaDonante', label: 'Fecha Donante' },
  { key: 'idDonante', label: 'ID Donante' },
  { key: 'cantidadUnidades', label: 'Cantidad de Unidades' },
  { key: 'motivo', label: 'Motivo' },
  { key: 'comunidad', label: 'Comunidad' },
  { key: 'observaciones', label: 'Observaciones' },
];

const searchKeys = ['fechaDonante', 'motivo', 'comunidad'];


export default function Entregas() {
  const entregas = useLoaderData() as Entrega[];

  return (
    <>
      <div className="flex justify-between">

        <h2 className='text-4xl font-black text-slate-500'>Entregas</h2>

        <div className='flex justify-between gap-2'>
          <Link to="nuevo" className="mb-4 p-2 bg-[#005d90] hover:bg-[#35a1da] text-white rounded">
            Crear Medicamento
          </Link>

          <Link to="/dashboard/index/" className="mb-4 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded">
            Volver al Inicio
          </Link>
        </div>

      </div>

      <PaginatedTableDonantes items={entregas} columns={columns} searchKeys={searchKeys} />
    </>
  );
}