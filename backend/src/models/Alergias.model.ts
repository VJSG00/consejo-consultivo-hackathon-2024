import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import  Pacientes  from './Paciente.model';

@Table({
    tableName: "Alergias"
})
class Alergia extends Model {
    @Column({
        type: DataType.STRING
    })
    tipo!: string;

    @Column({
        type: DataType.STRING
    })
    severidad!: string;

    @ForeignKey(() => Pacientes)
    @Column({
        type: DataType.INTEGER
    })
    pacienteId!: number;

    @BelongsTo(() => Pacientes)
    paciente!: Pacientes;
}

export default Alergia;