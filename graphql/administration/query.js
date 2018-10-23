const { GraphQLNonNull, GraphQLID } = require('graphql');
const { type: AdministrationType } = require('./type');
const faker = require('faker');

module.exports.query = {
  administration: {
    type: AdministrationType,
    description: 'Returns an administration by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (source, args) => {
      return Promise.resolve({ someDate: faker.date.future(0) });
    },
  },
};