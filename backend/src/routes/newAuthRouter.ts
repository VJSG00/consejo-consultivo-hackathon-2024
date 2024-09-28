import { Router } from 'express';
//import { AuthController } from '../controllers/Auth/newAuthController';
import { confirmToken, createGestor, login, setPassword } from '../controllers/Auth/newAuthController';

const newAuthRouter = Router();

// Ruta para login
//newAuthRouter.post('/login', AuthController.login);

// Ruta para crear gestor
newAuthRouter.post('/create-gestor', createGestor);

//Ruta para verificar el jwt
newAuthRouter.get('/confirm/:token', confirmToken)

//Ruta para establecer la contraseña
newAuthRouter.post('/set-password', setPassword)

//Ruta para login
newAuthRouter.post('/login', login)

export default newAuthRouter;
