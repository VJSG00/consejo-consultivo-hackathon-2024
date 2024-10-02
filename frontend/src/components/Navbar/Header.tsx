import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import logo2 from '../assets/logo2.png';

const Header = () => {
  return (
    <div>
      <Navbar className="border-b-2">
        <NavbarBrand>
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
          >
            <img
              src={logo2}
              alt="Logo2"
              style={{ width: "240px", height: "100%" }}
            />
          </Link>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Link to="/auth/login">
            <button className="py-2 px-4 my-2 rounded-lg text-sm bg-[#005d90] hover:bg-[#35a1da] transition duration-150">
              Iniciar Sesión
            </button>
          </Link>
          <NavbarToggle className="bg-gray-100 inline-flex items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden h-9" />
        </div>

        <NavbarCollapse className="flex flex-row items-center justify-center w-full md:order-1 space-x-4">
          <NavLink
            to="/about"
            className="self-center whitespace-nowrap text-sm font-semibold"
          >
            Quiénes somos
          </NavLink>
          <NavLink
            to="/mision"
            className="self-center whitespace-nowrap text-sm font-semibold"
          >
            Misión y Visión
          </NavLink>
          <NavLink
            to="/preguntas"
            className="self-center whitespace-nowrap text-sm font-semibold"
          >
            Preguntas frecuentes
          </NavLink>
          <NavLink
            to="/contacto"
            className="self-center whitespace-nowrap text-sm font-semibold"
          >
            Contacto
          </NavLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;
