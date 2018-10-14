import express from 'express'
import graphqlHttp from 'express-graphql'
import * as videos from './videos'

import { GraphQLSchema, GraphQLObjectType } from 'graphql'

const PORT = process.env.PORT || 3000
const server = express()

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    ...videos.queryFields
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...videos.mutationFields
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
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
