const http = require('http')

const server = http.createServer((request, response) => {
  //GET /Hello/name -> Hello Name!
  if(request.method == 'GET' && /^\/hello\/\w+$/.test(request.url)){
    response.writeHead(200)
    const [,, name] = request.url.split('/')
    response.end(`Hello ${name}!\n`)
    return
  }
  //GET /hello -> Hello World!
  if(request.method == 'GET' && request.url.startsWith('/hello')){
    response.writeHead(200)
    response.end('Hello World!\n')
    return
  }
  //POST /echo
  if(request.method == 'POST' && request.url.startsWith('/echo')) {
    response.writeHead(200)
    request.pipe(response)
    return
  }

  //****************
  //** API TO DOO **
  //****************

  //id, title. text
  //POST /todos
  //GET /todos
  //GET /todos/:id
  //DELETE /todos/:id
  //PUT /todos/:id

  response.writeHead(404)
  response.end('Resource not found\n')
})

server.listen(3000, '0.0.0.0', () => {
  console.log('server started')
})