const { GraphQLNonNull, GraphQLList, GraphQLID } = require('graphql');
const { type: IrregularityType } = require('./type');
const faker = require('faker');

/*
 * The main reason that we want to demonstrate this query is to
 * show the user the use of DataLoader.
 * 
 * If you look at the IrregularityType, we will see that it loads
 * an arbitrary list of students by id. With DataLoader, we can
 * make efficient network queries by bulk querying from the network.
 * 
 * Once the query returns a value, DataLoader caches the response
 * for those values. There are configurations to disable this cache
 * Look at https://github.com/facebook/dataloader for details.
 * 
 * If you do disable the cache, you are still able to get benefits
 * from DataLoader because it will deduplicate requests if those 
 * requests are made within a small window (for each request).
 *
 */

module.exports.query = {
  allIrregularites: {
    type: new GraphQLNonNull(new GraphQLList(IrregularityType)),
    description: 'Returns all irregularities.',
    resolve: (source, args) => {
      // Return an array of length 1-5, to simulate the laoded irregularites
      return [...Array(faker.random.number({ min: 1, max: 5 }))].map(
        (item) => ({})
      );
    },
  },
};
