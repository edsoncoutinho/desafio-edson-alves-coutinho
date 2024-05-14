import { GetTeamsUseCase } from "../get-teams";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";

export function makeGetTeamsUseCase() {
  const teamsRepository = new PrismaTeamsRepository();
  const getTeamsUseCase = new GetTeamsUseCase(teamsRepository);

  return getTeamsUseCase;
}
