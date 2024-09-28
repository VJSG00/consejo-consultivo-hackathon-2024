import axios from 'axios';
import { z } from 'zod';
import { DashboardDataSchema } from '../types/Dashboard/Dashboard1';

export async function getDashboardData() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/dashboard-data`;
        const { data } = await axios.get(url);
        console.log(data);
        const result = DashboardDataSchema.safeParse(data);
        console.log(result);
        if (result.success) {
            return result.data;
        } else {
            console.error('Error de validación:', result.error);
            throw new Error('Error al obtener los datos del dashboard');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            pacientes: [],
            pacientesActivos: 0,
            totalPacientes: 0,
            totalDonantes: 0,
            totalEntregas: 0,
            medicamentosMasSolicitados: [],
            comunidadesConMasPeticiones: [],
            clubesDeEnfermedadesComunes: [],
            medicamentosPorMes: [],
            donantesPorMes: [],
            porcentajeDemandaAbastecida: 0,
        };
    }
}
