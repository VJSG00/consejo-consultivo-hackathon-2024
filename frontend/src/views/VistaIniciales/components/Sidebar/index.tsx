// react-router packages
import { NavLink, useLocation } from "react-router-dom";

// react packages
import { useEffect, useState } from "react";

// other packages
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// react-icons
import { IoIosArrowBack } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { MdMenu } from "react-icons/md";

// assets
import logo3 from "/home/user/borrador-2/src/assets/logo3.png"

// components
import Submenu from "./SubMenu";

// Otros iconos
import { AiFillHome } from "react-icons/ai";
import { FaUserMd, FaUserFriends } from "react-icons/fa";

export default function SideBar() {
  // Tab es responsive
  let isTab = useMediaQuery({ query: "(max-width: 768px) " });
  const { pathname } = useLocation();

  // sidebar open state
  const [isOpen, setIsOpen] = useState(isTab ? false : true);

  const Sidebar_animation = isTab
    ? //mobile view
      {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0 ,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        //System view
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "6.5rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isTab) {
      // mobile
      setIsOpen(false);
    } else {
      // laptop - lo puedo cambiar si deseo.
      setIsOpen(false);
    }
  }, [isTab]);

  // pathname change -> close sidebar (only mobile view)
  useEffect(() => {
    isTab && setIsOpen(false);
  }, [pathname]);

  const subMenusList = [
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "Estadisticas", "Crear Entrega"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden sticky inset-0 max-h-screen z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
        }`}
      ></div>

      <motion.div
        variants={Sidebar_animation}
        initial={{ x: isTab ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className="bg-white  text-gray shadow-xl z-[999] w-[16rem] max-w-[16rem]
            h-screen overflow-hidden md:relative fixed"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 font-medium border-b border-slate-300 py-3 mx-3">
        <img
              src={logo3}
              alt="Logo"
              style={{ width: "80px", height: "80px" }}
          />
          <span className="text-xl whitespace-pre">Dashboard</span>
        </div>

        {/* Menus */}
        <div className="flex flex-col h-full ">
          {/* first */}
          <ul
            className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin
                    scrollbar-track-white scrollbar-thumb-slate-100 h-[70%] md:max-h-[68%]"
          >
            <li>
              <NavLink to="/" className={"link"}>
                <AiFillHome size={23} className="min-w-max" />
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={"link"}>
                <FaUserMd size={23} className="min-w-max" />
                Pacientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={"link"}>
                <FaUserFriends size={23} className="min-w-max" />
                Donantes
              </NavLink>
            </li>

            {/* with submenu */}
            {/* mobile view most show submenus */}
            {(isOpen || isTab) && (
              <div className="border-b py-5 border-slate-300">
                <small className="pl-3 text-slate-500 inline-block  mb-2">
                  Categoria de Productos
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <Submenu data={menu} />
                  </div>
                ))}
              </div>
            )}

          </ul>
          
          {isOpen && (
            <div className="flex-1 text-sm z-50 max-h-48 my-auto whitespace-pre w-full font-medium">
              {/* <div className="flex items-center justify-between border-y border-slate-300 p-4">
                <div>
                  <p>Spark</p>
                  <small>No-cost 0$/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl ">
                  Upgrade
                </p>
              </div> */}
            </div>
          )}
        </div>

        {/* Controll button */}
        <motion.div
          animate={
            isOpen
              ? { x: 0, y: 0, rotate: 0 }
              : { x: -10, y: -200, rotate: 180 }
          }
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block hidden"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>

      <div className="m-3 md:hidden" onClick={() => setIsOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
}
