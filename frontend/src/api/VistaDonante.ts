// src/api/api.ts

import axios from 'axios';

type Donante = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  frecuencia: string;
  tipo: string;
  observaciones: string;
};

type UltimaEntrega = {
  id: number;
  fechaDonante: string;
  idDonante: number;
  cantidadUnidades: number[];
  motivo: string;
  comunidad: string;
  observaciones: string;
};

type MedicamentoEsencial = {
  id: number;
  nombreMedicamento: string;
  cantidad: number;
  demanda: number;
  esencial: boolean;
  mes: string;
  club: string[];
  marca: string;
  precioUnidad: number;
};

type MedicamentoBasico = {
  id: number;
  nombreMedicamento: string;
  cantidad: number;
  demanda: number;
  esencial: boolean;
  mes: string;
  club: string[];
  marca: string;
  precioUnidad: number;
};

type MedicamentoDonado = {
  nombre: string;
  marca: string;
  tipo: string[];
  precio: number;
};

type RespuestaBackend = {
  donante: Donante;
  ultimaEntrega: UltimaEntrega;
  totalDonaciones: number;
  pacientesAtendidos: number;
  medicamentosEsenciales: MedicamentoEsencial[];
  medicamentosBasicos: MedicamentoBasico[];
  medicamentosDonados: MedicamentoDonado[];
};

export const fetchDatosMedicos = async (id: number): Promise<RespuestaBackend> => {
  const url = `${import.meta.env.VITE_API_URL}/vista-donante/${id}`;
  const response = await axios.get<RespuestaBackend>(url);
  return response.data;
};
