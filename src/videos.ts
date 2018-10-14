import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import { getVideoById, IVideo } from './data';
import { getVideos, createVideo } from './data';

const queryArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    description: 'The id of the video'
  }
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

export const queryFields = {
  videos: {
    type: new GraphQLList(videoType),
    resolve: () => getVideos()
  },
  video: {
    type: videoType,
    args: queryArgs,
    resolve: (_: any, args: any) => {
      return getVideoById(args.id);
    }
  }
}

export const mutationFields = {
  createVideo: {
    type: videoType,
    args: {
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
    resolve: (_: any, args: any) => {
      return createVideo(args as IVideo);
    }
  }
}