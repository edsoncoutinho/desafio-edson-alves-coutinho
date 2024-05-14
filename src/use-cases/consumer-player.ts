import { Player } from "@prisma/client";
import { PlayersRepository } from "@/repositories/players-repository";
import { TeamsRepository } from "@/repositories/teams-repository";
import { LeaguesRepository } from "@/repositories/leagues-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ConsumerPlayerUseCaseRequest {
  playerId: number;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: Date;
  birthPlace: string | null;
  birthCountry: string;
  nationality: string;
  height: number | null;
  weight: number | null;
  injured: boolean;
  photo: string;
  goals: number;
  assists: number;
  teamId: number;
  leagueId: number;
}

interface ConsumerPlayerUseCaseResponse {
  player: Player;
}

export class ConsumerPlayerUseCase {
  constructor(
    private playersRepository: PlayersRepository,
    private teamsRepository: TeamsRepository,
    private leaguesRepository: LeaguesRepository,
  ) {}
  async execute({
    playerId,
    name,
    firstName,
    lastName,
    age,
    birthDate,
    birthPlace,
    birthCountry,
    nationality,
    height,
    weight,
    injured,
    photo,
    goals,
    assists,
    teamId,
    leagueId,
  }: ConsumerPlayerUseCaseRequest): Promise<ConsumerPlayerUseCaseResponse> {
    const playerOnDatabase = await this.playersRepository.findById(playerId);

    if (playerOnDatabase) {
      return { player: playerOnDatabase };
    }

    const teamOnDatabase = await this.teamsRepository.findById(teamId);
    if (!teamOnDatabase) {
      throw new ResourceNotFoundError();
    }

    const leagueOnDatabase = await this.leaguesRepository.findById(leagueId);

    if (!leagueOnDatabase) {
      throw new ResourceNotFoundError();
    }

    const player = await this.playersRepository.create({
      playerId,
      name,
      firstName,
      lastName,
      age,
      birthDate,
      birthPlace,
      birthCountry,
      nationality,
      height,
      weight,
      injured,
      photo,
      goals,
      assists,
      team: { connect: { id: teamOnDatabase.id } },
      league: { connect: { id: leagueOnDatabase.id } },
    });

    return { player };
  }
}
