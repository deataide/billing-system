import React, { useEffect, useState } from "react";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { FaEye, FaFile, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import Modal from "react-modal";
import TransactionForm from "../../components/TransactionForm";

Modal.setAppElement("#root");

export default function Clients() {
  const [clients, setClients] = useState([]);
  const user = getUserLocalStorage();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Número de itens por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const response = await apiWithToken.get(`${user._id}/clients`);
      setClients(response.data.clients);
    } catch (error) {
      toast.error("Internal Error", {
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

  useEffect(
    () => {
      fetchData();
    },
    [user._id],
    [<TransactionForm />]
  );

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  const openForm = (client) => {
    setIsModalOpen(false);
    setIsFormOpen(true);
    setSelectedClient(client);
  };

  const handleFormSubmit = (clientId, formData) => {
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-col m-4 md:flex-row flex justify-between items-center">
        <h1 className="text-center p-2 text-4xl font-bold">
          Clients Transactions
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentClients.map((client, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="p-4">
              <p className="text-xl font-bold capitalize">{client.name}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2 text-sm sm:text-base md:text-lg lg:text-base transition-all duration-300 flex items-center"
                title="Ver transações"
                onClick={() => openModal(client)}
              >
                <FaEye className="mr-2" />
                Ver transações
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 md:ml-0 text-sm sm:text-base md:text-lg lg:text-base transition-all duration-300 flex items-center"
                title="Criar nova transação"
                onClick={() => openForm(client)}
              >
                <FaFile className="mr-2" />
                Nova transação
              </button>
            </div>
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

      {/* Modal para exibir formulário */}
      {isFormOpen && (
        <Modal
          isOpen={isFormOpen}
          onRequestClose={() => setIsFormOpen(false)}
          contentLabel="Transaction Form"
        >
          {/* Renderize o componente do formulário e passe o cliente atual como propriedade */}
          <TransactionForm
            clientId={selectedClient?._id}
            onSubmit={handleFormSubmit}
          />
          <button
            onClick={closeForm}
            className="absolute top-0 right-0 hover:bg-red-500 rounded-bl-md text-white"
          >
            <FaTimes className="m-4 text-black" />
          </button>
        </Modal>
      )}

      {/* Modal para exibir transações */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Transactions Modal"
      >
        {selectedClient !== null &&
          selectedClient.transactions !== undefined && (
            <>
              {selectedClient.transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="border p-4 mb-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {transaction.description}
                  </h2>
                  <p className="text-gray-600">
                    Date:{" "}
                    {format(new Date(transaction.date), "dd/MM/yyyy HH:mm:ss")}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Amount: R${transaction.amount}
                  </p>
                </div>
              ))}
            </>
          )}

        {/* Botão para fechar o modal */}
        <button
          onClick={closeModal}
          className="fixed top-10 right-10 mt-4 mr-4 p-2 bg-red-500 rounded-full text-white focus:outline-none focus-visible:ring focus-visible:border-blue-300"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Mensagem se não houver transações */}
        {(!selectedClient || !selectedClient.transactions) && (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl text-gray-500">Don't have transactions</h1>
          </div>
        )}
      </Modal>
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
