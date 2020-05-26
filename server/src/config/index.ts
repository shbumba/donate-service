import dotenv from "dotenv";
import mongo from "./mongo";
import cors from "@koa/cors";

dotenv.config({ path: ".env" });

const isDevMode = process.env.NODE_ENV == "development";

const corsConfig: cors.Options = {
  origin: "http://example.com",
  allowMethods: "PUT",
};

const config = {
  port: +(process.env.PORT || 3000),
  debugLogging: isDevMode,
  mongo,
  cors: corsConfig
};

export default config;
