import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Pacientes from './Paciente.model';

@Table({
    tableName: "EntregasMedicamentos"
})
class EntregaMedicamentos extends Model {
    @Column({
        type: DataType.DATE
    })
    fechaEntrega!: Date;

    @Column({
        type: DataType.STRING
    })
    medicamento!: string;

    @Column({
        type: DataType.INTEGER
    })
    cantidad!: number;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    expirationDate?: Date;

    @ForeignKey(() => Pacientes)
    @Column({
        type: DataType.INTEGER
    })
    pacienteId!: number;

    @BelongsTo(() => Pacientes)
    paciente!: Pacientes;
}

export default EntregaMedicamentos;
