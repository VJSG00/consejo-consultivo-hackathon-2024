interface Donante {
    id: number;
    nombre: string;
    telefono: string;
    correo: string;
    frecuencia: string;
    tipo: string;
    observaciones: string;
}

interface Entrega {
    id: number;
    fechaDonante: string;
    idDonante: number;
    cantidadUnidades: number[];
    motivo: string;
    comunidad: string;
    observaciones: string;
}

interface Medicamento {
    id: number;
    nombreMedicamento: string;
    cantidad: number;
    demanda: number;
    esencial: boolean;
    mes: string;
    club: string[];
    marca: string;
    precioUnidad: number;
}

interface MedicamentoDonado {
    nombre: string;
    marca: string;
    tipo: string[];
    precio: number;
}

interface ChronicDisease {
    disease: string;
    count: number;
}

interface AgeDistribution {
    ageRange: string;
    count: number;
}

export interface DonanteInfo {
    donante: Donante;
    ultimaEntrega: Entrega | null;
    totalDonaciones: number;
    pacientesAtendidos: number;
    medicamentosEsenciales: Medicamento[];
    medicamentosBasicos: Medicamento[];
    medicamentosDonados: MedicamentoDonado[];
    chronicDiseases: ChronicDisease[];
    ageDistribution: AgeDistribution[];
}

