import React from 'react';
import { useState } from 'react';
import ControlImage from '../../assets/control.png';
import Folder from '../../assets/Folder.png';
import { useNavigate, Link } from 'react-router-dom';
import User from '../../assets/User.png';
import Logo from '../../assets/logo.png';
import {useAuth} from '../../context/AuthProvider/useAuth'
function Dashboard() {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  const Menus = [
    { title: 'No Function', src: { Folder } },
    { title: 'No Function', src: { Folder } },
    { title: 'No Function', src: { Folder } },
  ];

  const auth = useAuth()

  function exit() {

    auth.logout()
    navigate('../', { replace: true });
  }

  return (
    <div className="flex">
      <div
        className={` ${
          open ? 'w-72' : 'w-20 '
        } duration-300 bg-purple-900 h-screen p-5 pt-8 relative`}
      >
        <img
          src={ControlImage}
          alt="a"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2
      border-purple-900 rounded-full ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex cursor-pointer items-center gap-x-4">
          <img src={Logo} className={`cursor-pointer duration-500`} />
          <h1
            className={`text-white font-bold text-x2 origin-left duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Menu Props
          </h1>
        </div>

        <ul className="mt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer 
              p-2 hover:bg-pink-700 rounded-md"
            >
              <img src={menu.src} />
              <span className={`${!open && 'hidden'} origin-left duration-300`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className=" h-screen flex-1 bg-purple-400 flex justify-around items-center">
        <div
          className=" text-gray-300 h-28 w-52 bg-pink-700 rounded  lg:flex lg:items-center
         lg:justify-around gap-x-4 cursor-pointer p-2 text-2xl"
        >
          <img src={Folder} />
          <span>Categories</span>
          <span> 5 </span>
        </div>
        <div
          className="text-gray-300 h-28 w-52 bg-pink-700 rounded  flex items-center 
        justify-around gap-x-4 cursor-pointer p-2 text-2xl"
        >
          <img src={Folder} />
          <span>Articles</span>
          <span> 5 </span>
        </div>
        <div
          className="text-gray-300 h-28 w-52 bg-pink-700 rounded  flex items-center 
        justify-around gap-x-4 cursor-pointer p-2 text-2xl"
        >
          <img src={Folder} />
          <span>Users</span>
          <span> 20 </span>
        </div>

        <div
          className="absolute top-0 right-0 bg-pink-700 rounded text-white 
        font-bold text-1xl m-5 cursor-pointer"
          onClick={exit}
        >
          <span>Exit</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
