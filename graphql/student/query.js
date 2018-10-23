const { GraphQLNonNull, GraphQLID } = require('graphql');
const { type: StudentType } = require('./type');
const faker = require('faker');

module.exports.query = {
  student: {
    type: StudentType,
    description: 'Returns a student by ID',
    args: {
      // When using this query, we need to supply it an ID
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (source, args) => {

      /*
       * Resolve a student with partial data, the student
       * will able to retrieve the data given here
       * and supplement it with other "network" calls later
       * , if necessary
       * 
       * When passing in arguments to this query, args object
       * will contain the values
       * 
       * In this case, args.id will contain the id.
       */
      return Promise.resolve({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
      });
    },
  },
};
