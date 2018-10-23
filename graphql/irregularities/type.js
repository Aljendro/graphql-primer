const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const faker = require('faker');

/*
 *  This is how we create graphql objects that are essentially
 *  nodes in our graphql graph. 
 * 
 *  We can connect them arbitrarily just signifying the return 
 *  type with "type" to be another graphql type.
 */
module.exports.type = new GraphQLObjectType({
  name: 'IrregularityType',
  description: 'An irregularity type.',
  fields: () => {
    const { type: StudentType } = require('../student/type');
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (source, args) => {
          return faker.random.uuid();
        },
      },
      description: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (source, args) => {
          return faker.lorem.text();
        },
      },
      students: {
        type: new GraphQLList(StudentType),
        resolve: (source, args, context) => {
          /*
           * This is one of several functions that DataLoader package
           * contains. Use it to load students in bulk and cache
           * responses for this request only.
           * 
           * There is also an function that will clear a cache entry for
           * this request if you absolutely need it.
           * 
           * For more details visit https://github.com/facebook/dataloader
           */
          return context.dataloaders.studentDataLoader.loadMany(
            // Provide an arbitrary list of student ids
            [...Array(5)].map(() => {
              return Math.floor(Math.random() * 10);
            })
          );
        },
      },
    };
  },
});
