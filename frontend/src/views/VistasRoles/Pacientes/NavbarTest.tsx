import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../../../assets/logo2.png';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el JWT del localStorage
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER');
    // Redirige a la página de inicio
    navigate('/');
  };

  return (
    <nav className="bg-white p-3 flex justify-between items-center border-b-2">
      <div className="text-white text-2xl">
        <img
          src={logo2}
          alt="Logo2"
          style={{ width: "160px", height: "60px" }}
        />
      </div>
      <button
        onClick={handleLogout}
        className="text-sm bg-[#005d90] text-white px-4 py-2 rounded-sm hover:bg-[#35a1da]"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
