import { GetLeaguesUseCase } from "../get-leagues";
import { PrismaLeaguesRepository } from "@/repositories/prisma/prisma-leagues-repository";

export function makeGetLeaguesUseCase() {
  const leaguesRepository = new PrismaLeaguesRepository();
  const getLeaguesUseCase = new GetLeaguesUseCase(leaguesRepository);

  return getLeaguesUseCase;
}
