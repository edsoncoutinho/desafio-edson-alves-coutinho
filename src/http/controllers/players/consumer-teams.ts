import { type FastifyRequest, type FastifyReply } from "fastify";
import { ApiFootballService } from "@/lib/api-football";
import { makeConsumeTeamUseCase } from "@/use-cases/factories/meke-consumer-team-use-case";
import { env } from "@/env";

export async function consumerTeams(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const consumerTeamUseCase = makeConsumeTeamUseCase();

  const perPage = 20;
  const totalPages = Math.ceil(env.CONSUMER_NUMBER_OF_PLAYERS / perPage);

  const teamsToConsume = {};

  for (let page = 1; page <= totalPages; page++) {
    const apiFootballService = new ApiFootballService();

    const { teams } = await apiFootballService.getTeams({ page });

    Object.assign(teamsToConsume, teams);
  }

  Object.keys(teamsToConsume).forEach(async (teamId) => {
    const team = teamsToConsume[teamId];
    await consumerTeamUseCase.execute({
      teamId: team.id,
      name: team.name,
      logo: team.logo,
    });
  });

  return await reply.status(200).send();
}
