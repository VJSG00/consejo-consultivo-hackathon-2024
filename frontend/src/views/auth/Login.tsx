import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { UserLoginForm } from "../../types/auth";
import ErrorMessage from "../../components/ErrorMessage";
import { authenticateUser } from "../../api/AuthApi";
import { toast } from "react-toastify";


export default function Login() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  }) 

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="Password de Registro"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                to={'/auth/register'}
                className="text-center text-gray-300 font-normal"
            >¿No tienes cuenta? Crear Una</Link>

            <Link
                to={'/auth/forgot-password'}
                className="text-center text-gray-300 font-normal"
            >¿Olvidaste tu contraseña? Reestablecer</Link>
        </nav>

      </div>
    </div>
  );
};
