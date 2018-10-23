const { GraphQLNonNull, GraphQLID } = require('graphql');
const { type: StudentType } = require('./type');
const faker = require('faker');

module.exports.mutation = {
  updateStudent: {
    type: StudentType,
    description: 'Updates a single student entity.',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (source, args) => {

      /*
       * You can do any arbitrary side effect in mutations!
       *
       * You will notice, they do not look any different from
       * the query object we have in the next file.
       * 
       * However, the big difference comes when a mutation is
       * executed by the graphql engine.
       * 
       * mutations will be resolve in SEQUENCE, while queries
       * will resolve ASYNCHRONOUSLY (at least in node.js)
       * 
       * Since we have specified that this mutation returns a
       * StudentType, we must return an object that can resolve
       * to a student type.
       */
      return Promise.resolve({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
      });
    }
  }
};