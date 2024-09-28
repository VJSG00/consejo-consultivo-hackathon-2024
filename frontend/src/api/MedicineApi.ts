// api/MedicineApi.ts
import axios from 'axios';
import { z } from 'zod';
import { MedicamentoSchema, MedicamentosSchema, Medicamento } from '../types/medicamento';

export async function getMedicines() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicamentos`;
        const { data } = await axios.get(url);
        console.log(data.data);
        const result = MedicamentosSchema.safeParse(data.data);
        console.log(result);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener las medicinas');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getMedicineById(id: Medicamento['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicamentos/${id}`;
        const { data } = await axios.get(url);
        const result = MedicamentoSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener la medicina');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateMedicine(id: Medicamento['id'], data: Partial<Medicamento>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicamentos/${id}`;
        await axios.put(url, data);
    } catch (error) {
        console.error(error);
    }
}


export async function createMedicine(data: Medicamento) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicamentos`;
        await axios.post(url, data);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteMedicine(id: Medicamento['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicamentos/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
}

export async function asignarMedicamentos(data: Medicamento) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/asignar-medicamentos`;
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al asignar medicamentos');
    }
}
