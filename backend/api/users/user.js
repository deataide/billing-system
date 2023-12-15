import bcrypt from "bcrypt";
import { User } from "../../config/mongodb.js";
import { existsOrError, generateToken} from "../utils.js";
import "dotenv/config";

const createUser = async (req, res) => {
  const user = { ...req.body };

  try {
    existsOrError(user.name, "Nome inválido.");
    existsOrError(user.email, "E-mail inválido.");
    existsOrError(user.password, "Senha inválida.");

    const userAlreadyExists = await User.findOne({ email: user.email });
    if (userAlreadyExists) {
      return res.json({ message: "Email já foi utilizado." });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      name: user.name,
      password: hashedPassword,
      email: user.email,
    });
    await newUser.save();

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({error});
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido." });
  }

  try {
    const userInfo = await User.findOne({ _id: id }).select(
      "_id name email"
      
    ).populate('clients', 'name balance');
    ;

    if (!userInfo) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    return res.json(userInfo);
  } catch (error) {
    console.log(error)
  }
};

const getUsers = async (req, res) =>{

try {

  const users = await User.find().select("_id name email createdAt")

  if(!users){
    res.status(400).json({message:  "Internal Error"})
  }

  return res.json({users})
  
} catch (error) {
  res.status(400).json({message: error.message})
}


}

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    existsOrError(userId, "ID de usuário não fornecido.");

    await User.deleteOne({ _id: userId });

    const deletedUser = await User.findOne({ _id: userId });

    if (deletedUser) {
      res.json({ message: "Usuário ainda persiste." });
    } else {
      res.json({ message: "Usuário não encontrado ou excluído com sucesso." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createUser, getUser, deleteUser, getUsers};
