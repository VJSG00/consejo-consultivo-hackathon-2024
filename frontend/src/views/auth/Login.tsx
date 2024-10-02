import {jwtDecode} from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { UserLoginForm } from "../../types/auth";
import ErrorMessage from "../../components/ErrorMessage";
import { authenticateUser } from "../../api/AuthApi";
import { toast } from "react-toastify";

export default function Login() {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      const token = data.token;
      const decodedToken: { role: string } = jwtDecode(token);
      const { role } = decodedToken;

      if (role === 'Gestor') {
        navigate('/dashboard/index');
      } else if (role === 'Donante') {
        navigate('/donantes');
      } else if (role === 'Paciente') {
        navigate('/pacientes');
      } else {
        toast.error('Rol no reconocido');
      }
    }
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lowercaseValue = event.target.value.toLowerCase();
    setValue('email', lowercaseValue, { shouldValidate: true });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Iniciar Sesión</h2>
        
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
              onChange={handleEmailChange}
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
            className="w-full bg-[#26589e] text-white py-2 rounded-sm hover:bg-[#35a1da] transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        
      </div>
    </div>
  );
}
