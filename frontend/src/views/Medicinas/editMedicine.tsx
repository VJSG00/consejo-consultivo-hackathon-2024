import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { deleteMedicine, getMedicineById, updateMedicine } from '../../api/MedicineApi';
import { Medicamento } from '../../types/medicamento';
import MedicineForm from '../../components/Forms/MedicineForm';

// TODO: Añadir Status a alguna parte de este código

// getMedicineById
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const medicine = await getMedicineById(+params.id);
    if (!medicine) {
      return redirect('/');
    }
    return medicine;
  }
  return {};
}

// updateMedicine
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  // A pesar de que tengamos validación en API, debemos validar en cliente
  let error = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await updateMedicine(+params.id, data);
  }

  // Siempre debemos devolver algo.
  return redirect('/');
}

// Editar disponibilidad:
const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No disponible', value: false }
];

// Delete medicine
export async function actionDelete({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteMedicine(+params.id);
    return redirect('/');
  }
}

// Componente EditMedicine
export default function EditMedicine() {
  const medicine = useLoaderData() as Medicamento;
  const error = useActionData() as string;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar medicamento</h2>
        <div className='flex justify-between'>
          <Link
            to='/'
            className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
          >
            Volver a medicamentos
          </Link>

          <Form
            method='POST'
            onSubmit={(e) => {
              if (!confirm('¿Está seguro de que desea eliminar el medicamento de la base de datos?')) {
                e.preventDefault();
              }
            }}
            action={`/medicamentos/${medicine.id}/eliminar`}
          >
            <input
              type='submit'
              value='Eliminar medicamento'
              className='rounded-md p-3 bg-red-600 text-sm font-bold text-white shadow-sm hover:bg-red-500'
            />
          </Form>
        </div>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className='mt-10' method='POST' action=''>
        
        <MedicineForm key={medicine.id} medicine={medicine} />

        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='available'>
            Disponibilidad:
          </label>
          <select
            id='available'
            className='mt-2 block w-full p-3 bg-gray-50'
            name='available'
            defaultValue={medicine?.esencial.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type='submit'
          value='Guardar cambios'
          className='rounded-md p-3 bg-green-600 text-sm font-bold text-white shadow-sm hover:bg-green-500'
        />
      </Form>
    </>
  );
}
