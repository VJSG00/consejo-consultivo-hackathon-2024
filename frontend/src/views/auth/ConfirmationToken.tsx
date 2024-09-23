import {Link} from 'react-router-dom' 
import { PinInput, PinInputField} from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ConfirmToken } from '../../types/auth'
import { toast } from 'react-toastify'
import { confirmAccount } from '../../api/AuthApi'

export default function ConfirmationToken() {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data as string)
        }
    })

    const handleChange = (token : ConfirmToken['token']) => {
        setToken(token)
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({token})

  return (
    <div className=" flex-col items-center justify-center">
        
        <div className="p-8 w-full max-w-md">

        <form action="">
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Confirma tu Cuenta</h2>
            <p>Ingresa el código que recibiste por email</p>
            <div className="flex mt-6 justify-center gap-5">
            
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                
            </div>
        </div>
        </form>
        </div>
        <Link
            to='/auth/request-code'
            className="text-center text-gray-300 font-normal"
        >
            Solicitar un nuevo Código
        </Link>
    </div>

  )
}

