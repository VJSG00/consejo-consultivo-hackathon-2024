// api/DonanteApi.ts
import axios from 'axios';
import { DonanteSchema, DonantesSchema, Donante } from '../types/donante';

export async function getDonantes() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/donantes`;
        const { data } = await axios.get(url);
        console.log(data.data);
        const result = DonantesSchema.safeParse(data.data);
        console.log(result);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener los donantes');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getDonanteById(id: Donante['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/donantes/${id}`;
        const { data } = await axios.get(url);
        const result = DonanteSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener el donante');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateDonante(id: Donante['id'], data: Partial<Donante>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/donantes/${id}`;
        await axios.put(url, data);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteDonante(id: Donante['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/donantes/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
}

type DonanteData= {
    [k: string]: FormDataEntryValue;
}

export async function createDonante(data: DonanteData) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/donantes`;
        await axios.post(url, data);
    } catch (error) {
        console.error(error);
    }
}
