import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import { getVideoById } from './data';
import { getVideos } from './data/index';

export const queryArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'The id of the video'
  }
}

export const videoType = new GraphQLObjectType({
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

export const fields = {
  videos: {
    type: new GraphQLList(videoType),
    resolve: () => getVideos()
  },
  video: {
    type: videoType,
    args: queryArgs,
    resolve: (_: any, args: any) => getVideoById(args.id)
  }
}