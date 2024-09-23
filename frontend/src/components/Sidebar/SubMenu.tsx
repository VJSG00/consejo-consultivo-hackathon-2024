import {motion} from "framer-motion"
import {IoIosArrowDown} from "react-icons/io"
import { NavLink, useLocation } from "react-router-dom";
import type { IconType } from 'react-icons';
import { useState } from "react";

type SubmenuProps = {
    data: {
      name: string;
      icon: IconType;
      menus: string[];
    };
  }

export default function SubMenu({data} :SubmenuProps) {
  const {pathname} = useLocation()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  return (
    <>
        <li className={`link ${pathname.includes(data.name) && "text-blue-600" }`}
        onClick={()=> setSubMenuOpen(!subMenuOpen) }>
            {/* Dynamic icons */}
            <data.icon size={23} className="min-w-max"/>
            <p className="capitalize flex-1" >{data.name}</p>
            <IoIosArrowDown className={`${subMenuOpen && 'rotate-180'} duration-200`} />
        </li>
        <motion.ul
        animate={
          subMenuOpen ? {
            height: "fit-content"
          }:{
            height: 0
          }
        }
        className="flex flex-col pl-14 text-[0.8rem] font-normal overflow-hidden h-0">
          {
            data.menus.map( menu => (
              <li key={menu}>
                {/* ejemplo: build/auth */}
                <NavLink to={ `/${data.name}/${menu}`} className="link !bg-transparent capitalize">
                  {menu}
                </NavLink>
              </li>
            ))
          }
        </motion.ul>
    </>
  )
}
