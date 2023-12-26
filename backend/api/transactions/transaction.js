import { Client, Transaction } from "../../config/mongodb.js";
import { existsOrError } from "../utils.js";

const newTransaction = async (req, res) => {
  const data = { ...req.body };

  try {
    existsOrError(data.userId, "Need's a user user Id");
    existsOrError(data.clientId, "Need's a user client Id");
    existsOrError(data.amount, "Need's a valid amount");
    existsOrError(data.description, "Need's a description");

    const client = await Client.findOne({ _id: data.clientId });

    if (!client) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const transactionAmount = parseFloat(data.amount);

    if (client.balance + transactionAmount < 0) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    const transaction = new Transaction({
      client: data.clientId,
      amount: transactionAmount,
      description: data.description,
    });

    await transaction.save();
    client.transactions.push(transaction);

    client.balance += transactionAmount;

    await client.save();

    return res
      .status(200)
      .json({ message: "Transaction successfully processed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export { newTransaction };
