const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

let books = [
    {name:'Name of the wind', genre:'Fantasy',  id:'1', description:'Name of the wind some description'},
    {name:'The Final Empire', genre:'Fantasy',  id:'2', description:'The Final Empire some description'},
    {name:'The Long Earth', genre:'Scy-Fi',  id:'3', description:'The Long Earth some description'}
];

let authors = [
    {name:'author1', id:'1'},
    {name:'author2', id:'2'},
    {name:'author3', id:'3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from database
                return _.find(books, {id:args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from database
                return _.find(authors, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})