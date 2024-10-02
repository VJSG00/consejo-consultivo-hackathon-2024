import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SetPasswordView: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const url = `${import.meta.env.VITE_API_URL}/auth/set-password`;
      const response = await axios.post(url, {
        email,
        password,
        confirmPassword,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000); // Redirigir después de 2 segundos
      }
    } catch (error) {
      setMessage('Error al establecer la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Establecer Contraseña</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="Nueva Contraseña"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#26589e] text-white py-2 rounded-sm hover:bg-[#35a1da] transition duration-300"
          >
            Establecer Contraseña
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-500">{message}</p>}
        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full bg-[#26589e] text-white py-2 rounded-sm hover:bg-[#35a1da] transition duration-300"
        >
          Ir al Login
        </button>
      </div>
    </div>
  );
};

export default SetPasswordView;
