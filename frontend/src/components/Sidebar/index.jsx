import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";

import {
  FaAddressBook,
  FaDoorClosed,
  FaSignal,
  FaAsterisk,
  FaDev,
  FaAngleLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();
  const auth = useAuth();

  const Menus = [
    { title: "Dashboard", icon: <FaSignal />, page: "dashboard" },
    { title: "Clients", icon: <FaAddressBook />, page: "clients" },
    { title: "Transaction", icon: <FaAsterisk />, page: "transactions" },
  ];

  function exit() {
    auth.logout();
    navigate("../", { replace: true });
  }

  function changePage(page) {
    navigate(`/${page}`, { replace: true });
  }

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } duration-300 bg-blue-700 h-screen p-5 pt-8 relative`}
      >
        <FaAngleLeft
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2
            border-blue-900 rounded-full ${
              !open && "rotate-180"
            } text-blue-900 text-2xl`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex cursor-pointer items-center gap-x-4">
          <FaDev className={`cursor-pointer duration-500 text-white`} />
          <h1
            className={`text-white font-bold text-x2 origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            Menu
          </h1>
        </div>

        <ul className="mt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer 
              p-2 hover:bg-blue-900 rounded-md"
              onClick={() => changePage(menu.page)} // Atualiza a página ao clicar no menu
            >
              {menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-300`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="absolute bottom-0 left-0 bg-blue-900 rounded text-white 
        font-bold text-1xl m-5 cursor-pointer"
          onClick={exit}
        >
          <span className="flex">
            <FaDoorClosed />
            Exit
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
