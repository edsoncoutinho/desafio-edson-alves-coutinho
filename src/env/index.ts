import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string().url(),
  GOOGLE_SPREADSHEET_ID: z.string(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
  GOOGLE_PRIVATE_KEY: z.string(),
  GOOGLE_SCOPE: z.string(),
  API_FOOTBALL_URL: z.string(),
  API_FOOTBALL_HOST: z.string(),
  API_FOOTBALL_KEY: z.string(),
  CONSUMER_LEAGUE_ID: z.coerce.number(),
  CONSUMER_SEASON: z.coerce.number(),
  CONSUMER_NUMBER_OF_PLAYERS: z.coerce.number(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("\u{1F6A8} Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
