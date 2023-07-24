import mongoose from 'mongoose'

const MONGO_USERNAME = 'johnatanSO'
const MONGO_PASSWORD = 'pW67rJ9mzs4o9MoU'
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
