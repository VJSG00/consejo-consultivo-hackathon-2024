import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from "../../types/auth";
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../api/AuthApi";
import { toast } from "react-toastify";

export default function Register() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
    },

    onSuccess: (data) => {
        toast.success(data as string)
        reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Registro</h2>
        <form 
        onSubmit={handleSubmit(handleRegister)}
        noValidate
        >
          
          <div className="mb-4">
            <label className="block text-gray-700">Nombre de usuario</label>
            <input
              type="name"
              placeholder="Nombre de Registro"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "El Nombre de usuario es obligatorio",
              })}
            />
            {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "El Email de registro es obligatorio",
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "El Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Las contraseñas no coinciden'
            })}
          />
          
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Registrarse
          </button>
        </form>

        <nav className="mt-10 flex flex-col space-y-4">
            <Link
                to={'/auth/login'}
                className="text-center text-gray-300 font-normal"
            >¿Ya tienes cuenta? Iniciar Sesión</Link>

            <Link
                to={'/auth/forgot-password'}
                className="text-center text-gray-300 font-normal"
            >¿Olvidaste tu contraseña? Reestablecer</Link>
        </nav>

      </div>
    </div>
  );
};
