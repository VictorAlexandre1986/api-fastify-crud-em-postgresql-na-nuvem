import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgresql.js";

const server = fastify()

const database = new DatabasePostgres()



server.get('/videos', async (req,res) =>{
    //Esse parametro não é obrigatório
    const search = req.query.search

    const videos = await database.list(search)

    return videos
})

server.post('/videos', async (req, res)=>{
    const conteudo = req.body
    

    await database.create({
        title:conteudo.title,
        description: conteudo.description,
        duration: conteudo.duration,
    })


    console.log(database.list())

    return res.status(201).send()
})
server.put('/videos/:id', async (req,res)=>{
    const  videoId = req.params.id
    const conteudo = req.body

    await database.update(videoId, {
        title : conteudo.title,
        description : conteudo.description,
        duration : conteudo.duration
    })

    return res.status(204).send()
})

server.delete('/videos/:id', async (req,res)=>{
    const videoId = req.params.id

    await database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})