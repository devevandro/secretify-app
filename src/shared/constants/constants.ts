import dotenv from "dotenv";
dotenv.config();

export const ENVIRONMENTS = {
  IS_DEV: process.env.NODE_ENV === "development",
  SECRETIFY_API: process.env.SECRETIFY_API,
  SECRETIFY_API_KEY: process.env.SECRETIFY_API_KEY,
  CRIPTO_API_URL: process.env.CRIPTO_API_URL,
  CRIPTO_API_KEY: process.env.CRIPTO_API_KEY,
};

export const PLATFORM = {
  IS_MAC: process.platform === "darwin",
  IS_WINDOWS: process.platform === "win32",
  IS_LINUX: process.platform === "linux",
};
