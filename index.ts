import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connect as connectToDatabase } from "mongoose";
import { GRAPHQL_PATH, MAX_FILES, MAX_FILE_SIZE, PORT, URI, IMAGES_PATH } from "./config.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import multer from "multer";
import { Image } from "./image.js";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirname = path.join(dirname, "./public");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    files: MAX_FILES,
    fileSize: MAX_FILE_SIZE,
  },
});

app.get("/", (_, res) => res.sendFile(path.join(publicDirname, "index.html")));

app.post("/api/upload", upload.single("file"), async (req, res, next) => {
  const file = req.file;
  if (!file) throw new Error("You must provied at least 1 image");
  try {
    const image = new Image({
      filename: file.originalname,
      data: file.buffer,
      size: file.size,
      mimetype: file.mimetype,
    });

    await image.save();

    return res.json(image._id.toString());
  } catch (err) {
    next(err);
  }
});

app.get(IMAGES_PATH, async (req, res, next) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });

    if (!image) return next();

    res.setHeader("Content-Type", image.mimetype);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "public, max-age=14400, must-revalidate");
    res.setHeader("Content-Disposition", `filename=${image.filename}`);

    res.end(image.data);
  } catch (err) {}
});

app.all("*", (req, res, next) => {
  if (req.path === GRAPHQL_PATH || req.path.startsWith("/assets")) return next();
  res.sendFile(path.join(publicDirname, "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) return res.json({ message: err.message });
  next();
});

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

await graphQLServer.start();

graphQLServer.applyMiddleware({ app, path: GRAPHQL_PATH });

await connectToDatabase(URI).catch((err) => {
  console.error(err);
  process.exit(1);
});

app.use("/assets", express.static(path.join(publicDirname, "assets")));

app.listen(PORT, () => {
  console.log(`🚀 Coneccted to database ${URI}`);
  console.log("🚀 Client ready at http://localhost:4000");
  console.log(`🚀 Server ready at http://localhost:4000${graphQLServer.graphqlPath}`);
});

export default app;
