import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { createFullEntrega } from '../../api/EntregaApi';
import { Entrega } from '../../types/entregas';
import { Medicamento } from '../../types/medicamento';
import { Donante } from '../../types/donante';
import EntregaForm from '../../components/Forms/EntregaForm';

// createFullEntrega
export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  // Validación en el cliente
  if (Object.values(formData).includes('')) {
    return { error: 'Todos los campos son obligatorios' };
  }

  const medicamentosIds = (formData.medicamentos as string).split(',').map(Number);
  const medicamentos: Medicamento[] = medicamentosIds.map(id => ({
    id,
    idDonante: 0,
    idPaciente: null,
    nombre: '',
    esencial: false,
    insumo: false,
    fechaRetiro: '',
    presentacion: '',
    fechaEntrega: '',
    observaciones: null
  }));

  const entregaData: Partial<Entrega> = {
    fechaEntrega: formData.fechaEntrega as string,
    idDonante: +formData.idDonante,
    cantidadUnidades: (formData.cantidadUnidades as string).split(',').map(Number),
    medicamentos,
    pacientes: (formData.pacientes as string).split(',').map(Number),
    periodo: formData.periodo === 'true',
    periodoDias: formData.periodoDias ? +formData.periodoDias : null,
    fechaRetiro: formData.fechaRetiro ? String(formData.fechaRetiro) : null,
    observaciones: formData.observaciones ? String(formData.observaciones) : null,
  };

  const donanteData: Partial<Donante> = {
    id: +formData.idDonante,
    nombre: '',
    telefono: '',
    correo: '',
    frecuencia: 'unicos',
    tipo: 'particular',
    observaciones: null
  };

  const medicamentosData: Partial<Medicamento>[] = medicamentos.map(med => ({
    id: med.id,
    idDonante: med.idDonante,
    idPaciente: med.idPaciente,
    nombre: med.nombre,
    esencial: med.esencial,
    insumo: med.insumo,
    fechaRetiro: med.fechaRetiro,
    presentacion: med.presentacion,
    fechaEntrega: med.fechaEntrega,
    observaciones: med.observaciones
  }));

  const cantidadUnidades: number[] = (formData.cantidadUnidades as string).split(',').map(Number);

  try {
    await createFullEntrega({ entregaData, donanteData, medicamentosData, cantidadUnidades });
    return redirect('/');
  } catch (err) {
    console.error(err);
    return { error: 'Error al crear la entrega completa' };
  }
}

// Componente CreateEntrega
export default function CreateEntrega() {
  const actionData = useActionData() as { error?: string };

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Crear Entrega</h2>
        <Link
          to='/'
          className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Volver a entregas
        </Link>
      </div>

      {actionData?.error && <ErrorMessage>{actionData.error}</ErrorMessage>}

      <Form className='mt-10' method='POST' action=''>
        <EntregaForm />

        <input
          type='submit'
          value='Crear entrega'
          className='rounded-md p-3 bg-green-600 text-sm font-bold text-white shadow-sm hover:bg-green-500'
        />
      </Form>
    </>
  );
}
