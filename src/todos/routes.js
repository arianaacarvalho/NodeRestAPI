const {Router} = require('express')
const {TodosRepository} = require('./repository')
const todosRepository = TodosRepository()

// ** TODOS **

const notFound = {
  error: 'Not Found',
  message: 'Resource Not Found',
}

const router = Router()

//GET /todos/:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const todo = await todosRepository.get(id)
  if(!todo){
    res.status(404).send(notFound)
    return
  }
  res.status(200).send(todo)
})

//GET /todos
router.get('/', (_req, res) =>{
  todosRepository
  .list()
  .then(todos => res.status(200).send({ todos }))
})

//POST /todos
router.post('/', (req, res) => {
  const todo = req.body
  const inserted = todosRepository.insert(todo)

  res
    .status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})

//DELETE /todos/:id
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

module.exports = router