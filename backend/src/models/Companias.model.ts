import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
  tableName: 'companias',
  timestamps: true // Para manejar createdAt y updatedAt automáticamente
})
class Companias extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type!: string; // Por ejemplo, 'suministrador', 'cliente', 'comprador'

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  direction!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  phone!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN
  })
  status!: boolean;
}

export default Companias;