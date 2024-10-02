import { Link, useLoaderData } from 'react-router-dom';
import { getDonantes } from '../../api/DonanteApi';
import { Donante } from '../../types/donante';
import PaginatedTableDonantes from './DonantePaginatedTable';

// Loader para obtener los donantes
export async function loader() {
  const donantes = await getDonantes();
  return donantes;
}

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'correo', label: 'Correo' },
  { key: 'frecuencia', label: 'Frecuencia' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'observaciones', label: 'Observaciones' },
];

const searchKeys = ['nombre', 'frecuencia', 'tipo'];


export default function Donantes() {
  const dataDonantes = useLoaderData() as Donante[];


  return (
    <>
      <div className="flex justify-between">

        <h2 className='text-4xl font-black text-slate-500'>Entregas</h2>

        <div className='flex justify-between gap-2'>
          <Link to="nuevo" className="mb-4 p-2 bg-[#005d90] hover:bg-[#35a1da] text-white rounded">
            Crear Entrega
          </Link>

          <Link to="/dashboard/index/" className="mb-4 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded">
            Volver al Inicio
          </Link>
        </div>

      </div>

      <PaginatedTableDonantes items={dataDonantes} columns={columns} searchKeys={searchKeys} />
    </>
  );
}