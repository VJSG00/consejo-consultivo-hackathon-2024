import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#26589e] p-4 mt-4">
      <div className="container mx-auto text-white">
        <p className="text-bold text-xl"><strong>Contacto</strong></p>
      <p><strong>Número:</strong> +58 0251-2370234</p>
      <p><strong>Dirección</strong>: Calle seis del barrio Santos Luzardo, Barquisimeto,
            Venezuela.</p>
        <p><strong>Mail:</strong> info@medicamentos.com</p>
      </div>
    </footer>
  );
};

export default Footer;
