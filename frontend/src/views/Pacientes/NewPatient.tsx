import { Link, Form, useActionData, redirect, ActionFunctionArgs } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import PatientForm from '../../components/Forms/PatientForm';
import Spinner from '../../components/Spinner';
import { createPaciente } from '../../api/PacienteApi';
import { Paciente } from '../../types/paciente';

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  // Validación en el cliente
  if (Object.values(formData).includes('')) {
    return { error: 'Todos los campos son obligatorios' };
  }

  await createPaciente(formData);

  return redirect('/');
}

export default function NewPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const error = useActionData() as { error?: string } | null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await action({ request: e.currentTarget as unknown as Request, params: {} });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Registrar paciente</h2>
        <Link
          to='/'
          className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Volver a productos
        </Link>
      </div>

      {error?.error && <ErrorMessage>{error.error}</ErrorMessage>}

      {isLoading ? (
        <Spinner />
      ) : (
        <Form className="mt-10" method='POST' action='' onSubmit={handleSubmit}>
          <PatientForm />
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Paciente"
          />
        </Form>
      )}
    </>
  );
}
