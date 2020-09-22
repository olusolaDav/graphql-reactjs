const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema =require('./schema/schema')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express();



mongoose.connect(
    process.env.DB_CONNECTION_STRING, 
    {useUnifiedTopology: true, useNewUrlParser: true }
)

mongoose.connection.once('open', ()=> {
    console.log('database is connected')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=> {
    console.log('now listening requests on port localhost:4000')
})

