import { Team } from "@prisma/client";
import { TeamsRepository } from "@/repositories/teams-repository";

interface ConsumerTeamUseCaseRequest {
  teamId: number;
  name: string;
  logo: string;
}

interface ConsumerTeamUseCaseResponse {
  team: Team;
}

export class ConsumerTeamUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    teamId,
    name,
    logo,
  }: ConsumerTeamUseCaseRequest): Promise<ConsumerTeamUseCaseResponse> {
    const teamOnDatabase = await this.teamsRepository.findById(teamId);

    if (teamOnDatabase) {
      return { team: teamOnDatabase };
    }

    const team = await this.teamsRepository.create({
      teamId,
      name,
      logo,
    });

    return { team };
  }
}
