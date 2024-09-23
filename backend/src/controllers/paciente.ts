import { Request, Response } from "express"
import Pacientes from "../models/Paciente.model"
import { IsNumeric } from "sequelize-typescript"
import HistoriaClinica from "../models/HistoriaClinica.model";
import Alergia from "../models/Alergias.model";
import EntregaMedicamentos from "../models/EntregaMedicamentos.model";
import db from "../config/db";

// Obtener todos los pacientes
export const getPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await Pacientes.findAll({
            order: [['id', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [HistoriaClinica, Alergia, EntregaMedicamentos]
        });
        res.json({ data: pacientes });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pacientes" });
    }
};

// Obtener un paciente por ID
export const getPacienteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findByPk(id, {
            include: [HistoriaClinica, Alergia, EntregaMedicamentos]
        });
        if (!paciente) {
            return res.status(404).json({ error: "El paciente no está registrado" });
        }
        res.json({ data: paciente });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el paciente" });
    }
};

// Crear un nuevo paciente - TODO: dividir en partes más pequeñas.
export const createPaciente = async (req: Request, res: Response) => {
    const { nombre, apellido, cedula, club, fechaNacimiento, enEspera, historiasClinicas, alergias, entregasMedicamentos } = req.body;

    const transaction = await db.transaction();

    try {
        // Crear el paciente
        const paciente = await Pacientes.create({
            nombre,
            apellido,
            cedula,
            club,
            fechaNacimiento,
            enEspera
        }, { transaction });

        // Crear historias clínicas
        if (historiasClinicas && historiasClinicas.length > 0) {
            for (const historia of historiasClinicas) {
                await HistoriaClinica.create({
                    ...historia,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        // Crear alergias
        if (alergias && alergias.length > 0) {
            for (const alergia of alergias) {
                await Alergia.create({
                    ...alergia,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        // Crear entregas de medicamentos
        if (entregasMedicamentos && entregasMedicamentos.length > 0) {
            for (const entrega of entregasMedicamentos) {
                await EntregaMedicamentos.create({
                    ...entrega,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        // Confirmar la transacción
        await transaction.commit();

        res.status(201).json({ data: paciente });
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        res.status(500).json({ error: "Error al crear el paciente y sus relaciones" });
    }
};

// Actualizar un paciente por ID
export const updatePaciente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ error: "El paciente no está registrado" });
        }
        await paciente.update(req.body);
        res.json({ data: paciente });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el paciente" });
    }
};

// Eliminar un paciente por ID
export const deletePaciente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const paciente = await Pacientes.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ error: "El paciente no está registrado" });
        }
        await paciente.destroy();
        res.json({ message: "Paciente eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el paciente" });
    }
};