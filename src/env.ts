// Import env variables and ensure type safety, helps with TS type inference

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
};
