// api/PacienteApi.ts
import axios from 'axios';
import { PacienteSchema, Paciente, PacientesSchema} from '../types/paciente';

export async function getPacientes() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes`;
        const { data } = await axios.get(url);
        console.log(data.data);
        const result = PacientesSchema.safeParse(data.data);
        console.log(result);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener los pacientes');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getPacienteById(id: Paciente['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`;
        const { data } = await axios.get(url);
        const result = PacienteSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener el paciente');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatePaciente(id: Paciente['id'], data: Partial<Paciente>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`;
        await axios.put(url, data);
    } catch (error) {
        console.error(error);
    }
}

export async function deletePaciente(id: Paciente['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
}

 type PacienteData = {
     [k: string]: FormDataEntryValue;
};

export async function createPaciente(data: PacienteData) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes`;
        await axios.post(url, data);
    } catch (error) {
        console.error(error);
    }
}