import React from 'react';
import logo2 from '/home/user/borrador-2/src/assets/logo2.png'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white p-3 flex justify-between items-center border-b-2">
      <div className="text-white text-2xl">
      <img
              src={logo2}
              alt="Logo2"
              style={{ width: "160px", height: "60px" }}
            />
      </div>
      <button className="text-sm bg-[#005d90] text-white px-4 py-2 rounded-lg hover:bg-[#35a1da]">Cerrar Sesión</button>
    </nav>
  );
};

export default Navbar;
