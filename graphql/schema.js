const { GraphQLSchema } = require('graphql');

const { query } = require('./root/query');
const { mutation } = require('./root/mutation');

/*
 * The main schema from which the GraphQL engine
 * can resolve queries and mutations
 */
module.exports.schema = new GraphQLSchema({
  query, // The main entry point to all the QUERIES in the graphql system
  // mutation, // The main entry point to all the MUTATIONS in the graphql system
});
