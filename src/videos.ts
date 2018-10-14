import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} from 'graphql';

import { getVideoById } from './data';
import { getVideos, createVideo } from './data';
import { nodeInterface } from './node';
import { globalIdField } from 'graphql-relay';

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

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  fields: {
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
      video: {
        type: new GraphQLNonNull(videoInputType)
      }
    },
    resolve: (_: any, args: any) => {
      return createVideo(args.video);
    }
  }
}