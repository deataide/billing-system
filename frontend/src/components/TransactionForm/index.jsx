import React from "react";
import { useForm } from "react-hook-form";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { apiWithToken } from "../../config/api";

const TransactionForm = ({ clientId, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();
  const user = getUserLocalStorage();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const validateForm = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiWithToken.post("/new-transaction", {
        amount: data.amount,
        description: data.description,
        clientId: clientId,
        userId: user._id,
      });

      if (response.status === 200) {
        onSubmit(clientId, data);

        reset();
      } else {
        setError("Erro na transação. Por favor, tente novamente.");
        console.error("Erro na transação:", response);
      }
    } catch (error) {
      setError("Erro na transação. Por favor, tente novamente.");
      console.error("Erro ao processar transação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center p-2 text-4xl font-bold mb-4">
        New Transaction
      </h1>

      <form onSubmit={handleSubmit(validateForm)} className="flex flex-col">
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="apperance-none block w-full py-3 px-4 
                  leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                   border-gray-200 focus:border-blue-200 rounded focus: outline-none mb-4"
        />

        <input
          type="number"
          placeholder="Amount"
          {...register("amount")}
          className="apperance-none block w-full py-3 px-4 
                  leading-tight text-gray-700 bg-gray-50 focus:bg-white border
                   border-gray-200 focus:border-blue-200 rounded focus: outline-none"
        />

        {loading && <p>Enviando transação...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-block w-full py-4 px-8 leading-none
                   text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded shadow"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
