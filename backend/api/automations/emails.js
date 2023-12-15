// enviar um email para um usuário que o user determinar e com a mensagem que o usuário determinar
import { User, Client } from "../../config/mongodb";

const sendEmail = async (req, res) => {
    const { clientId } = req.body;

    const mock = "EMPRESA TAL"
  
    try {
        const client = await Client.findById(clientId)
        if(!client){
            return res.json(400).json({error: "User doesn't exists"})
        }


    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth:{
        user: process.env.email,
        pass:process.env.emailPass
      }
    })
  
     await transporter.sendMail({
      from: process.env.email,
      to: client.email,
      subject: 'Automatic message',
      text: "",
      html: `
      <p>Esta é uma mensagem automática te atualizando sobre seu saldo devedor para a empresa ${mock}!</a>
    `
    });
  
    return res.json({message: "Mensagem enviada para seu email."})
     
    } catch (error) {
      return res.status(500).json({message: "Internal error"})
    }
  };