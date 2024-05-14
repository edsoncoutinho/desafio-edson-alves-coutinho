import { PlayersRepository } from "@/repositories/players-repository";

interface GetPlayersUseCaseResponse {
  playersRows: Record<string, string | number | boolean>[];
}

export class GetPlayersUseCase {
  constructor(private playersRepository: PlayersRepository) {}

  async execute(): Promise<GetPlayersUseCaseResponse> {
    const players = await this.playersRepository.findMany();

    const playersRows = players.map((item) => {
      return {
        id: item.playerId,
        name: item.name,
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age,
        birthDate: item.birthDate.toISOString().split("T")[0],
        birthPlace: item.birthPlace || "",
        birthCountry: item.birthCountry,
        nationality: item.nationality,
        height: item.height || "",
        weight: item.weight || "",
        injured: item.injured,
        photo: item.photo,
        goals: item.goals,
        assists: item.assists,
        teamId: item?.team?.teamId || "",
        leagueId: item?.league?.leagueId || "",
      };
    });

    return { playersRows };
  }
}
