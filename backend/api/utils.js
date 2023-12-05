import "dotenv/config";
import jwt from "jsonwebtoken";

const generateToken =  (userData, recuperationTime) => {
  try {
    const secret = process.env.authSecret;
    let expiresIn = 60 * 60;

    if(recuperationTime===true){
      expiresIn = 60*5
  

    }
    // eslint-disable-next-line no-undef

    if (!secret) {
      throw new Error("A variável de ambiente authSecret não está definida.");
    }
    const token = jwt.sign({ userData }, secret, { expiresIn });

    return token
  } catch (error) {
    throw new Error("Erro ao gerar token.");
  }
};

const existsOrError = (value, msg)=> {
  if (!value) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === "string" && !value.trim()) throw msg;
}

export { existsOrError, generateToken };
