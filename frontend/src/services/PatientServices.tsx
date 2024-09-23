import { safeParse} from "valibot";
import { DraftPatienteSchema, PatientsSchema, PatientSchema , Patient} from "../types/patient"
import axios from 'axios'
import { toBoolean } from "../utils";



type PatienteData = {
    [k: string]: FormDataEntryValue;
}

export async function addPatient(data : PatienteData) {
    try {
        const result = safeParse(DraftPatienteSchema, {
            name: data.name,
            IdCard: +data.IdCard
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/pacientes`
            const {data} = await axios.post(url, {
                name: result.output.name,
                IdCard: result.output.IdCard
            })
            console.log(data)
        } else {
            throw new Error('Datos no validos')
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export async function getPatients() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes`
        const {data} = await axios(url)
        const result = safeParse(PatientsSchema, data.data)
        if(result.success) {
            return result.output
        } else{
            throw new Error('Hubo un error...')
        }
        } catch (error) {
        console.log(error)
    }
}

export async function getPatientById(id: Patient['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`
        const {data} = await axios(url)
        const result = safeParse(PatientSchema, data.data)
        // console.log(result)
        if(result.success) {
            return result.output
        } else{
            throw new Error('Hubo un error...')
        }
        } catch (error) {
        console.log(error)
    }
}

//TODO: Rehacer el coerce de otra manera.
export async function updatePatient( data: PatienteData, id: Patient['id'] ) {
    try {
        // const NumberSchema = coerce(number(), Number)
        const result = safeParse(PatientSchema, {
            id,
            name: data.name,
            IdCard: +data.IdCard,
            admitted: toBoolean(data.admitted.toString())
        })
        
        console.log(result)
        /**
         * debug
         * console.log(result)
         */
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`
            await axios.put(url, result.output)
        }       
    } catch (error) {
        console.log(error)
    }
}

export async function deletePatient(id: Patient['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updatePatientAdmitted(id: Patient['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/pacientes/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}