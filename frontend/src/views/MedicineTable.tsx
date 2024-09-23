import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getMedicines } from '../api/MedicineApi';

export default function MedicineTable() {
    const { data: medicines, error, isLoading } = useQuery({
        queryKey: ['medicines'],
        queryFn: getMedicines
    });
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const fuse = new Fuse(medicines!, {
        keys: ['medicamento']
    });

    const filteredMedicines = searchTerm ? fuse.search(searchTerm).map(result => result.item) : medicines;

    return (
        <div className=''>
            <div className='m-12'>
                <input
                    type="text"
                    placeholder="Buscar medicina..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded "
                />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Fecha de Expiración</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredMedicines!.map((medicine) => (
                            <tr className='odd:bg-white odd:dark:bg-gray-200'
                                key={medicine.id}>
                                <td>{medicine.medicamento}</td>
                                <td>{medicine.cantidad}</td>
                                <td>{medicine.expirationDate ? new Date(medicine.expirationDate).toLocaleDateString() : 'N/A'}</td>
                                <td>
                                    <Link to={`/medicines/${medicine.id}`} className="text-blue-600 hover:text-blue-900">Ver</Link>
                                    <Link to={`/medicines/edit/${medicine.id}`} className="ml-4 text-green-600 hover:text-green-900">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
