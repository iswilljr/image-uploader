import { UserInputError } from "apollo-server-core";
import { IMAGES_PATH, URL } from "./config.js";
import { Image } from "./image.js";
import { Resolvers } from "./types/gql.js";

export const resolvers: Resolvers = {
  Image: {
    url: (parent) => `${URL}${IMAGES_PATH.replace(":id", parent.id)}`,
  },
  Query: {
    image: async (parent, args) => {
      try {
        return await Image.findOne({ _id: args.id });
      } catch (err: any) {
        throw new UserInputError(err.message);
      }
    },
  },
};
