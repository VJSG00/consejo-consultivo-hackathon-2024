//Importamos los decoradores:
import { Table, Column, Model, DataType, Default, HasMany} from 'sequelize-typescript'
import HistoriaClinica from './HistoriaClinica.model';
import Alergia from './Alergias.model';
import EntregaMedicamentos from './EntregaMedicamentos.model';


//Creamos la tabla de datos, su nombre es paciente
@Table({
    tableName:"Pacientes"
})


//Heredamos Model a nuestra clase pacientes y le añadimos columnas con los decoradores.
class Pacientes extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    nombre!: string;

    @Column({
        type: DataType.STRING(100)
    })
    apellido!: string;

    @Column({
        type: DataType.INTEGER()
    })
    cedula!: number;

    @Column({
        type: DataType.STRING()
    })
    club!: string

    @Column({
        type: DataType.DATE
    })
    fechaNacimiento!: Date;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN()
    })
    enEspera!: boolean;

    @HasMany(() => HistoriaClinica)
    historiasClinicas!: HistoriaClinica[];

    @HasMany(() => Alergia)
    alergias!: Alergia[];

    @HasMany(() => EntregaMedicamentos)
    entregasMedicamentos!: EntregaMedicamentos[];
}

//Exportamos nuestro modelo
export default Pacientes

//Para generar Nuestros modelos, lo hacemos en db.ts