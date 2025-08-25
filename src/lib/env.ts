import { createEnv } from "@t3-oss/env-nextjs";
import packageJSON from "../../package.json";

export const version = packageJSON.version;
export const majorVersion = packageJSON.version.split(".").slice(0, 2).join(".");

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {},
  client: {},
  experimental__runtimeEnv: {},
});

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
