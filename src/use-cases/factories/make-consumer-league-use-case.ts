import { PrismaLeaguesRepository } from "@/repositories/prisma/prisma-leagues-repository";
import { ConsumerLeagueUseCase } from "../consumer-league";

export function makeConsumeLeagueUseCase() {
  const leaguesRepository = new PrismaLeaguesRepository();
  const consumerLeagueUseCase = new ConsumerLeagueUseCase(leaguesRepository);

  return consumerLeagueUseCase;
}
