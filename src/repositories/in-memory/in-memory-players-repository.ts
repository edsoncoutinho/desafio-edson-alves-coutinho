import { League, Player, Prisma, Team } from "@prisma/client";
import { PlayersRepository } from "../players-repository";
import { randomUUID } from "node:crypto";
import { InMemoryTeamsRepository } from "./in-memory-teams-repository";
import { InMemoryLeaguesRepository } from "./in-memory-leagues-repository";

export class InMemoryPlayersRepository implements PlayersRepository {
  public items: Array<Player & { team: Team; league: League }> = [];

  constructor(
    private teamsRepository: InMemoryTeamsRepository,
    private leaguesRepository: InMemoryLeaguesRepository,
  ) {}

  async create(data: Prisma.PlayerCreateInput) {
    let team;
    if (data.team && data.team.connect) {
      team = this.teamsRepository.items.find(
        (item) => item.id === data.team?.connect?.id,
      );
    }

    let league;
    if (data.league && data.league.connect) {
      league = this.leaguesRepository.items.find(
        (item) => item.id === data.league?.connect?.id,
      );
    }

    const player = {
      id: randomUUID(),
      playerId: data.playerId,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      birthDate: new Date(data.birthDate),
      birthPlace: data.birthPlace ?? null,
      birthCountry: data.birthCountry,
      nationality: data.nationality,
      height: data.height ?? null,
      weight: data.weight ?? null,
      injured: data.injured,
      photo: data.photo,
      goals: data.goals,
      assists: data.assists,
      teamId: team?.id ?? null,
      team: team ?? null,
      leagueId: league?.id ?? null,
      league: league ?? null,
      createdAt: new Date(),
      updatedAt: null,
    };

    this.items.push(player);

    return player;
  }

  async findById(playerId: number) {
    const player = this.items.find((item) => item.playerId === playerId);

    if (!player) {
      return null;
    }

    return player;
  }

  async findMany() {
    return this.items;
  }
}
