export const MAX_FILES = 1;

/** 16 MB */
export const MAX_FILE_SIZE = 16 * 1024 ** 2;

export const {
  PORT = 4000,
  URI = "mongodb://localhost/image-uploader",
  URL = `http://localhost:${PORT}`,
} = process.env;

export const GRAPHQL_PATH = "/graphql";

export const IMAGES_PATH = "/image/:id";
