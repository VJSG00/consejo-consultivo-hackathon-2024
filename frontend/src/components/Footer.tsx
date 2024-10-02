import React from 'react';
import { Link } from 'react-router-dom';

const FooterFlowbite: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Inicio
            </Link>
            <Link to="/info" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Quiénes somos
            </Link>
            <Link to="/preguntas" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Preguntas frecuentes
            </Link>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Contacto</h2>
            <div className="mt-2 space-y-1">
              <p className="text-gray-700">
                Dirección: Calle seis del barrio Santos Luzardo, Barquisimeto, Venezuela.
              </p>
              <p className="text-gray-700">Número: +58 0251-2370234</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFlowbite;
