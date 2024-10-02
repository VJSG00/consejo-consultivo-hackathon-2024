import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const ConfirmAccountView: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/auth/confirm/${token}`;
        const response = await axios.get(url);
        setMessage(response.data.message);
        if (response.data.success) {
          setTimeout(() => {
            navigate('/auth/establecer-contraseña');
          }, 2000); // Redirigir después de 2 segundos
        }
      } catch (error) {
        setMessage('Error al confirmar la cuenta. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmAccount();
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className=" p-8">
        <h2 className="text-2xl font-bold mb-4">Confirmación de Cuenta</h2>
        {loading ? (
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        ) : (
          <>
            <p>{message}</p>
            <button
              onClick={() => navigate('/auth/establecer-contraseña')}
              className="mt-4 w-full bg-[#26589e] text-white py-2 rounded-sm hover:bg-[#35a1da] transition duration-300"
            >
              Crear Contraseña
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccountView;
