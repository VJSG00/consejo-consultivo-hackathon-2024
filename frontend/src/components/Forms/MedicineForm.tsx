import { Medicamento } from "../../types/medicamento";

type MedicamentoFormProps = {
    medicamento?: Medicamento;
}

export default function MedicamentoForm({ medicamento }: MedicamentoFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idDonante">ID Donante:</label>
                <input
                    id="idDonante"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el ID del Donante"
                    name="idDonante"
                    defaultValue={medicamento?.idDonante}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="idPaciente">ID Paciente:</label>
                <input
                    id="idPaciente"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el ID del Paciente"
                    name="idPaciente"
                    defaultValue={medicamento?.idPaciente ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                <input
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Nombre del Medicamento"
                    name="nombre"
                    defaultValue={medicamento?.nombre}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="esencial">Esencial:</label>
                <input
                    id="esencial"
                    type="checkbox"
                    className="mt-2 block"
                    name="esencial"
                    defaultChecked={medicamento?.esencial ?? false}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="insumo">Insumo:</label>
                <input
                    id="insumo"
                    type="checkbox"
                    className="mt-2 block"
                    name="insumo"
                    defaultChecked={medicamento?.insumo ?? false}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaPaciente">Fecha Paciente:</label>
                <input
                    id="fechaPaciente"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaPaciente"
                    defaultValue={medicamento?.fechaPaciente ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaVencimiento">Fecha de Vencimiento:</label>
                <input
                    id="fechaVencimiento"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaVencimiento"
                    defaultValue={medicamento?.fechaVencimiento}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="tipo">Tipo:</label>
                <input
                    id="tipo"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los Tipos (separados por comas)"
                    name="tipo"
                    defaultValue={medicamento?.tipo.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="devuelto">Devuelto:</label>
                <input
                    id="devuelto"
                    type="checkbox"
                    className="mt-2 block"
                    name="devuelto"
                    defaultChecked={medicamento?.devuelto ?? false}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="presentacion">Presentación:</label>
                <input
                    id="presentacion"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Presentación"
                    name="presentacion"
                    defaultValue={medicamento?.presentacion}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaDonante">Fecha Donante:</label>
                <input
                    id="fechaDonante"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="fechaDonante"
                    defaultValue={medicamento?.fechaDonante}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <textarea
                    id="observaciones"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese las Observaciones"
                    name="observaciones"
                    defaultValue={medicamento?.observaciones ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="marca">Marca:</label>
                <input
                    id="marca"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Marca"
                    name="marca"
                    defaultValue={medicamento?.marca}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="precio">Precio:</label>
                <input
                    id="precio"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Precio"
                    name="precio"
                    defaultValue={medicamento?.precio}
                />
            </div>
        </>
    );
}