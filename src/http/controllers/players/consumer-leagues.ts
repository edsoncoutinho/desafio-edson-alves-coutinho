import { type FastifyRequest, type FastifyReply } from "fastify";
import { ApiFootballService } from "@/lib/api-football";
import { makeConsumeLeagueUseCase } from "@/use-cases/factories/make-consumer-league-use-case";
import { env } from "@/env";

export async function consumerLeagues(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const consumerLeagueUseCase = makeConsumeLeagueUseCase();

  const perPage = 20;
  const totalPages = Math.ceil(env.CONSUMER_NUMBER_OF_PLAYERS / perPage);

  const leaguesToConsume = {};

  for (let page = 1; page <= totalPages; page++) {
    const apiFootballService = new ApiFootballService();

    const { leagues } = await apiFootballService.getLeagues({ page });

    Object.assign(leaguesToConsume, leagues);
  }

  Object.keys(leaguesToConsume).forEach(async (leagueId) => {
    const league = leaguesToConsume[leagueId];
    await consumerLeagueUseCase.execute({
      leagueId: league.id,
      name: league.name,
      country: league.country,
      logo: league.logo,
      flag: league.flag,
      season: league.season,
    });
  });

  return await reply.status(200).send();
}
