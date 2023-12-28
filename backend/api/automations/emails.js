import { Client } from '../../config/mongodb.js';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import "dotenv/config";

const sendEmail = async (req, res) => {
    try {
        // Agendar o envio automático de e-mails todo dia 5 do mês às 12:00
        cron.schedule('0 12 5 * *', async () => {
            try {
                const negativeBalanceTransactions = await Client.find({
                    balance: { $lt: 0 }
                });

                for (const client of negativeBalanceTransactions) {
                    try {
                        const transporter = nodemailer.createTransport({
                            service: 'outlook',
                            auth: {
                                user: process.env.email,
                                pass: process.env.emailPass
                            }
                        });

                        await transporter.sendMail({
                            from: process.env.email,
                            to: client.email,
                            subject: 'Automatic message',
                            text: '',
                            html: '<p>Esta é uma mensagem automática te atualizando sobre seu saldo devedor!</p>'
                        });

                        console.log(`E-mail enviado para ${client.email}`);
                    } catch (error) {
                        console.error('Erro ao enviar e-mail para', client.email, error);
                        // Tratar o erro conforme necessário, por exemplo, registrar ou enviar uma resposta de erro
                    }
                }

                console.log('E-mails enviados para clientes com saldo negativo.');
            } catch (error) {
                console.error('Erro ao consultar/transmitir transações:', error);
                // Tratar o erro conforme necessário, por exemplo, registrar ou enviar uma resposta de erro
            }
        });

        return res.json({ message: "Agendamento para envio mensal de e-mails realizado." });
    } catch (error) {
        console.error('Erro ao configurar agendamento:', error);
        return res.status(500).json({ message: "Erro interno" });
    }
}

export {sendEmail};
