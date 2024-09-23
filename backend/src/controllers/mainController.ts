// src/controllers/mainController.ts
import { Request, Response } from 'express';
import Pacientes from '../models/Paciente.model';
import Alergia from '../models/Alergias.model';
import HistoriaClinica from '../models/HistoriaClinica.model';
import EntregaMedicamentos from '../models/EntregaMedicamentos.model';
import db from '../config/db';

// Actualiza toda la información del paciente
export const updateAllData = async (req: Request, res: Response) => {
    const { pacienteId, pacienteData, alergiasData, historiasClinicasData, entregasMedicamentosData } = req.body;

    const transaction = await db.transaction();
    try {
        // Actualizar datos del paciente
        const paciente = await Pacientes.findByPk(pacienteId, { transaction });
        if (!paciente) {
            await transaction.rollback();
            return res.status(404).json({ error: "El paciente no está registrado" });
        }
        if (Object.keys(pacienteData).length > 0) {
            await paciente.update(pacienteData, { transaction });
        }

        // Actualizar alergias
        for (const alergiaData of alergiasData) {
            const alergia = await Alergia.findByPk(alergiaData.id, { transaction });
            if (alergia && Object.keys(alergiaData).length > 0) {
                await alergia.update(alergiaData, { transaction });
            }
        }

        // Actualizar historias clínicas
        for (const historiaClinicaData of historiasClinicasData) {
            const historiaClinica = await HistoriaClinica.findByPk(historiaClinicaData.id, { transaction });
            if (historiaClinica && Object.keys(historiaClinicaData).length > 0) {
                await historiaClinica.update(historiaClinicaData, { transaction });
            }
        }

        // Actualizar entregas de medicamentos
        for (const entregaMedicamentosData of entregasMedicamentosData) {
            const entregaMedicamentos = await EntregaMedicamentos.findByPk(entregaMedicamentosData.id, { transaction });
            if (entregaMedicamentos && Object.keys(entregaMedicamentosData).length > 0) {
                await entregaMedicamentos.update(entregaMedicamentosData, { transaction });
            }
        }

        await transaction.commit();
        res.json({ message: "Datos actualizados correctamente" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Error al actualizar los datos" });
    }
};

// Crear un nuevo paciente, junto con sus relaciones
export const createAllData = async (req: Request, res: Response) => {
    const { pacienteData, alergiasData, historiasClinicasData, entregasMedicamentosData } = req.body;

    const transaction = await db.transaction();
    try {
        // Crear el paciente
        const paciente = await Pacientes.create(pacienteData, { transaction });

        // Crear alergias
        if (alergiasData && alergiasData.length > 0) {
            for (const alergiaData of alergiasData) {
                await Alergia.create({
                    ...alergiaData,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        // Crear historias clínicas
        if (historiasClinicasData && historiasClinicasData.length > 0) {
            for (const historiaClinicaData of historiasClinicasData) {
                await HistoriaClinica.create({
                    ...historiaClinicaData,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        // Crear entregas de medicamentos
        if (entregasMedicamentosData && entregasMedicamentosData.length > 0) {
            for (const entregaMedicamentosData of entregasMedicamentosData) {
                await EntregaMedicamentos.create({
                    ...entregaMedicamentosData,
                    pacienteId: paciente.id
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(201).json({ data: paciente });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Error al crear el paciente y sus relaciones" });
    }
};

// Obtener todos los pacientes de la BD, con sus relaciones
export const getAllData = async (req: Request, res: Response) => {
    try {
        const pacientes = await Pacientes.findAll({
            order: [['id', 'DESC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: HistoriaClinica,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Alergia,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: EntregaMedicamentos,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });
        res.json({ data: pacientes });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pacientes y sus relaciones" });
    }
};