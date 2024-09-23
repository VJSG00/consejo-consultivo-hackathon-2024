import /*server,*/ {connectDB} from '../server'
//import request from 'supertest'
import db from '../config/db'

//Esto lo elimino por temas de documentación.
// describe('GET /api', () => {
    
//     it('should send back a json response', async () => {
        
//         const res = await request(server).get('/api')
        
//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)

//         //Tambien podemos comprobar si el contenido es el correcto
//         console.log(res.text)       //No es iterable
//         console.log(res.body)       //Es iterable
//         console.log(res.body.msg)   //Prueba de que es iterable.
//         // Le impondremos que sea exactamente lo que esperamos
//         expect(res.body.msg).toBe('Api funcionando')    //Este codigo es sensible a mayusculas y minusculas
        
//         //Tambien debemos considerar los casos en donde la respuesta sea un error
//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe('api funcionando')
//     })
// })

//Voy a forzar el error de conexion exitosa a la base de datos.
jest.mock('../config/db')
describe('connectDB', () => {
    it('should handle database connection error', async ()=> {
        
        jest.spyOn(db, 'authenticate')  //Llama a un espia que busca la funcion authenticate aplicado a db
            .mockRejectedValueOnce(new Error('Hubo un error al conectar con la DB'))    //Este espia genera el error cuando el primer espia le dice que la funcion se ejecutó
        const consoleSpy = jest.spyOn(console, 'log')   //Este espia almacena el resultado del error, que en la linea 15 (server.ts) se nota que es un console log.
        
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(        //Este error solo debe provenir de ejecutar la accion de los espias (para eso los usamos)
            expect.stringContaining('Hubo un error al conectar con la DB')  //El resultado del error.
        )
    })
})






/*  Test de ejemplo
describe('Nuestro primer test', () => {
    it('Debe revisar que 1+1 sean 2', () =>{
        expect(1+1).toBe(2)
    })

    it('Debe revisar que 1+1 no sean 3', () =>{
        expect(1+1).not.toBe(3)
    })
})*/