import routes from './config/routes.js'
import "dotenv/config";
import cors from 'cors'
import express from 'express'

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(routes)

app.use((req, res, next) => {
  if(req) next()
  res.status(404).json({ mensagem: "Endpoint não encontrado" });
});

app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
