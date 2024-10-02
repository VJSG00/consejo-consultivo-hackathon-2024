import React, { useState } from 'react';


interface EntregaData {
    fechaDonante: string;
    motivo: string;
    comunidad: string;
    observaciones: string;
}

interface DonanteData {
    nombre: string;
    telefono: string;
    correo: string;
    frecuencia: string;
    tipo: string;
    observaciones: string;
}

interface MedicamentoData {
    nombre: string;
    esencial: boolean;
    insumo: boolean;
    fechaPaciente: string | null;
    fechaVencimiento: string;
    tipo: string[];
    devuelto: boolean;
    presentacion: string;
    fechaDonante: string;
    observaciones: string;
    marca: string;
    precio: number;
}

const tiposMedicamentos = [
    "otro",
    "analgésico",
    "antibiótico",
    "anticancerígeno",
    "antidepresivo",
    "antidiabético",
    "antihistamínico",
    "antihipertensivo",
    "antiinflamatorio",
    "antipirético",
    "antipsicótico",
    "antiviral",
    "broncodilatador",
    "cardiovascular",
    "diurético",
    "esteroide",
    "inmunosupresor",
    "laxante",
    "sedante",
    "vitamina"
];



const EntregaDonacionForm: React.FC = () => {
    const [entregaData, setEntregaData] = useState<EntregaData>({
        fechaDonante: '',
        motivo: '',
        comunidad: '',
        observaciones: ''
    });

    const [donanteData, setDonanteData] = useState<DonanteData>({
        nombre: '',
        telefono: '',
        correo: '',
        frecuencia: 'unica', // Valor predeterminado
        tipo: 'particular', // Valor predeterminado
        observaciones: ''
    });

    const [medicamentosData, setMedicamentosData] = useState<MedicamentoData[]>([
        {
            nombre: '',
            esencial: false,
            insumo: false,
            fechaPaciente: null,
            fechaVencimiento: '',
            tipo: ['anticancerígeno'], // Valor predeterminado
            devuelto: false,
            presentacion: '',
            fechaDonante: '',
            observaciones: '',
            marca: '',
            precio: 0
        }
    ]);

    const [cantidadUnidades, setCantidadUnidades] = useState<number[]>([0]);
    const [nuevoDonante, setNuevoDonante] = useState<boolean>(false);

    
    const url = `${import.meta.env.VITE_API_URL}/create-full-entrega`;

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, index?: number) => {
        const { name, value } = e.target;
        if (section === 'entregaData') {
            setEntregaData({ ...entregaData, [name]: value });
            if (name === 'fechaDonante') {
                setMedicamentosData(medicamentosData.map(med => ({ ...med, fechaDonante: value })));
            }
        } else if (section === 'donanteData') {
            setDonanteData({ ...donanteData, [name]: value });
        } else if (section === 'medicamentosData' && index !== undefined) {
            const updatedMedicamentos = [...medicamentosData];
            updatedMedicamentos[index] = { ...updatedMedicamentos[index], [name]: value };
            setMedicamentosData(updatedMedicamentos);
        } else if (section === 'cantidadUnidades' && index !== undefined) {
            const updatedCantidadUnidades = [...cantidadUnidades];
            updatedCantidadUnidades[index] = Number(value);
            setCantidadUnidades(updatedCantidadUnidades);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, section: string, index?: number) => {
        const { name, checked } = e.target;
        if (section === 'medicamentosData' && index !== undefined) {
            const updatedMedicamentos = [...medicamentosData];
            updatedMedicamentos[index] = { ...updatedMedicamentos[index], [name]: checked };
            setMedicamentosData(updatedMedicamentos);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, section: string, index?: number) => {
        const { name, value } = e.target;
        if (section === 'donanteData') {
            setDonanteData({ ...donanteData, [name]: value });
        } else if (section === 'medicamentosData' && index !== undefined) {
            const updatedMedicamentos = [...medicamentosData];
            updatedMedicamentos[index] = { ...updatedMedicamentos[index], [name]: [value] };
            setMedicamentosData(updatedMedicamentos);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            entregaData,
            donanteData,
            medicamentosData,
            cantidadUnidades
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            console.log('Datos enviados exitosamente:', result);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
        <h2 className='text-4xl font-black text-slate-500'>Crear una Entrega</h2>
        <div className="border-t-2 border-gray-300 my-4"></div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos de la Entrega</h3>
                <label className="block mb-2">Fecha de Entrega</label>
                <input type="date" name="fechaDonante" value={entregaData.fechaDonante} onChange={(e) => handleTextInputChange(e, 'entregaData')} className="mb-2 p-2 border rounded w-full" />
                <label className="block mb-2">Motivo</label>
                <input type="text" name="motivo" value={entregaData.motivo} onChange={(e) => handleTextInputChange(e, 'entregaData')} className="mb-2 p-2 border rounded w-full" />
                <label className="block mb-2">Comunidad</label>
                <input type="text" name="comunidad" value={entregaData.comunidad} onChange={(e) => handleTextInputChange(e, 'entregaData')} className="mb-2 p-2 border rounded w-full" />
                <label className="block mb-2">Observaciones</label>
                <textarea name="observaciones" value={entregaData.observaciones} onChange={(e) => handleTextInputChange(e, 'entregaData')} className="mb-2 p-2 border rounded w-full" />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Datos del Donante</h3>
                <label className="block mb-2">
                    <input type="checkbox" checked={nuevoDonante} onChange={() => setNuevoDonante(!nuevoDonante)} className="mr-2" />
                    Donante Nuevo
                </label>
                {nuevoDonante ? (
                    <>
                        <label className="block mb-2">Nombre</label>
                        <input type="text" name="nombre" value={donanteData.nombre} onChange={(e) => handleTextInputChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Teléfono</label>
                        <input type="text" name="telefono" value={donanteData.telefono} onChange={(e) => handleTextInputChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Correo</label>
                        <input type="email" name="correo" value={donanteData.correo} onChange={(e) => handleTextInputChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Frecuencia</label>
                        <select name="frecuencia" value={donanteData.frecuencia} onChange={(e) => handleSelectChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full">
                            <option value="unica">Única</option>
                            <option value="recurrente">Recurrente</option>
                            <option value="periodica">Periódica</option>
                        </select>
                        <label className="block mb-2">Tipo</label>
                        <select name="tipo" value={donanteData.tipo} onChange={(e) => handleSelectChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full">
                            <option value="particular">Particular</option>
                            <option value="ong">ONG</option>
                            <option value="privada">Privada</option>
                            <option value="publico">Público</option>
                        </select>
                        <label className="block mb-2">Observaciones</label>
                        <textarea name="observaciones" value={donanteData.observaciones} onChange={(e) => handleTextInputChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full" />
                    </>
                ) : (
                    <>
                        <label className="block mb-2">Nombre</label>
                        <input type="text" name="nombre" value={donanteData.nombre} onChange={(e) => handleTextInputChange(e, 'donanteData')} className="mb-2 p-2 border rounded w-full" />
                    </>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold">Medicamentos</h3>
                {medicamentosData.map((medicamento, index) => (
                    <div key={index} className="mb-4">
                        <label className="block mb-2">Nombre</label>
                        <input type="text" name="nombre" value={medicamento.nombre} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">
                            <input type="checkbox" name="esencial" checked={medicamento.esencial} onChange={(e) => handleCheckboxChange(e, 'medicamentosData', index)} className="mr-2" />
                            Esencial
                        </label>
                        <label className="block mb-2">
                            <input type="checkbox" name="insumo" checked={medicamento.insumo} onChange={(e) => handleCheckboxChange(e, 'medicamentosData', index)} className="mr-2" />
                            Insumo
                        </label>
                        <label className="block mb-2">Fecha de Vencimiento</label>
                        <input type="date" name="fechaVencimiento" value={medicamento.fechaVencimiento} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Tipo</label>
                        <select name="tipo" value={medicamento.tipo[0] || ''} onChange={(e) => handleSelectChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full">
                            {tiposMedicamentos.map((tipo, idx) => (
                                <option key={idx} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        <label className="block mb-2">
                            <input type="checkbox" name="devuelto" checked={medicamento.devuelto} onChange={(e) => handleCheckboxChange(e, 'medicamentosData', index)} className="mr-2" />
                            Devuelto
                        </label>
                        <label className="block mb-2">Presentación</label>
                        <input type="text" name="presentacion" value={medicamento.presentacion} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Fecha del Donante</label>
                        <input type="date" name="fechaDonante" value={medicamento.fechaDonante} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Observaciones</label>
                        <textarea name="observaciones" value={medicamento.observaciones} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Marca</label>
                        <input type="text" name="marca" value={medicamento.marca} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Precio</label>
                        <input type="number" name="precio" value={medicamento.precio} onChange={(e) => handleTextInputChange(e, 'medicamentosData', index)} className="mb-2 p-2 border rounded w-full" />
                        <label className="block mb-2">Cantidad de Unidades</label>
                        <input type="number" name="cantidadUnidades" value={cantidadUnidades[index]} onChange={(e) => handleTextInputChange(e, 'cantidadUnidades', index)} className="mb-2 p-2 border rounded w-full" />
                    </div>
                ))}
            </div>
            <button type="submit" className="mt-4 transition duration-300 flex items-center  justify-center p-4 bg-[#005d90] text-white rounded-sm shadow-md hover:bg-[#35a1da]">Enviar Entrega</button>
        </form>
    );
};

export default EntregaDonacionForm;
