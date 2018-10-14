import {
  nodeDefinitions,
  fromGlobalId,
  GraphQLNodeDefinitions
} from 'graphql-relay';

import { getObjectById } from './data';
import { videoType } from './videos';

const { nodeInterface, nodeField }: GraphQLNodeDefinitions = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    return getObjectById(type, id);
  },
  (object) => {
    if (object.title) {
      return videoType;
    }

    return null;
  }
);

export {
  nodeInterface,
  nodeField
}
