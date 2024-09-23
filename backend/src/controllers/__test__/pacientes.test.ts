import request from 'supertest'
import server from '../../server'

describe('POST /api/pacientes', () => {
    
    it('should display validation errors', async () => {
        //Prueba de validacion al vacio:
        const response = await request(server).post('/api/pacientes').send({})  
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        //Cosas que no esperamos de la validacion al vacio:
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should validate that IdCard number  and greater than 1000000', async () => {
        //Prueba de validacion a IdCard menor a 1000000
        const response = await request(server).post('/api/pacientes').send({
            name: "Juan el Paciente de Prueba",
            IdCard: "Hola no soy un precio valido"
        })  
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2) //TODO: 1 tambien es valido

        //Cosas que no esperamos de la validacion a IdCard menor a 1000000:
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)


        })

    it('should create a new product' , async () => {
        
        const response = await request(server).post('/api/pacientes').send({
            "name": "Juan El Calvo",
            "IdCard": 123456789,
        })  //Aqui recomiendan usar una DB de prueba.

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')


    })
})

describe('GET /api/pacientes', () => {
    
    it('should check if api/pacientes url exist', async () => {
        const response = await request(server).get('/api/pacientes')
        expect(response.status).not.toBe(404)
    })
    
    
    it('GET a JSON response with pacientes', async () => {
        
        //Lo que esperamos de la lista de pacientes.
        const response = await request(server).get('/api/pacientes')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        //expect(response.body.data).toHaveLength(1)    //TODO: Añadir Variable para que sea dinamico
    
        //Lo que no esperamos de la lista de pacientes
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/pacientes/:id', () => {

    it('should return a 404 response for a non-existent paciente', async () => {
        const productId = 2000000
        const response = await request(server).get(`/api/pacientes/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("El paciente no está registrado")
    })

    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/pacientes/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('id no valido')
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/pacientes/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        // expect(response.body.errors).toHaveLength(1)
        // expect(response.body.errors[0].id).toBe(1)
    })
})

//Errores del PUT
describe('PUT /api/pacientes/:id', () => {
    
    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
                                .put('/api/pacientes/not-valid-url')
                                .send({  
                                    "name":"Juan el real",
                                    "admitted":true,
                                    "IdCard":3000000
                                })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('id no valido')
    })
    
    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/pacientes/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server)
                                .put('/api/pacientes/1')
                                .send({
                                    "name":"Juan el Remplazo",
                                    "admitted":true,
                                    "IdCard":30
                                })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Ingrese un numero de cedula valido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const IdCard=2000000
        const response = await request(server)
                                .put(`/api/pacientes/${IdCard}`)
                                .send({
                                    "name":"Juan el Remplazo",
                                    "admitted":true,
                                    "IdCard":3000000
                                })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('El paciente no está registrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data', async () => {
        const response = await request(server)
                                .put(`/api/pacientes/1`)
                                .send({
                                    "name":"Juan el Remplazo",
                                    "admitted":true,
                                    "IdCard":3000000
                                })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })

})

//NOS SALTAMOS PATCH para probar el test:coverage
describe('PATCH /api/pacientes/:id', ()=> {
    it('should return a 404 response for a non-existing product', async () => {
        const invalidId = 2000000
        const response = await request(server).patch(`/api/pacientes/${invalidId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("El paciente no está registrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('', async () => {
        const response = await request(server).patch('/api/pacientes/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        //expect(response.body.data.admitted).toBe(false)   TODO linea 71 de paciente.ts
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')

    })
})

//Errores del DELETE
describe('DELETE /api/pacientes/:id', () => {
    it('should check a valid ID', async () => {
        const response = await request(server).delete('/api/pacientes/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('id no valido')

    })

    it('should check for a register patient', async () => {
        const invalidId=2000000
        const response = await request(server).delete(`/api/pacientes/${invalidId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("El paciente no está registrado")

        expect(response.status).not.toBe(200)
    })

    it('should delete a product', async () => {
        const response = await request(server).delete("/api/pacientes/1")
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("El paciente fue borrado de la base de datos.")

        expect(response.status).not.toBe(404)
    })
})
