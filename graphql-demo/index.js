var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

var data = require('./data.json');
var userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		id: {
			type: graphql.GraphQLString,
		},
		name: {
			type: graphql.GraphQLString,
		},
	},
});

var query = new graphql.GraphQLObjectType({
	name: 'Query',
	fields: {
		user: {
			type: userType,
			args: {
				id: {
					type: graphql.GraphQLString
				},
			},
			resolve: function (_, args) {
				return data[args.id];
			}
		},
	}
});

var schema = new graphql.GraphQLSchema({
	query: query
});

// var schema = new graphql.GraphQLSchema({
// 	query: new graphql.GraphQLObjectType({
// 		name: 'Query',
// 		fields: {
// 			user: {
// 				type: userType,
// 				// `args` describes the arguments that the `user` query accepts
// 				args: {
// 					id: {
// 						type: graphql.GraphQLString
// 					}
// 				},
// 				// The resolve function describes how to "resolve" or fulfill
// 				// the incoming query.
// 				// In this case we use the `id` argument from above as a key
// 				// to get the User from `data`
// 				resolve: function (_, args) {
// 					return data[args.id];
// 				}
// 			}
// 		}
// 	})
// });


express()
	.use('/graphql', graphqlHTTP({
		schema: schema,
		pretty: true
	}))
	.listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
