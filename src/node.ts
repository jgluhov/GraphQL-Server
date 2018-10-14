import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

export const nodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  }
})