import invariant from "tiny-invariant";

export interface Config {
  apiUrl: string;
}

const apiUrl = import.meta.env.VITE_API_URL;
invariant(apiUrl, "Missing VITE_API_URL in .env file.");

const config: Config = {
  apiUrl,
};

export default config;
