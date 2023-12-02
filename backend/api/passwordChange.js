import nodemailer from  'nodemailer' 
import jwt from 'jsonwebtoken'
import {generateToken} from "./utils.js";
import "dotenv/config";


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
      <a href="http://localhost:3000/redefinir-senha/${token}">Redefinir Senha</a>
    `
    });
  
    return res.json({message: "Mensagem enviada para seu email."})
     
    } catch (error) {
      console.log(error)
    }
  };
  
  const newPassword = async(req, res, next)=>{
      
    const token = req.params.token
    const newPassword = req.body.newPassword

    try {
       
    const convertedToken = token.toString()
  
    if (!convertedToken || typeof convertedToken !== 'string') {
      return res.status(400).json({ erro: 'Token inválido ou ausente' });
    }
  
    const secret = process.env.AuthSecret
    const user = await User.findOne({recuperationToken: convertedToken})
    
    await jwt.verify(convertedToken, secret, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ mensagem: "Sessão inválida.", erro: err.message });
      }
   });
  
    if (!user){
      return res.json(400).json({message: "Token inválido"})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
     user.password = hashedPassword
  
     user.recuperationToken = null
  
     await user.save()
  
  return res.status(200).json({message: "Senha alterada com sucesso!"})
      
    } catch (error) {
        res.status(400).json({message: message.error})
    }

  }

  export {changePassword, newPassword}