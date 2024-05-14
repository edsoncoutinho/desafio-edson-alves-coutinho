import { LeaguesRepository } from "@/repositories/leagues-repository";

interface GetLeaguesUseCaseResponse {
  leaguesRows: Record<string, string | number>[];
}

export class GetLeaguesUseCase {
  constructor(private leaguesRepository: LeaguesRepository) {}

  async execute(): Promise<GetLeaguesUseCaseResponse> {
    const leagues = await this.leaguesRepository.findMany();

    const leaguesRows = leagues.map((item) => {
      return {
        id: item.leagueId,
        name: item.name,
        country: item.country,
        logo: item.logo,
        flag: item.flag || "",
        season: item.season,
      };
    });

    return { leaguesRows };
  }
}
