import React, { useEffect, useState } from "react";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const user = getUserLocalStorage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Número de itens por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Função para alterar a página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  async function deleteClient() {
    try {
      if (selectedClient) {
        const response = await apiWithToken.delete(
          `delete-client/${selectedClient._id}`
        );

        setSelectedClient(null);
        setIsModalOpen(false);
        // Atualize a lista de clientes após a exclusão
        const updatedClients = clients.filter(
          (client) => client._id !== selectedClient._id
        );
        setClients(updatedClients);

        toast.success("Sucessfull deleted", {
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
    } catch (error) {
      toast.error(
        "Don't forget that the client have to be R$0 or more than R$0",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  }

  const modalStyles = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "400px", // Ajuste conforme necessário
      width: "100%",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
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
          <button className="bg-red-700 rounded text-white p-4">
            New client
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-center mt-4">
        {currentClients.map((client, index) => (
          <div
            key={index}
            className="m-2 p-4 border border-gray-300 rounded flex justify-between"
          >
            {/* Renderize os detalhes do cliente aqui */}
            <div className="flex flex-col font-bold">
              <h3 className="text-red-700">Name: {client.name}</h3>
              <p className="text-blue-700">E-mail: {client.email}</p>
              <p className="text-green-700">Balance: R${client.balance}</p>
            </div>

            <div className="flex flex-col align-middle justify-between">
              <button className="hover:bg-red-700 rounded-sm p-2">
                <FaRegTrashAlt onClick={() => openModal(client)} />
              </button>
              <button className="hover:bg-green-700 rounded-sm p-2">
                <Link to={`/edit-client/${client._id}`}>
                  <FaPen
                    onClick={(client) => {
                      console.log(client);
                    }}
                  />
                </Link>
              </button>
            </div>

            {/* Modal para exibir transações */}
            <Modal
              style={modalStyles}
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Transactions Modal"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-4">Are you sure?</h1>
                <div className="flex justify-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => deleteClient()}
                  >
                    Yes
                  </button>

                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                    onClick={closeModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(clients.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-2 px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
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
