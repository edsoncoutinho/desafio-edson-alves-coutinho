import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository";
import { ConsumerPlayerUseCase } from "../consumer-player";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { PrismaLeaguesRepository } from "@/repositories/prisma/prisma-leagues-repository";

export function makeConsumePlayerUseCase() {
  const playersRepository = new PrismaPlayersRepository();
  const teamsRepository = new PrismaTeamsRepository();
  const leaguesRepository = new PrismaLeaguesRepository();
  const consumerPlayerUseCase = new ConsumerPlayerUseCase(
    playersRepository,
    teamsRepository,
    leaguesRepository,
  );

  return consumerPlayerUseCase;
}
