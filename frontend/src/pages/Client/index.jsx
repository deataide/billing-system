import React, { useEffect, useState } from "react";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const user = getUserLocalStorage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Número de itens por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentClients)

  // Função para alterar a página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiWithToken.get(`${user._id}/clients`);
        setClients(response.data.clients);
      } catch (error) {
        toast.error(error + " Don't forget to fill in all the fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    fetchData();
  }, [user._id]);



  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-col m-12 md:flex-row flex justify-between">
        <h1 className="text-center p-2 text-4xl font-bold">Clients</h1>

<Link to="/new-client">
        <button className="bg-red-700 rounded text-white p-4">New client</button>
</Link>
    
      </div>

      <div className="flex flex-col justify-center mt-4">
        {currentClients.map((client, index) => (
          <div key={index} className="m-2 p-4 border border-gray-300 rounded flex justify-between">
            {/* Renderize os detalhes do cliente aqui */}
            <div className="flex flex-col">
            <p>{client.name}</p>
            <p>Balance: R${client.balance}</p>
            <p>Balance: R${client.balance}</p>
            
            </div>

          <div className="flex flex-col align-middle justify-between">

<button className="hover:bg-red-700 rounded-sm p-2">
            <FaRegTrashAlt/>
</button>
  <button className="hover:bg-green-700 rounded-sm p-2">
            <FaPen/>
  </button>
          </div>
            {/* Adicione mais detalhes conforme necessário */}
          </div>
        ))}
      </div>



      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(clients.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-4 py-2 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}


