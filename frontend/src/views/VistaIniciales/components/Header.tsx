import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  
} from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
import logo2 from '../../../assets/logo2.png'

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
              style={{ width: "160px", height: "60px" }}
            />
          </Link>
        </NavbarBrand>
        {/* <TextInput
          type="text"
          placeholder="Buscar..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput> */}
        {/* <Button className="w-12 h-10 lg:hidden" color="gray" pill> */}
          {/* <AiOutlineSearch /> */}
        {/* </Button> */}
        <div className="flex gap-2 md:order-2">
          <Link to="/iniciar-sesion">
            <button className="py-2 px-4 rounded-lg self-center text-sm bg-[#005d90] hover:bg-[#35a1da]">
              Iniciar Sesion
            </button>
          </Link>
          <NavbarToggle className="bg-gray-100 inline-flex items-center rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden h-9" />
        </div>
        
        <NavbarCollapse>
          <NavLink
            to="/info"
            className="self-center whitespace-nowrap text-sm font-semibold dark:text-white"
          >
            Quiénes somos
          </NavLink>

          <NavLink
            to="/myv"
            className="self-center whitespace-nowrap text-sm font-semibold dark:text-white"
          >
            Misión y Visión
          </NavLink>
          <NavLink
            to="/preguntas"
            className="self-center whitespace-nowrap text-sm font-semibold dark:text-white"
          >
            Preguntas frecuentes
          </NavLink>
          <NavLink
            to="/contacto"
            className="self-center whitespace-nowrap text-sm font-semibold dark:text-white"
          >
            Contacto
          </NavLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Header;
