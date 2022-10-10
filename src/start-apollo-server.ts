import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import { GRAPHQL_PATH } from "./config.js";
import type { Express } from "express";

export async function startApolloServer(app: Express) {
  const graphQLServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await graphQLServer.start();

  graphQLServer.applyMiddleware({ app, path: GRAPHQL_PATH });

  return graphQLServer;
}
