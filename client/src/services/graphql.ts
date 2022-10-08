import { graphql } from "../gql";

export const IMAGE = graphql(`
  query Image($id: ID!) {
    image(id: $id) {
      createdAt
      filename
      id
      size
      url
    }
  }
`);
