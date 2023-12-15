import nodemailer from  'nodemailer' 
import jwt from 'jsonwebtoken'
import {generateToken} from "../utils.js";
import "dotenv/config";
import { User } from "../../config/mongodb.js";
import base64url from 'base64url'
import bcrypt from 'bcrypt'


const changePassword = async (req, res) => {
    const { email } = req.body;
  
    try {
    const user = await User.findOne({email: email})
  
    if(!user){
      return res.status(400).json({error: "Usuário inválido"})
    }
    
    const token = generateToken(email, true)
  
      user.recuperationToken = token
      await user.save()

    const encodedToken = base64url(token)
  
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth:{
        user: process.env.email,
        pass:process.env.emailPass
      }
    })
  
     await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: 'Recuperação de Conta',
      text: "",
      html: `
      <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha.</p>
      <a href="http://localhost:5173/new-password/${encodedToken}">Redefinir Senha</a>
    `
    });
  
    return res.json({message: "Mensagem enviada para seu email."})
     
    } catch (error) {
      console.log(error)
    }
  };
  
  const newPassword = async(req, res)=>{
      
    const token = req.params.token
    const newPassword = req.body.newPassword

    if(!newPassword){
      return res.status(400).json({ error: 'Digite sua nova senha' });
    }

    try {
       
      const decodedToken = base64url.decode(token)
  
    if (!decodedToken || typeof decodedToken !== 'string') {
      return res.status(400).json({ error: 'Token inválido ou ausente' });
    }
  
    const secret = process.env.AuthSecret
    
    const user = await User.findOne({recuperationToken: decodedToken})

    if (!user){
      return res.status(500).json({message: "Erro interno"})
    }

    try {
      
      jwt.verify(decodedToken, secret, (err) => {
       if (err) {
         return res
           .status(401)
           .json({ mensagem: "Sessão inválida.", erro: err.message });
       }
    });
    } catch (error) {
      return res.status(400).json({message: error})
    }

  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
     user.password = hashedPassword
  
     user.recuperationToken = null
  
     await user.save()
  
  return res.status(200).json({message: "Senha alterada com sucesso!"})
      
    } catch (error) {
      return res.status(500).json({message: error})
    }

  }

  export {changePassword, newPassword}