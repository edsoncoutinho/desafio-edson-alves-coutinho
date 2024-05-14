import { League } from "@prisma/client";
import { LeaguesRepository } from "@/repositories/leagues-repository";

interface ConsumerLeagueUseCaseRequest {
  leagueId: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  season: number;
}

interface ConsumerLeagueUseCaseResponse {
  league: League;
}

export class ConsumerLeagueUseCase {
  constructor(private leaguesRepository: LeaguesRepository) {}

  async execute({
    leagueId,
    name,
    country,
    logo,
    flag,
    season,
  }: ConsumerLeagueUseCaseRequest): Promise<ConsumerLeagueUseCaseResponse> {
    const leagueOnDatabase = await this.leaguesRepository.findById(leagueId);

    if (leagueOnDatabase) {
      return { league: leagueOnDatabase };
    }

    const league = await this.leaguesRepository.create({
      leagueId,
      name,
      country,
      logo,
      flag,
      season,
    });

    return { league };
  }
}
