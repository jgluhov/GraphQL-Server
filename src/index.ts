import express from 'express'
import graphqlHttp from 'express-graphql'
import * as videos from './videos';
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

const PORT = process.env.PORT || 3000
const server = express()

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ...videos.fields
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

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
