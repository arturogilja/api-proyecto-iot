import * as express from 'express'
import { Application, json, urlencoded } from 'express'
import { createConnection, getRepository, getTreeRepository } from 'typeorm'
import { Item } from './entities/Item'
import { createServer } from 'http'
import * as socketio from 'socket.io'

load()
async function load() {
  const connection = await createConnection()

  const app = express()
  const server = createServer(app)
  const io = socketio(server)

  app.use(json())
  app.use(urlencoded({ extended: true }))

  io.on('connection', () => {
    console.log('Conectado')
  })

  app.post('/items', async (req, res, next) => {
    if (!req.body) return res.status(400).send()
    const nombre: string = req.body.nombre
    const descripcion: string = req.body.descripcion

    if (!nombre || !descripcion) return res.status(400).send()

    let item = new Item()
    item.nombre = nombre
    item.descripcion = descripcion
    item.active = false

    try {
      item = await getRepository(Item).save(item)
    } catch (err) {
      return res.status(500).send(err)
    }
    return res.json({ ...item })
  })

  app.get('/items', async (req, res, next) => {
    const items = await getRepository(Item).find()
    return res.json(items)
  })

  app.get('/items/:id', async (req, res, next) => {
    const id = req.params.id
    const item = await getRepository(Item).findOne(id)
    if (!item) return res.status(404).send()
    return res.json(item)
  })

  app.patch('/items/:id/toggle', async (req, res, next) => {
    const id = req.params.id
    const item = await getRepository(Item).findOne(id)
    if (!item) return res.status(404).send()
    item.active = !item.active
    await getRepository(Item).save(item)
    io.send('toggle', item)
    return res.status(200).send()
  })

  server.listen(4500, () => {
    console.log('Server Running')
  })
}
