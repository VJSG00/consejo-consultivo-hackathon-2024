import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'Organ.io <admin@Organ.io>',
            to: user.email,
            subject: 'Organ.io - Confirma tu cuenta',
            text: 'Organ.io - Confirma tu cuenta',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; font-weight: bold;">Bienvenido a Organ.io</h2>
                    <p style="color: #666; font-size: 16px;">Hola ${user.name}, has creado tu cuenta en Organ.io.</p>
                    <p style="color: #666; font-size: 16px;">Para completar el proceso de registro, por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Confirmar cuenta</a>
                    <p style="color: #666; font-size: 16px;">E ingresa el código: <b>${user.token}</b></p>
                    <p style="color: #666; font-size: 16px;">Este token expira en 10 minutos.</p>
                </div>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }

    static sendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'Organ.io <admin@Organ.io>',
            to: user.email,
            subject: 'Organ.io - Reestablece tu contraseña',
            text: 'Organ.io - Reestablece tu contraseña',
            html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; font-weight: bold;">Bienvenido a Organ.io</h2>
                    <p style="color: #666; font-size: 16px;">Hola ${user.name}, has solicitado reestablecer tu contraseña.</p>
                    <p style="color: #666; font-size: 16px;">Para reestablecer tu contraseña, por favor visita el siguiente enlace</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Reestablecer Password</a>
                    <p style="color: #666; font-size: 16px;">E ingresa el código: <b>${user.token}</b></p>
                    <p style="color: #666; font-size: 16px;">Este token expira en 10 minutos.</p>
                </div>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }
}