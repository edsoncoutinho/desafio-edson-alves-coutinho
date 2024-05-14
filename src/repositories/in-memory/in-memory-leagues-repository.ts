import { League, Prisma } from "@prisma/client";
import { LeaguesRepository } from "../leagues-repository";
import { randomUUID } from "node:crypto";

export class InMemoryLeaguesRepository implements LeaguesRepository {
  public items: League[] = [];

  async create(data: Prisma.LeagueUncheckedCreateInput): Promise<League> {
    const league = {
      id: randomUUID(),
      leagueId: data.leagueId,
      name: data.name,
      logo: data.logo,
      country: data.country,
      flag: data.flag ?? null,
      season: data.season,
      createdAt: new Date(),
      updatedAt: null,
    };

    this.items.push(league);

    return league;
  }

  async save(league: League): Promise<League> {
    const leagueIndex = this.items.findIndex((item) => item.id === league.id);
    this.items[leagueIndex] = league;
    return league;
  }

  async findById(leagueId: number): Promise<League | null> {
    const league = this.items.find((item) => item.leagueId === leagueId);

    if (!league) {
      return null;
    }

    return league;
  }

  async findMany(): Promise<League[]> {
    return this.items;
  }
}
