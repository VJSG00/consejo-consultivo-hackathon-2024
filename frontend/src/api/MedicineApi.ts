// api/MedicineApi.ts
import axios from 'axios';
import { z } from 'zod';
import { MedicinesSchema, MedicineSchema, Medicine } from '../types/medicine';

export async function getMedicines() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicinas`;
        const { data } = await axios.get(url);
        console.log(data.data)
        const result = MedicinesSchema.safeParse(data.data);
        console.log(result)
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener las medicinas');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getMedicineById(id: Medicine['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicines/${id}`;
        const { data } = await axios.get(url);
        const result = MedicineSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener la medicina');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateMedicine(id: Medicine['id'], data: Partial<Medicine>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicines/${id}`;
        await axios.put(url, data);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteMedicine(id: Medicine['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/medicines/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
}
