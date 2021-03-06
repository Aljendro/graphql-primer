const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const faker = require('faker');
const { AppError } = require('../../errors/app-error');

/*
 *  This is how we create graphql objects that are essentially
 *  nodes in our graphql graph. 
 * 
 *  We can connect them arbitrarily just signifying the return 
 *  type with "type" to be another graphql type.
 */
const type = new GraphQLObjectType({
  name: 'StudentType',
  description: 'A student type.',
  fields: () => ({
    /*
     * In this case we are using the default "resolver".
     * 
     * This default "resolver" will look at the "source" 
     * object and look for an "id" attribute
     */
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    /*
     * In this case we are using our own "resolver", which
     * resembles what the default resolver will do.
     */
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source, args) => source.firstName,
    },
    /*
     * Sometimes the source object will not contain some
     * attributes.
     * 
     * We can get arbitrary values from anywhere!
     * 
     * This could have been a network call, cached query, 
     * or any type of call needed to get the result.
     */
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
        // You can now use AppError to throw some arbitrary error
        // inside of your graphql resolvers
        throw new AppError({ code: 'student:image_url_not_found' });
      },
    },
    bestFriend: {
      type: new GraphQLNonNull(type),
      resolve: (source, args) => {
        return {
          id: faker.random.uuid(),
          firstName: faker.name.firstName(),
        }
      }
    }
  }),
});

module.exports.type = type;
