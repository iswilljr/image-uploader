import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Image {
    createdAt: String!
    filename: String!
    id: ID!
    mimetype: String!
    size: Int!
    url: String!
  }

  type Query {
    image(id: ID!): Image
  }
`;
