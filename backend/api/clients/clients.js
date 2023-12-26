import { existsOrError } from "../utils.js";
import { Client , User } from "../../config/mongodb.js";

const createClient = async (req, res) => {
    const data = {...req.body};
  
    try {
      existsOrError(data.id, "Need's a user id");
      existsOrError(data.name, "Need's a name");
      existsOrError(data.email, "Need's a e-mail");
      existsOrError(data.adress, "Need's a adress");
      existsOrError(data.phone, "Need's a phone number");
    
      const client = { 
        name: data.name,
        email: data.email,
        adress: data.adress,
        phone: data.phone
      }
  
      const user = await User.findOne({_id: data.id});
  
      if (!user) {
         res.status(401).json({message: "User not found"})}
  
      const newClient = new Client(client)
      await newClient.save()
  
      user.clients.push(newClient)
  
      await user.save()
  
      return res.status(201).json("Client registered");
    } catch (error) {
      return res.status(400).json({error: error.message})
    }
  };

  const getClients = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userWithClientsAndTransactions = await User.findById(userId).select("_id name email adress balance").populate({
        path: 'clients',
        populate: {
          path: 'transactions',
        }
      });
  
      if (!userWithClientsAndTransactions) {
        return res.status(404).json({ message: 'User not found' });
      }

      userWithClientsAndTransactions.clients.sort((a, b) => a.name.localeCompare(b.name));
  
      return res.json(userWithClientsAndTransactions);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  const editClient = async (req, res) => {
    const clientId = req.params.clientId
    const data = { ...req.body };
  
    try {
      existsOrError(clientId, "Need's a client id");

      const client = await Client.findById(clientId);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      client.name = data.name || client.name;
      client.email = data.email || client.email;
      client.adress = data.adress || client.adress;
      client.phone = data.phone || client.phone;
  
      await client.save();
  
      return res.status(204).end()
    } catch (error) {

   return res.status(400).json({error: error.message})
    }
  };
  
  const deleteClient = async (req, res) => {
    const { clientId } = req.params;
  
    try {

      if (!clientId) {
        return res.status(400).json({ error: "Missing client id" });
      }


      const client = await Client.findOne({ _id: clientId });

      if (!client) {
        return res.status(404).json({ message: "Client doesn't exists" });
      }

      if (client.balance < 0) {
        return res.status(401).json({ message: "The balance has to bee R$0 or Up than this" });
      }

      await client.deleteOne();
  
      return res.status(204).end();
    } catch (error) {

      res.status(400).json({ message: error.message });
    }
  };
  

  export {createClient, getClients, deleteClient, editClient}