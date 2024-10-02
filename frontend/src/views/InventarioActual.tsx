import { useFetcher, useLoaderData, ActionFunction, Link } from "react-router-dom";
import { getInventarioActual, populateInventarioActual } from "../api/InventarioApi";
import PaginatedTable from "../components/Tablas/PaginatedTableProps";
import { Inventario } from "../types/inventariosActual";

// Loader para obtener el inventario mensual
export async function loader() {
  const inventario = await getInventarioActual();
  return inventario;
}

// Actualizar el inventario.
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
  { key: 'cantidad', label: 'Cantidad' },
  { key: 'demanda', label: 'Demanda' },
  { key: 'esencial', label: 'Esencial' },
  { key: 'mes', label: 'Mes' },
  { key: 'club', label: 'Club' },
  { key: 'marca', label: 'Marca' },
  { key: 'precioUnidad', label: 'Precio por Unidad' },
];

const searchKeys = ['nombreMedicamento', 'club', 'marca'];

export default function InventarioActual() {
  const inventarioData = useLoaderData() as Inventario[];
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

  )
}
