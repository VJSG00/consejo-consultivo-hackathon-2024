import { Request, Response } from 'express';
import Medicamento from '../models/Medicamento.model';
import Paciente from '../models/Paciente.model';
import db from '../config/db';
import InventarioActual from '../models/Inventarios/InventarioActual';
import InventarioMensual from '../models/Inventarios/InventarioMensual';

export const getMedicamentos = async (req: Request, res: Response) => {
    const medicamentos = await Medicamento.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({ data: medicamentos });
};

export const getMedicamentoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const medicamento = await Medicamento.findByPk(id);
    if (!medicamento) {
        return res.status(404).json({
            error: 'Medicamento No Encontrado'
        });
    }
    res.json({ data: medicamento });
};

export const createMedicamento = async (req: Request, res: Response) => {
    const medicamento = await Medicamento.create(req.body);
    res.status(201).json({ data: medicamento });
};

export const updateMedicamento = async (req: Request, res: Response) => {
    const { id } = req.params;
    const medicamento = await Medicamento.findByPk(id);

    if (!medicamento) {
        return res.status(404).json({
            error: 'Medicamento No Encontrado'
        });
    }

    await medicamento.update(req.body);
    await medicamento.save();
    res.json({ data: medicamento });
};

export const deleteMedicamento = async (req: Request, res: Response) => {
    const { id } = req.params;
    const medicamento = await Medicamento.findByPk(id);

    if (!medicamento) {
        return res.status(404).json({
            error: 'Medicamento No Encontrado'
        });
    }

    await medicamento.destroy();
    res.json({ data: 'Medicamento Eliminado' });
};

export const asignarMedicamentos = async (req: Request, res: Response) => {
    const { idPaciente, nombreMedicamento, cantidad } = req.body;

    console.log('Datos recibidos para asignación:', { idPaciente, nombreMedicamento, cantidad });

    const transaction = await db.transaction();
    try {
        // Verificar que el paciente existe
        const paciente = await Paciente.findByPk(idPaciente, { transaction });
        if (!paciente) {
            console.log('Paciente no encontrado');
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        console.log('Paciente encontrado:', paciente.dataValues);

        // Buscar medicamentos disponibles
        const medicamentos = await Medicamento.findAll({
            where: {
                nombre: nombreMedicamento,
                idPaciente: null
            },
            limit: cantidad,
            transaction
        });

        console.log('Medicamentos disponibles encontrados:', medicamentos);

        if (medicamentos.length === 0) {
            console.log('No se encontraron medicamentos disponibles');
            return res.status(404).json({ error: 'No se encontraron medicamentos disponibles' });
        }

        // Verificar que los medicamentos tienen la propiedad marca
        for (const medicamento of medicamentos) {
            console.log('Medicamento encontrado:', medicamento.dataValues);
        }

        // Asegurarse de que la marca no sea undefined
        const marca = medicamentos[0]?.dataValues?.marca;
        if (!marca) {
            console.error('La marca del medicamento es undefined');
            return res.status(400).json({ error: 'La marca del medicamento es undefined' });
        }

        const inventarioActual = await InventarioActual.findOne({
            where: { nombreMedicamento, marca },
            transaction
        });

        const dataInventario = inventarioActual.dataValues
        console.log('Inventario actual encontrado:', inventarioActual.dataValues);

        if (!dataInventario) {
            console.error('Inventario no encontrado');
            return res.status(404).json({ error: 'Inventario no encontrado' });
        }

        if (medicamentos.length < cantidad) {
            const demanda = cantidad - medicamentos.length;
            console.log('Demanda adicional:', demanda);
            await inventarioActual.update({ demanda: dataInventario.demanda + demanda }, { transaction });

            console.log('No hay suficientes medicamentos disponibles');
            return res.status(400).json({ error: 'No hay suficientes medicamentos disponibles', demanda });
        }

        console.log('Medicamentos encontrados:', medicamentos);

        // Asignar medicamentos al paciente
        for (const medicamento of medicamentos) {
            const data = medicamento.dataValues;
            console.log('Asignando medicamento:', data);

            // Verificar que idPaciente no sea undefined o NaN
            if (!idPaciente || isNaN(idPaciente)) {
                console.error('idPaciente es inválido:', idPaciente);
                return res.status(400).json({ error: 'idPaciente es inválido' });
            }

            await medicamento.update({ idPaciente }, { transaction });
            console.log('Medicamento asignado:', medicamento);
        }

        // Verificar que cantidad no sea NaN
        const nuevaCantidad = dataInventario.cantidad - cantidad;
        if (isNaN(nuevaCantidad)) {
            console.error('La nueva cantidad es NaN:', nuevaCantidad);
            return res.status(400).json({ error: 'La nueva cantidad es inválida' });
        }

        console.log('Nueva cantidad en inventario:', nuevaCantidad);

        // Actualizar stock en inventario
        await inventarioActual.update({ cantidad: nuevaCantidad }, { transaction });
        console.log('Inventario actualizado:', inventarioActual.dataValues);

        await transaction.commit();
        res.status(200).json({ message: 'Medicamentos asignados correctamente' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error al asignar medicamentos:', error);
        res.status(500).json({ error: 'Error al asignar medicamentos' });
    }
};


