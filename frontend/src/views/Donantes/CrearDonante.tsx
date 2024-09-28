import { Link, Form, useActionData, ActionFunctionArgs, redirect } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import { createDonante } from '../../api/DonanteApi';
import DonanteForm from '../../components/Forms/DonantesForm';

// createDonante
export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    // Validación en cliente
    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
        return error;
    }

    await createDonante(data);

    return redirect('/');
}

// Componente CrearDonante
export default function CrearDonante() {
    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Crear donante</h2>
                <div className='flex justify-between'>
                    <Link
                        to='/'
                        className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                    >
                        Volver a donantes
                    </Link>
                </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className='mt-10' method='POST' action=''>
                
                <DonanteForm />

                <input
                    type='submit'
                    value='Crear donante'
                    className='rounded-md p-3 bg-green-600 text-sm font-bold text-white shadow-sm hover:bg-green-500'
                />
            </Form>
        </>
    );
}
