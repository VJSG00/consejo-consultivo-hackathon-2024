import axios from 'axios';
import { z } from 'zod';
import { InventarioActualSchema, InventarioMensualSchema, InventarioActual, InventarioMensual} from '../types/inventariosActual';

export async function getInventarioActual() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/inventario-actual`;
        const { data } = await axios.get(url);
        const result = InventarioActualSchema.safeParse(data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener el inventario actual');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getInventarioMensual() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/inventario-mensual`;
        const { data } = await axios.get(url);
        const result = InventarioMensualSchema.safeParse(data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener el inventario mensual');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function populateInventarioActual() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/populate-inventario-actual`;
        const { data } = await axios.post(url);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al poblar el inventario actual');
    }
}

export async function populateInventarioMensual() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/populate-inventario-mensual`;
        const { data } = await axios.post(url);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al poblar el inventario mensual');
    }
}
