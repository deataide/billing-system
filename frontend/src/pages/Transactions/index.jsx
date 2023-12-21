import React, { useEffect, useState } from "react";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { FaRegTrashAlt, FaPen, FaEye, FaFile } from "react-icons/fa";
import Modal from 'react-modal';
import TransactionForm from "../../components/TransactionForm";

Modal.setAppElement('#root');

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user._id]);

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const openForm = (client) => {
    setIsModalOpen(false);
    setIsFormOpen(true);
    setSelectedClient(client);
  };

  const handleFormSubmit = (clientId, formData) => {
    console.log('Formulário enviado para o cliente com ID:', clientId);
    console.log('Dados do formulário:', formData);
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-col m-12 md:flex-row flex justify-between">
        <h1 className="text-center p-2 text-4xl font-bold">
          Clients Transactions
        </h1>
      </div>

      <div className="grid grid-cols-4">
        {currentClients.map((client, index) => (
          <div
            key={index}
            className="m-2 p-2 border border-gray-300 rounded flex justify-between"
          >
            <div className="flex flex-col">
              <p>{client.name}</p>
            </div>

            <div className="flex align-middle justify-between">
              <button
                className="hover:bg-blue-700 rounded-sm px-4"
                title="Ver transações"
                onClick={() => openModal(client)}
              >
                <FaEye />
              </button>
              <button
                className="hover:bg-green-700 rounded-sm px-4"
                title="Criar nova transação"
                onClick={() => openForm(client)}
              >
                <FaFile />
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
          <TransactionForm clientId={selectedClient?._id} onSubmit={handleFormSubmit} />
        </Modal>
      )}

      {/* Modal para exibir transações */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Transactions Modal"
      >
        {selectedClient !== null && selectedClient.transactions !== undefined ? (
          selectedClient.transactions.map((transaction, index) => (
            <div key={index}>
              <h2>{transaction.description}</h2>
              <h2>{transaction.date}</h2>
              <h2>{transaction.amount}</h2>
            </div>
          ))
        ) : (
          <h1 className="absolute top-0">Dont have</h1>
        )}

        {/* Botão para fechar o modal */}
        <button onClick={closeModal} className="absolute top-0 right-0">
          Close Modal
        </button>
      </Modal>
    </div>
  );
}
