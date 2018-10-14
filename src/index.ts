import express from 'express'
import graphqlHttp from 'express-graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'

const PORT = process.env.PORT || 3000
const server = express()

type Video = {
  id: string,
  title: string,
  duration: number,
  watched: boolean
}

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'Video Actions',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The Id of the video'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video'
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise<Video>(resolve => {
        setTimeout(() => resolve({
          id: 'a',
          title: 'Terminator 2',
          duration: 180,
          watched: true
        })
      )})
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

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

server.use(
  '/graphql',
  graphqlHttp({
    schema,
    graphiql: true
  })
)

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
