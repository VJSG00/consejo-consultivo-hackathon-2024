import { Link, Form, useActionData, ActionFunctionArgs } from 'react-router-dom';
import { createMedicine } from '../../api/MedicineApi';
import { Medicamento } from '../../types/medicamento';
import MedicineForm from '../../components/Forms/MedicineForm';

interface ActionResult {
    success: boolean;
    error?: string;
}

export async function action({ request }: ActionFunctionArgs): Promise<ActionResult> {
    const formData = await request.formData();
    const newMedicine: Partial<Medicamento> = {
        nombre: formData.get('nombre') as string,
        observaciones: formData.get('observaciones') as string,
        idDonante: Number(formData.get('idDonante')),
        // Añade otros campos necesarios
    };

    try {
        await createMedicine(newMedicine as Medicamento);
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export default function NewMedicine() {
    const actionData = useActionData() as ActionResult;

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Crear Nuevo Medicamento</h2>
                <Link
                    to='/'
                    className='rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Medicamentos
                </Link>
            </div>
            <Form method='post' className='mt-6'>
                <MedicineForm />
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    Crear
                </button>
            </Form>
            {actionData?.success === false && (
                <p className='mt-4 text-red-600'>Error: {actionData.error}</p>
            )}
        </>
    );
}
