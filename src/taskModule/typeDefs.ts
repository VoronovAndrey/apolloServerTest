import { gql } from "apollo-server-express";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Task {
    _id: ID
    todo: String
    isDone: Boolean
  }

  type Query {
    tasks: [Task]
    task(taskId: ID!): Task
  }

  input TaskInput {
    todo: String
    isDone: Boolean
  }
  
  type Mutation {
    addTask(title: String!): Task
    removeTask(taskId: ID!): Boolean
    updateTask(taskId: ID!, taskInput: TaskInput): Boolean
  }
`;