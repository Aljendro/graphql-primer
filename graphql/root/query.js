const { GraphQLObjectType } = require('graphql');
const { query: StudentQuery } = require('../student/query');

/*
 * The main entry point to all the QUERIES in the graphql system
 * 
 * Each entry in FIELDS returns a graphql object that can resolve
 * its fields.
 * 
 * The fields can be other graphql objects
 */
module.exports.query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    ...StudentQuery,
  }),
});
