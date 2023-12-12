import React, { useEffect, useState } from "react";
import { apiWithToken } from "../../config/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const user = getUserLocalStorage();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Número de itens por página

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBills = bills.slice(indexOfFirstItem, indexOfLastItem);

  // Função para alterar a página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiWithToken.get(`${user._id}/bills`);
        setBills(response.data.bills);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user._id]);

  async function payed(param) {
    try {
      const response = await apiWithToken.put(`editBill/${param}`, {
        payed: true,
      });
      console.log(response);
      // Atualizar as contas após a alteração (se necessário)
      setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao pagar a conta:", error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-hidden">
        {currentBills.map((bill) => (
          <div
            key={bill._id}
            className="bg-blue-700 text-white p-5 rounded m-2 shadow-md max-w-full"
          >
            {/* Renderize as informações da conta aqui */}
            <p className="font-bold text-4xl pt-3 pb-3">{bill.name}</p>
            {/*<p>Payed: {bill.payed ? 'Yes' : 'No'}</p>*/}

            <button
              onClick={() => payed(bill._id)}
              className="bg-red-700 rounded w-full p-3 hover:bg-green-700 font-bold"
            >
              Payed
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(bills.length / itemsPerPage) }, (_, index) => (
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
    </div>
  );
}
