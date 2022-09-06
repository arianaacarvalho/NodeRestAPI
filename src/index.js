const express = require('express')
const {TodosRepository} = require('./todos/repository')

const app = express()
app.use(express.json())

//GET hello
app.get('/hello', (req,res) => {
  res.status(200).send('Hello word!\n')
})

//GET /hello/:name
app.get('/hello/:name', (req, res) => {
  const name = req.params.name
  res.status(200).send(`Hello ${name}!\n`)
})

// ** TODOS **

const todosRepository = TodosRepository()
const notFound = {
  error: 'Not Found',
  message: 'Resource Not Found',
}

//GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = await todosRepository.get(id)
  if(!todo){
    res.status(404).send(notFound)
    return
  }
  res.status(200).send(todo)
})

//GET /todos
app.get('/todos', (_req, res) =>{
  todosRepository
  .list()
  .then(todos => res.status(200).send({ todos }))
})

//POST /todos
app.post('/todos', (req, res) => {
  const todo = req.body
  const inserted = todosRepository.insert(todo)

  res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})

//DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const found = await todosRepository.get(id)
  if(!found){
    res.status(404).send(notFound)
    return
  }
  await todosRepository.del(id)
  res.status(200).send()
})

//PUT /todos/:id
app.put('/todo/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = {...req.body, id}

  const found = await todosRepository.get(id)
  if(!found){
    res.status(404).send(notFound)
    return
  }
  const updated = await todosRepository.update(todo)
  res.status(200).send(updated)
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor Iniciado')
})
  .once('error', (error) => {
    console.error(error)
    process.exit(1)
  })