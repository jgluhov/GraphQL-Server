import express from 'express'
import graphqlHttp from 'express-graphql'
import { graphql, buildSchema } from 'graphql'

const PORT = process.env.PORT || 3000
const server = express()

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video: Video,
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`)

const videoA = {
  id: 'a',
  title: 'GraphQL Server',
  duration: 120,
  watched: false
}

const videoB = {
  id: 'b',
  title: 'GraphQL Client',
  duration: 80,
  watched: true
}

const videos = [videoA, videoB]

const resolvers = {
  video: () => ({
    id: '1',
    title: 'Hello World',
    duration: 180,
    watched: true
  }),
  videos: () => videos
}

server.use(
  '/graphql',
  graphqlHttp({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
)

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
