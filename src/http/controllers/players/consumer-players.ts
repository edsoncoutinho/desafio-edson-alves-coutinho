import { type FastifyRequest, type FastifyReply } from "fastify";
import { ApiFootballService } from "@/lib/api-football";
import { makeConsumePlayerUseCase } from "@/use-cases/factories/make-consumer-player-use-case";
import { env } from "@/env";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function consumerPlayers(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  try {
    const consumerPlayerUseCase = makeConsumePlayerUseCase();

    const perPage = 20;
    const totalPages = Math.ceil(env.CONSUMER_NUMBER_OF_PLAYERS / perPage);

    const playersToConsume = {};

    for (let page = 1; page <= totalPages; page++) {
      const apiFootballService = new ApiFootballService();

      const { players } = await apiFootballService.getPlayers({ page });

      Object.assign(playersToConsume, players);
    }

    Object.keys(playersToConsume).forEach(async (playerId) => {
      const player = playersToConsume[playerId];
      await consumerPlayerUseCase.execute({
        playerId: player.id,
        name: player.name,
        firstName: player.firstName,
        lastName: player.lastName,
        age: player.age,
        birthDate: new Date(player.birthDate),
        birthPlace: player.birthPlace,
        birthCountry: player.birthCountry,
        nationality: player.nationality,
        height: +player.height || null,
        weight: +player.weight || null,
        injured: player.injured,
        photo: player.photo,
        goals: player.goals,
        assists: player.assists,
        teamId: player.teamId,
        leagueId: player.leagueId,
      });
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return await reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return await reply.status(200).send();
}
