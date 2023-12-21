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
      // Inicie o estado de carregamento
      setLoading(true);
      setError(null);

      // Faça uma requisição ao backend para validar o formulário
      const response = await apiWithToken.post("/new-transaction", {
        amount: data.amount,
        description: data.description,
        clientId: clientId,
        userId: user._id,
      });

      // Verifique se a transação foi bem-sucedida
      if (response.status === 200) {
        console.log("Transação bem-sucedida!");
        // Chame a função de envio do formulário do componente pai
        onSubmit(clientId, data);
        // Limpe o formulário após o envio
        reset();
      } else {
        // Exiba uma mensagem de erro ao usuário
        setError("Erro na transação. Por favor, tente novamente.");
        console.error("Erro na transação:", response);
      }
    } catch (error) {
      // Exiba uma mensagem de erro ao usuário
      setError("Erro na transação. Por favor, tente novamente.");
      console.error("Erro ao processar transação:", error);
    } finally {
      // Atualize o estado de carregamento, independentemente do resultado
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(validateForm)}>
      {/* Campos do formulário */}
      <label>
        Description:
        <input type="text" {...register("description")} />
      </label>
      <label>
        Amount:
        <input type="number" {...register("amount")} />
      </label>

      {/* Adicione feedback visual durante o envio */}
      {loading && <p>Enviando transação...</p>}

      {/* Exiba mensagens de erro */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ... outros campos do formulário */}
      <button type="submit" disabled={loading}>
        Enviar
      </button>
    </form>
  );
};

export default TransactionForm;
