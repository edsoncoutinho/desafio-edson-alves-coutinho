import { type FastifyRequest, type FastifyReply } from "fastify";

import { GoogleSpreadsheetService } from "@/lib/google-spreadsheet";
import { makeGetLeaguesUseCase } from "@/use-cases/factories/make-get-leagues-use-case";
import { makeGetTeamsUseCase } from "@/use-cases/factories/make-get-teams-use-case";
import { makeGetPlayersUseCase } from "@/use-cases/factories/make-get-players-use-case";

export async function feedSpreadsheet(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const googleSpreadsheetService = new GoogleSpreadsheetService();

    const getLeaguesUseCase = makeGetLeaguesUseCase();
    const { leaguesRows } = await getLeaguesUseCase.execute();
    await googleSpreadsheetService.addRows("leagues", leaguesRows);

    const getTeamsUseCase = makeGetTeamsUseCase();
    const { teamsRows } = await getTeamsUseCase.execute();
    await googleSpreadsheetService.addRows("teams", teamsRows);

    const getPlayersUseCase = makeGetPlayersUseCase();
    const { playersRows } = await getPlayersUseCase.execute();
    await googleSpreadsheetService.addRows("players", playersRows);

    return await reply.status(200).send();
  } catch (err) {
    return await reply.status(500).send();
  }
}
