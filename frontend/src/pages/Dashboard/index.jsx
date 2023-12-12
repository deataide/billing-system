import React from 'react';
import { useState } from 'react';
import ControlImage from '../../assets/control.png';
import Folder from '../../assets/Folder.png';
import { useNavigate, Link } from 'react-router-dom';
import User from '../../assets/User.png';
import Exit from '../../assets/sair (1).png'
import Bill from '../../assets/ala.png';
import Home from '../../assets/botao-de-inicio.png'
import Bills from '../../components/Bills';
import Logo from '../../assets/logo.png';
import {useAuth} from '../../context/AuthProvider/useAuth'
import CreateBills from '../../components/CreateBills';
function Dashboard() {
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('Home'); // Default menu selection
  const auth = useAuth()



  const Menus = [
    { title: 'Home', src:Home  },
    { title: 'Register a Bill', src: Bill }
  ];


  async function exit() {

     auth.logout()
    navigate('../', { replace: true });
  }
  const handleMenuClick = (title) => {
    setSelectedMenu(title);
  };



  return (
    <div className="flex ">
      <div
        className={`${
          open ? 'w-72' : 'w-20 '
        } duration-300 bg-blue-700 h-screen p-5 pt-8 relative`}
      >
        <img
          src={ControlImage}
          alt="a"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2
      border-blue-900 rounded-full ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex cursor-pointer items-center gap-x-4">
          <img src={Logo} className={`cursor-pointer duration-500`} />
          <h1
            className={`text-white font-bold text-x2 origin-left duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Menu
          </h1>
        </div>

        <ul className="mt-6">
          {Menus.map((menu, index) => (
           <li 
           key={index}
           className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer 
           p-2 hover:bg-pink-700 rounded-md mt-2 ${
             selectedMenu === menu.title ? 'bg-pink-700' : ''
           }`}
           onClick={() => handleMenuClick(menu.title)}
         >
              <img src={menu.src} className="w-7" />
              <span className={`${!open && 'hidden'} origin-left duration-300`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className=" h-screen flex-1 bg-neutral-200 flex justify-around items-center">
         

{selectedMenu === 'Home' ? <Bills/> : <CreateBills/>}

        <div
          className="absolute top-0 right-0
        font-bold text-1xl m-5 cursor-pointer"
          onClick={exit}
        >
          <img src={Exit} alt="Disconnect" className='w-7' />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
