import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'Santos Luzardo <admin@SantosLuzardo.com>',
            to: user.email,
            subject: 'Santos Luzardo te invita a Registrarte',
            text: 'Santos Luzardo - Registra tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en Santos Luzardo, ya casi está todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/api/auth/confirm/${user.token}">Confirmar cuenta</a>
                <p>Este token expira en 24 horas</p>`
        });

        console.log('Mensaje enviado', info.messageId);
    }
}
