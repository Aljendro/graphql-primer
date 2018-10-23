const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const faker = require('faker');

module.exports.type = new GraphQLObjectType({
  name: 'AdministrationType',
  description: 'An administration type.',
  fields: () => {

    /*
     * We add this type here to prevent circular dependancies in node.
     * 
     * Graphql package will "lazy" load this type once its needed
     */
    const { type: StudentType } = require('../student/type');

    return ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (source, args) => {
          return faker.random.uuid();
        },
      },

      /*
       *  We can now start connecting different nodes in the graph together
       *  
       *  All we have to do is provide a return type that is another
       *  graphql object type.
       * 
       *  Return an object that can be interpreted as the graphql type.
       */
      studentsTesting: {
        type: new GraphQLList(StudentType),
        resolve: (source, args) => {
          return [...Array(faker.random.number({ min: 5, max: 20}))].map((item) => ({
            id: faker.random.uuid(),
            firstName: faker.name.firstName(),
          }));
        },
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (source, args) => {
          return `${faker.address.city()} High School`;
        },
      },
      adminStart: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (source, args) => {
          return source.someDate.toLocaleDateString();
        },
      },
      adminEnd: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: (source, args) => {
          if (faker.random.boolean()) {
            let result = new Date(source.someDate);
            result.setDate(result.getDate() + 1);
            return result.toLocaleDateString();
          } else {
            return source.someDate.toLocaleDateString();
          }
        },
      },
    });
  }
});
