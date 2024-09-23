import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Pacientes  from './Paciente.model'

@Table({
    tableName: "HistoriasClinicas"
})
class HistoriaClinica extends Model {
    @Column({
        type: DataType.STRING
    })
    descripcion!: string;

    @Column({
        type: DataType.DATE
    })
    fecha!: Date;

    @ForeignKey(() => Pacientes)
    @Column({
        type: DataType.INTEGER
    })
    pacienteId!: number;

    @BelongsTo(() => Pacientes)
    paciente!: Pacientes;
}

export default HistoriaClinica;