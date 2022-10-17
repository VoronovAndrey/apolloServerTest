import express, { Express, Request, Response } from "express";
// import { ApolloServer } from '@apollo/server';
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { typeDefs } from './taskModule/typeDefs'
import { resolvers } from './taskModule/resolvers'

dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const serverStart = async () => {
  const app = express();

  await server.start()

  server.applyMiddleware({ app })


  app.use((req, res) => {
    res.status(200);
    res.send(template());
    res.end();
  });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

// connect to DB, and start server after connect
mongoose
  .connect(`${URI}`, {
    retryWrites: true,
    w: 'majority',
    dbName: 'TasksDb',
  })
  .then(() => {
    console.log('connected');
    serverStart()

  })
  .catch((err) => {
    console.log(err);

  })

const template = () => {
  return `
    <HTML>
    <body style='text-align: center; height: 100vh; display: flex; align-items: center; flex: 1'>
    <a href='http://localhost:${PORT}${server.graphqlPath}'
        style='flex: 1'
    >🚀 Server ready</a>
    </body>
    </HTML>
    `
}