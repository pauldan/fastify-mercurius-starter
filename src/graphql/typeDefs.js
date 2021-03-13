const gql = require('graphql-tag');
const typeDefs = gql`
  scalar DateTime
  type Query {
    add(x: Int, y: Int): Int
    users: [User]
    posts: [Post]
    profiles: [Profile]
    login(username: String, password: String): User
    me: User
    logout: Boolean
  }
  type User {
    id: ID!
    email: String!
    name: String
    username: String!
    posts: [Post]
    profile: Profile
  }

  type Post {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime
    title: String!
    content: String
    published: Boolean
    author: User!
    authorId: Int
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
    userId: ID!
  }

  interface Node {
    id: ID!
  }
`;
/*
  Reference

  XWhereUniqueInput {

  }
  connection: {
    pageInfo: {
      hasNexPage: boolean!
      hasPreviouPage: boolean!
      startCursor: string
      endCursor: string
    },
    edges: [
      node: X!
      cursor: String
    ],
    aggregate:{
      count: Int!
    }
  }

  interface Node {
    id: ID!
  }
*/
module.exports = typeDefs;
