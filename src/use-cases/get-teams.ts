import { TeamsRepository } from "@/repositories/teams-repository";

interface GetTeamsUseCaseResponse {
  teamsRows: Record<string, string | number>[];
}

export class GetTeamsUseCase {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(): Promise<GetTeamsUseCaseResponse> {
    const teams = await this.teamsRepository.findMany();

    const teamsRows = teams.map((item) => {
      return {
        id: item.teamId,
        name: item.name,
        logo: item.logo,
      };
    });

    return { teamsRows };
  }
}
