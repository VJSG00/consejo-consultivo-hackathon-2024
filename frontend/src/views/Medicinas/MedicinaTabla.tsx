import { useLoaderData, Link } from 'react-router-dom';
import PaginatedTableMedicamentos from './MedicinasPaginatedTable';
import { getMedicines } from '../../api/MedicineApi';
import { Medicamento } from '../../types/medicamento';

// Loader para obtener el inventario mensual
export async function loader() {
  const medicamentos = await getMedicines();
  //console.log(medicamentos)
  return medicamentos;
}

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'esencial', label: 'Esencial' },
  { key: 'insumo', label: 'Insumo' },
  { key: 'marca', label: 'Marca' },
  { key: 'precio', label: 'Precio' },
  { key: 'fechaVencimiento', label: 'Fecha Vencimiento' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'presentacion', label: 'Presentación' },
  { key: 'fechaDonante', label: 'Fecha Donante' },
  { key: 'observaciones', label: 'Observaciones' },

  { key: 'devuelto', label: 'Devuelto' },
  { key: 'fechaPaciente', label: 'Fecha Paciente' },

];

const searchKeys = ['nombre', 'tipo', 'marca', 'presentacion'];



export default function Medicamentos() {
  const dataMedicamentos = useLoaderData() as Medicamento[];

  return (
    <>
      <div className="flex justify-between">

        <h2 className='text-4xl font-black text-slate-500'>Medicamentos</h2>

        <div className='flex justify-between gap-2'>
          <Link to="nuevo" className="mb-4 p-2 bg-[#005d90] hover:bg-[#35a1da] text-white rounded">
            Crear Medicamento
          </Link>

          <Link to="/dashboard/index/" className="mb-4 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded">
            Volver al Inicio
          </Link>
        </div>

      </div>

      <PaginatedTableMedicamentos items={dataMedicamentos} columns={columns} searchKeys={searchKeys} />
    </>
  );
}