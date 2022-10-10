import { connect as connectToDatabase } from "mongoose";
import { fileURLToPath } from "url";
import { imageRouter } from "./routes/image.js";
import { PORT, URI, URL } from "./config.js";
import { startApolloServer } from "./start-apollo-server.js";
import { uploadRouter } from "./routes/upload.js";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirname = path.join(dirname, "./public");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(publicDirname));

app.use("/api/upload", uploadRouter);

app.use(imageRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) return res.json({ message: err.message });
  next();
});

await startApolloServer(app);

app.get("*", (_, res) => res.sendFile(path.join(publicDirname, "index.html")));

await connectToDatabase(URI).catch((err) => {
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`🚀 Connected to database ${URI}`);
  console.log(`🚀 App ready at ${URL}`);
});

export default app;
