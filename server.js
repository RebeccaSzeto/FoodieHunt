//import express from 'express';
//import GraphQLHTTP from 'express-graphql';
//import schema from './data/schema';

const express = require('express');
const schema = require('./data/schema');
const GraphQLHTTP = require('express-graphql');
const PORT = 8888;
const app = express();

app.use("/GraphQL", GraphQLHTTP({
     schema,
     graphiql: true
  })
);

app.listen(PORT, () => {
  console.log("Node/Express server for GraphQL app, listening on", PORT)
});
