import { Table, Column, Model, DataType, BeforeSave } from 'sequelize-typescript';

@Table({
    tableName: 'Users',
})
class Usuarios extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role!: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    confirmed!: boolean;

    @BeforeSave
    static async lowerCaseEmail(user: Usuarios) {
        if (user.email) {
            user.email = user.email.toLowerCase();
        }
    }
}

export default Usuarios;
