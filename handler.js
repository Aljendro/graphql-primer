'use strict';

const { graphqlLambda, graphiqlLambda } = require('apollo-server-lambda');
const { schema } = require('./graphql/schema');
const depthLimit = require('graphql-depth-limit');

/*
 * NOTE: this graphql handler comes from "apollo-server-lambda": "^1.4.0"
 * 
 * Please use the latest version of apollo-server-lambda.
 * 
 * This file uses "^1.4.0" because graphiqlLambda needs to be implemented
 * in "^2.0.0" and the purpose of this project is for demonstration purposes
 * only. 
 * 
 * For any production use please consider "apollo-server-lambda": "^2.0.0"
 * and load your graphiql UI through a local express server in the meantime.
 */
exports.graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  function callbackFilter(error, output) {
    if (!output.headers) {
      output.headers = {};
    }
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }
  graphqlLambda({
    schema,
    validationRules: [depthLimit(5)],
    tracing: true,
  })(event, context, callbackFilter);
};

exports.graphiqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  graphiqlLambda({
    endpointURL: '/graphql',
  })(event, context, callback);
};
