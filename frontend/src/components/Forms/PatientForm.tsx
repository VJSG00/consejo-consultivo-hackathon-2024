import { Paciente } from "../../types/paciente";

type PacienteFormProps = {
    paciente?: Paciente;
}

export default function PacienteForm({ paciente }: PacienteFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombreCompleto">Nombre Completo:</label>
                <input
                    id="nombreCompleto"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Nombre Completo"
                    name="nombreCompleto"
                    defaultValue={paciente?.nombreCompleto}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                    id="fechaNacimiento"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50 custom-date-input"
                    name="fechaNacimiento"
                    defaultValue={paciente?.fechaNacimiento}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="genero">Género:</label>
                <input
                    id="genero"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Masculino o Femenino"
                    name="genero"
                    defaultValue={paciente?.genero}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="direccion">Dirección:</label>
                <input
                    id="direccion"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Dirección"
                    name="direccion"
                    defaultValue={paciente?.direccion ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">Teléfono:</label>
                <input
                    id="telefono"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Teléfono"
                    name="telefono"
                    defaultValue={paciente?.telefono ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="correo">Correo:</label>
                <input
                    id="correo"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese el Correo"
                    name="correo"
                    defaultValue={paciente?.correo ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="identificador">Identificador:</label>
                <select
                    id="identificador"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="identificador"
                    defaultValue={paciente?.identificador}
                >
                    <option value="cedula">Cédula</option>
                    <option value="p.nacimiento">Partida de Nacimiento</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="cedula">Cédula:</label>
                <input
                    id="cedula"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Cédula"
                    name="cedula"
                    defaultValue={paciente?.cedula ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="partidaNacimiento">Partida de Nacimiento:</label>
                <input
                    id="partidaNacimiento"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Partida de Nacimiento"
                    name="partidaNacimiento"
                    defaultValue={paciente?.partidaNacimiento ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="antecedentes">Antecedentes:</label>
                <input
                    id="antecedentes"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los Antecedentes"
                    name="antecedentes"
                    defaultValue={paciente?.antecedentes.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="enfermedadesCronicas">Enfermedades Crónicas:</label>
                <input
                    id="enfermedadesCronicas"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese las Enfermedades Crónicas"
                    name="enfermedadesCronicas"
                    defaultValue={paciente?.enfermedadesCronicas.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="medicamentosBasicos">Medicamentos Básicos:</label>
                <input
                    id="medicamentosBasicos"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los Medicamentos Básicos"
                    name="medicamentosBasicos"
                    defaultValue={paciente?.medicamentosBasicos.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="medicamentosEsenciales">Medicamentos Esenciales:</label>
                <input
                    id="medicamentosEsenciales"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese los Medicamentos Esenciales"
                    name="medicamentosEsenciales"
                    defaultValue={paciente?.medicamentosEsenciales.join(', ') ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="prioridad">Prioridad:</label>
                <input
                    id="prioridad"
                    type="checkbox"
                    className="mt-2 block"
                    name="prioridad"
                    defaultChecked={paciente?.prioridad ?? false}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="periodoTratamiento">Periodo de Tratamiento:</label>
                <input
                    id="periodoTratamiento"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50 custom-date-input"
                    name="periodoTratamiento"
                    defaultValue={paciente?.periodoTratamiento}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="observaciones">Observaciones:</label>
                <textarea
                    id="observaciones"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese las Observaciones"
                    name="observaciones"
                    defaultValue={paciente?.observaciones ?? ''}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="comunidad">Comunidad:</label>
                <input
                    id="comunidad"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Ingrese la Comunidad"
                    name="comunidad"
                    defaultValue={paciente?.comunidad}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="tipoComunidad">Tipo de Comunidad:</label>
                <input
                    id="tipoComunidad"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Urbana, Rural o Suburbana"
                    name="tipoComunidad"
                    defaultValue={paciente?.tipoComunidad}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="tipoVivienda">Tipo de Vivienda:</label>
                <input
                    id="tipoVivienda"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Propia, Alquiler, ViviendaSocial, Precaria"
                    name="tipoVivienda"
                    defaultValue={paciente?.tipoVivienda}
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="status">Status:</label>
                <input
                    id="status"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Activo, No Activo, Fallecido"
                    name="status"
                    defaultValue={paciente?.status}
                />
            </div>

            </>
    )
}