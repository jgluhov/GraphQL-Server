import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql'
import { getVideoById } from './data'
import { getVideos, createVideo } from './data'
import { nodeInterface } from './node'
import {
  globalIdField,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs,
  mutationWithClientMutationId
} from 'graphql-relay'

const queryArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'The id of the video'
  }
}

export const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'Video Actions',
  fields: {
    id: globalIdField(),
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
  },
  interfaces: [nodeInterface]
})

const { connectionType: VideoConnection } = connectionDefinitions({
  nodeType: videoType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'A count of total number of objects in this collection',
      resolve: (conn) => conn.edges.length
    }
  })
})

export const queryFields = {
  videos: {
    type: VideoConnection,
    args: connectionArgs,
    resolve: (_: any, args: any) =>
      connectionFromPromisedArray(getVideos(), args)
  },
  video: {
    type: videoType,
    args: queryArgs,
    resolve: (_: any, args: any) => {
      return getVideoById(args.id)
    }
  }
}

const videoMutation = mutationWithClientMutationId({
  name: 'AddVideo',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the video'
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video'
    },
    watched: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether or not the viewer has watched the video'
    }
  },
  outputFields: {
    video: {
      type: videoType
    }
  },
  mutateAndGetPayload: (args: any) => Promise.resolve(createVideo(args)).then((video) => ({video}))
})

export const mutationFields = {
  createVideo: videoMutation
}
