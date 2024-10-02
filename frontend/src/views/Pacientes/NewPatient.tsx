import { Link, Form, useActionData, redirect, ActionFunctionArgs } from 'react-router-dom';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import PatientForm from '../../components/Forms/PatientForm';
import Spinner from '../../components/Spinner';
import { createPaciente } from '../../api/PacienteApi';

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());


  await createPaciente(formData);

  return redirect('/dashboard/index/pacientes');
}

export default function NewPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const error = useActionData() as { error?: string } | null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      await createPaciente(data);

      //window.location.href = '/dashboard/index/pacientes';
    } catch (error) {
      console.error('Error al registrar el paciente:', error);
      if (Notification.permission === "granted") {
        new Notification('Error', {
          body: 'Error al registrar el paciente. Por favor, inténtelo de nuevo.',
          icon: 'path/to/error-icon.png' // Opcional: ruta a un icono de error
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Registrar paciente</h2>
        <div className="border-t-2 border-gray-300 my-4"></div>
        <Link
          to='/dashboard/index/pacientes'
          className='rounded-sm p-3 bg-[#005d90] hover:bg-[#35a1da] text-sm font-bold text-white shadow-sm'
        >
          Volver a pacientes
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
            className="mt-5 w-full bg-[#005d90] hover:bg-[#35a1da] p-2 text-white font-bold text-lg cursor-pointer rounded-sm"
            value="Registrar Paciente"
          />
        </Form>
      )}
    </>
  );
}
