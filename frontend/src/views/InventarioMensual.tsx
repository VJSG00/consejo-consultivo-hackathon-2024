import { useFetcher, useLoaderData, Link, ActionFunction } from 'react-router-dom';
import { InventarioMen } from '../types/inventarioMensual'; 
import PaginatedTable from '../components/Tablas/PaginatedTableProps';
import { getInventarioMensual, populateInventarioActual } from '../api/InventarioApi';


// Loader para obtener el inventario mensual
export async function loader() {
  const inventario = await getInventarioMensual();
  return inventario;
}

//Actualizar el inventario
export const action: ActionFunction = async () => {
  try {
    const data = await populateInventarioActual();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error al poblar el inventario actual:', error);
    throw error;
  }
};


const columns = [
  { key: 'nombreMedicamento', label: 'Nombre del Medicamento' },
  { key: 'recibidas', label: 'Recibidas' },
  { key: 'demanda', label: 'Demanda' },
  { key: 'esencial', label: 'Esencial' },
  { key: 'club', label: 'Club' },
  { key: 'marca', label: 'Marca' },
];

const searchKeys = ['nombreMedicamento', 'club', 'marca'];

export default function InventarioMensual() {
  const inventarioData = useLoaderData() as InventarioMen[];
  const fetcher = useFetcher();

  return (
    <>
      <div className="flex justify-between">
        <fetcher.Form method="put">
          <button type="submit" className="mb-4 p-2 bg-[#005d90] hover:bg-[#35a1da] text-white rounded-sm">
            Actualizar Inventario
          </button>
        </fetcher.Form>

        <Link to="/dashboard/index/" className="mb-4 p-2 bg-gray-500 hover:bg-gray-700 text-white rounded-sm">
          Volver al Inicio
        </Link>
      </div>

      <PaginatedTable items={inventarioData} columns={columns} searchKeys={searchKeys} />
    </>
  );
}
