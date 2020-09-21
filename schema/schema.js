const graphql = require('graphql');
const _ = require('lodash')


const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

// dummy data
var books = [
    {name: 'Name of winds', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The final empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'Rich Daddy, Poor Daddy', genre: 'Motivational', id: '3', authorId: '3'},
    {name: 'The final destiny', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'A call to run', genre: 'Fantasy', id: '5', authorId: '1'},
    {name: 'The Cross of Babbylon', genre: 'Fantasy', id: '6', authorId: '2'},
    {name: 'The Business of the 21st Century', genre: 'Motivational', id: '7', authorId: '3'},
    {name: 'The Business school', genre: 'Motivational', id: '8', authorId: '3'},
    {name: 'Why we want to be rich', genre: 'Motivational', id: '9', authorId: '3'}
];

var authors = [
    {name: 'Patrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Robert T. Kiyosaki', age: 52, id: '3'}
]


const BookType =new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return _.find(authors, {id: parent.authorId} 
                )
            }
        }
    })
});

const AuthorType =new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from the db/other source
                return _.find(books, {id: args.id});
        },
            
            },
        
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }

            
        
    }        
        
  
});

module.exports= new GraphQLSchema({
    query: RootQuery
}) 

