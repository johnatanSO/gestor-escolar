import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const MONGO_USERNAME = process.env.database_username
const MONGO_PASSWORD = process.env.database_password

const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@gestor-escolar-cluster.c2i24so.mongodb.net/`

mongoose.connect(mongoURL)
mongoose.connection
  .on(
    'error',
    console.error.bind(console, 'Erro ao conectar com o banco de dados'),
  )
  .once('open', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })

export default mongoose
