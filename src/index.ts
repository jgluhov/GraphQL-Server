import { graphql, buildSchema  } from 'graphql'

const schema = buildSchema(`
  type Query {
    foo: String
  }

  type Schema {
    query: Query
  }
`)

const resolvers = {
  foo: () => 'bar'
}

const query = `
  query myQuery {
    foo
  }
`

graphql(schema, query, resolvers)
  .then(console.log)
  .catch(console.error);