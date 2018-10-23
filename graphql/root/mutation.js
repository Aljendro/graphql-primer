const { GraphQLObjectType } = require('graphql');

/*
 * The main entry point to all the MUTATIONS in the graphql system
 * 
 * Each entry in FIELDS is a graphql object that does some sort of side
 * effect in your system
 * 
 * The mutation can return a graphql object that can then be queried
 * like any other query object
 */
module.exports.mutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: () => {},
});
