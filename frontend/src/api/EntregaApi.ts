// api/EntregaApi.ts
import axios from 'axios';
import { z } from 'zod';
import { EntregaSchema, EntregasSchema, Entrega } from '../types/entregas';
import { Donante } from '../types/donante';
import { Medicamento } from '../types/medicamento';

export async function getEntregas() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/entregas`;
        const { data } = await axios.get(url);
        console.log(data.data);
        const result = EntregasSchema.safeParse(data.data);
        console.log(result);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener las entregas');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getEntregaById(id: Entrega['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/entregas/${id}`;
        const { data } = await axios.get(url);
        const result = EntregaSchema.safeParse(data.data);
        if (result.success) {
            return result.data;
        } else {
            throw new Error('Error al obtener la entrega');
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateEntrega(id: Entrega['id'], data: Partial<Entrega>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/entregas/${id}`;
        await axios.put(url, data);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEntrega(id: Entrega['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/entregas/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
}

export async function createFullEntrega(data: {
    entregaData: Partial<Entrega>;
    donanteData: Partial<Donante>;
    medicamentosData: Partial<Medicamento>[];
    cantidadUnidades: number[];
}) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/create-full-entrega`;
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la entrega completa');
    }
}