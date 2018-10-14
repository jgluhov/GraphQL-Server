import { graphql, buildSchema } from 'graphql'

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }
  type Query {
    video: Video
  }

  type Schema {
    query: Query
  }
`)

const resolvers = {
  video: () => ({
    id: '1',
    title: 'Hello World',
    duration: 180,
    watched: true
  })
}

const query = `
  query myQuery {
    video {
      id,
      title,
      duration,
      watched
    }
  }
`

graphql(schema, query, resolvers)
  .then(console.log)
  .catch(console.error)
