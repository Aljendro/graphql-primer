const { GraphQLNonNull, GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const faker = require('faker');

module.exports.type = new GraphQLObjectType({
  name: 'StudentType',
  description: 'A student type.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source, args) => source.firstName,
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source, args) => {
        return faker.name.lastName();
      },
    },
    dob: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source, args) => {
        return faker.date.past(17, new Date()).toLocaleDateString();
      },
    },
    imageURL: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source, args) => {
        return faker.image.imageUrl();
      },
    },
  }),
});
