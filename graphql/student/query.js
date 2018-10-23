const { GraphQLNonNull, GraphQLID } = require('graphql');
const { type: StudentType } = require('./type');

module.exports.query = {
  student: {
    type: StudentType,
    description: 'Returns a student by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (source, args) => {
      return Promise.resolve({});
    }
  },
};