import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import PaginatedTable
    from './PaginatedTableProps';

export interface Paciente {
    id: number;
    nombreCompleto: string;
    cedula: string;
    fechaNacimiento: string;
}

export interface Inventario {
    id: number;
    nombreMedicamento: string;
    cantidad: number;
    fechaExpiracion: string;
}

const AssignMedication: React.FC = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [inventario, setInventario] = useState<Inventario[]>([]);
    const [identificador, setIdentificador] = useState('p.nacimiento');
    const [valorIdentificador, setValorIdentificador] = useState('');
    const [nombreMedicamento, setNombreMedicamento] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [fechaPaciente, setFechaPaciente] = useState('');

    useEffect(() => {
        const fetchPacientes = async () => {
            const url = `${import.meta.env.VITE_API_URL}`;
            try {
                const response: AxiosResponse<{ data: Paciente[] }> = await axios.get(`${url}/pacientes`);
                console.log('Pacientes:', response.data.data); // Verifica los datos recibidos
                setPacientes(response.data.data);
            } catch (error) {
                console.error('Error fetching pacientes:', error);
            }
        };

        const fetchInventario = async () => {
            const url = `${import.meta.env.VITE_API_URL}`;
            try {
                const response: AxiosResponse<Inventario[]> = await axios.get(`${url}/inventario-actual`);
                console.log('Inventario:', response.data); // Verifica los datos recibidos
                setInventario(response.data);
            } catch (error) {
                console.error('Error fetching inventario:', error);
            }
        };

        fetchPacientes();
        fetchInventario();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API_URL}`;

        try {
            await axios.put(`${url}/asignar-medicamentos`, {
                identificador,
                valorIdentificador,
                nombreMedicamento,
                cantidad,
                fechaPaciente,
            });
            alert('Medicamento asignado exitosamente');
        } catch (error) {
            console.error('Error asignando medicamento:', error);
            alert('Hubo un error al asignar el medicamento');
        }
    };

    return (
        <>
            <h2 className='text-4xl font-black text-slate-500'>Registrar paciente</h2>
            <div className="border-t-2 border-gray-300 my-4"></div>

            <div className="flex">
                <form onSubmit={handleSubmit} className="p-4 text-gray-700 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="identificador" className="block mb-2">Identificador</label>
                        <select
                            id="identificador"
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            className="p-2 bg-gray-100 border border-1 border-[#005d90] rounded-sm"
                        >
                            <option value="p.nacimiento">Partida de Nacimiento</option>
                            <option value="cedula">Cédula</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="valorIdentificador" className="block mb-2">
                            {identificador === 'p.nacimiento' ? 'Ingrese la partida de nacimiento' : 'Ingrese la cédula'}
                        </label>
                        <input
                            type="text"
                            id="valorIdentificador"
                            value={valorIdentificador}
                            onChange={(e) => setValorIdentificador(e.target.value)}
                            className="p-2 rounded-sm bg-gray-100 border border-1 border-[#005d90]"
                            placeholder={identificador === 'p.nacimiento' ? 'Ingrese la partida de nacimiento' : 'Ingrese la cédula'}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nombreMedicamento" className="block mb-2">Nombre del Medicamento</label>
                        <input
                            type="text"
                            id="nombreMedicamento"
                            value={nombreMedicamento}
                            onChange={(e) => setNombreMedicamento(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                            className="p-2 rounded-sm bg-gray-100 border border-1 border-[#005d90]"
                            placeholder="Nombre del Medicamento"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cantidad" className="block mb-2">Cantidad</label>
                        <input
                            type="number"
                            id="cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                            className="p-2 rounded-sm bg-gray-100 border border-1 border-[#005d90]"
                            placeholder="Cantidad"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaPaciente" className="block mb-2">Fecha del Paciente</label>
                        <input
                            type="date"
                            id="fechaPaciente"
                            value={fechaPaciente}
                            onChange={(e) => setFechaPaciente(e.target.value)}
                            className="p-2 rounded-sm bg-gray-100 border border-1 border-[#005d90]"
                        />
                    </div>
                    <button type="submit" className="p-4 bg-[#005d90] hover:bg-[#35a1da] transition duration-300 text-white rounded-sm">
                        Asignar Medicamento
                    </button>
                </form>
                <div className="w-1/2 p-4">
                    <h2 className="text-lg mb-4">Pacientes</h2>
                    <PaginatedTable
                        items={pacientes}
                        columns={[
                            { key: 'id', label: 'ID' },
                            { key: 'nombreCompleto', label: 'Nombre Completo' },
                            { key: 'cedula', label: 'Cédula' },
                            { key: 'p.nacimiento', label: 'Part. de Nacimiento' },
                        ]}
                        searchKeys={['nombreCompleto', 'cedula', 'p.nacimiento']}
                    />
                    <h2 className="text-lg mt-8 mb-4">Inventario Actual</h2>
                    <PaginatedTable
                        items={inventario}
                        columns={[
                            { key: 'id', label: 'ID' },
                            { key: 'nombreMedicamento', label: 'Nombre' },
                            { key: 'cantidad', label: 'Cantidad' },
                            { key: 'fechaExpiracion', label: 'Fecha de Expiración' },
                        ]}
                        searchKeys={['nombreMedicamento']}
                    />
                </div>
            </div>
        </>
    );
};

export default AssignMedication;
