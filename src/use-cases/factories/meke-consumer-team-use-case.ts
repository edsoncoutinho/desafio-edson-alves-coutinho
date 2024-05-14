import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { ConsumerTeamUseCase } from "../consumer-team";

export function makeConsumeTeamUseCase() {
  const teamsRepository = new PrismaTeamsRepository();
  const consumerTeamUseCase = new ConsumerTeamUseCase(teamsRepository);

  return consumerTeamUseCase;
}
