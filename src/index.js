const express = require('express')
const hello = require('./hello/routes')
const todos = require('./todos/routes')
const log = require('./middleware/logger')
const errorHendler = require('./middleware/error')

const app = express()

app.use(express.json())
//app.use(log()) -Error: is not a function
app.use('/hello', hello)
app.use('/todos', todos)

app.use(errorHendler())

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor Iniciado')
})
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })