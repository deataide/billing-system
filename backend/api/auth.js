import { User } from "../config/mongodb.js";
import bcrypt from "bcrypt";
import { generateToken  } from "./utils.js";
import "dotenv/config";

export const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Email e/ou senha inválidos." });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ error: "Email e/ou senha incorretos." });
  }

  const senhaCorreta = await bcrypt.compare(req.body.password, user.password);
  if (!senhaCorreta)
    return res.status(401).json({ error: "Email e/ou senha incorretos." });

  const token = await generateToken(user._id)

  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    admin: user.admin,
  }
  
  return res.json({ ...payload,  token: token });
};


