import { ActionFunctionArgs, LoaderFunctionArgs, Link, useFetcher, useLoaderData, useNavigate, redirect, Form, useActionData } from 'react-router-dom';
import { getPacienteById, updatePaciente, deletePaciente } from '../../api/PacienteApi';
import { Paciente } from '../../types/paciente';
import ErrorMessage from '../../components/ErrorMessage';
import PatientForm from '../../components/Forms/PatientForm';
import Spinner from '../../components/Spinner';

// Loader para obtener un paciente por ID
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const patient = await getPacienteById(+params.id);
    if (!patient) {
      return redirect('/');
    }
    return patient;
  }
  return {};
}

// Acción para actualizar un paciente
export async function actionUpdate({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  // Validación en el cliente
  let error = '';
  if (Object.values(formData).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if (error.length) {
    return { error };
  }

  const data: Partial<Paciente> = {
    id: +formData.id,
    nombreCompleto: formData.nombreCompleto as string,
    fechaNacimiento: formData.fechaNacimiento as string,
    genero: formData.genero as string,
    direccion: formData.direccion as string,
    telefono: formData.telefono as string,
    correo: formData.correo as string,
    identificador: formData.identificador as 'cedula' | 'p. nacimiento',
    cedula: formData.cedula as string,
    partidaNacimiento: formData.partidaNacimiento as string,
    antecedentes: (formData.antecedentes as string).split(','),
    enfermedadesCronicas: (formData.enfermedadesCronicas as string).split(','),
    medicamentosBasicos: (formData.medicamentosBasicos as string).split(','),
    medicamentosEsenciales: (formData.medicamentosEsenciales as string).split(','),
    prioridad: formData.prioridad === 'true',
    periodoTratamiento: formData.periodoTratamiento as string,
    observaciones: formData.observaciones as string,
    entregas: (formData.entregas as string).split(',').map(Number)
  };

  if (params.id !== undefined) {
    await updatePaciente(+params.id, data); // Aseguramos que el primer argumento sea el ID y el segundo el objeto de datos
  }

  return redirect('/');
}

// Opciones de disponibilidad
const availabilityOptions = [
  { name: 'Ingresado', value: true },
  { name: 'De alta', value: false }
];

// Acción para eliminar un paciente
export async function actionDelete({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deletePaciente(+params.id);
    return redirect('/');
  }
}

// Componente EditPatient
export default function EditPatient() {
  const patient = useLoaderData() as Paciente;
  const actionData = useActionData() as { error?: string } | null;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar paciente</h2>
        <div className='flex justify-between'>
          <Link
            to='/'
            className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
          >
            Volver a productos
          </Link>
          <Form
            method='POST'
            onSubmit={(e) => {
              if (!confirm('¿Está seguro de que desea eliminar al paciente de la base de datos?')) {
                e.preventDefault();
              }
            }}
            action={`/pacientes/${patient.id}/eliminar`}
          >
            <input
              type='submit'
              value='Eliminar producto'
              className='rounded-md p-3 bg-red-600 text-sm font-bold text-white shadow-sm hover:bg-red-500'
            />
          </Form>
        </div>
      </div>

      {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}

      <Form className="mt-10" method='POST' action=''>
        <PatientForm key={patient.id} paciente={patient} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="admitted">Disponibilidad:</label>
          <select
            id="admitted"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="admitted"
            defaultValue={patient?.prioridad.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
