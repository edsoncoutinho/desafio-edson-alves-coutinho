import { type FastifyInstance } from "fastify";
import { consumerLeagues } from "./consumer-leagues";
import { consumerTeams } from "./consumer-teams";
import { consumerPlayers } from "./consumer-players";
import { feedSpreadsheet } from "./feed-spreadsheet";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function consumerRoutes(app: FastifyInstance) {
  /** Autenticated */
  app.get("/consumer/leagues", { onRequest: [verifyJWT] }, consumerLeagues);
  app.get("/consumer/teams", { onRequest: [verifyJWT] }, consumerTeams);
  app.get("/consumer/players", { onRequest: [verifyJWT] }, consumerPlayers);
  app.get("/feed", { onRequest: [verifyJWT] }, feedSpreadsheet);
}
