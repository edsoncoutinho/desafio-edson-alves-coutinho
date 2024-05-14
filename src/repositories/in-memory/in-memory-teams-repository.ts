import { Team, Prisma } from "@prisma/client";
import { TeamsRepository } from "../teams-repository";
import { randomUUID } from "node:crypto";

export class InMemoryTeamsRepository implements TeamsRepository {
  public items: Team[] = [];

  async create(data: Prisma.TeamUncheckedCreateInput): Promise<Team> {
    const team = {
      id: randomUUID(),
      teamId: data.teamId,
      name: data.name,
      logo: data.logo,
      createdAt: new Date(),
      updatedAt: null,
    };

    this.items.push(team);

    return team;
  }

  async save(team: Team): Promise<Team> {
    const teamIndex = this.items.findIndex((item) => item.id === team.id);
    this.items[teamIndex] = team;
    return team;
  }

  async findById(teamId: number): Promise<Team | null> {
    const team = this.items.find((item) => item.teamId === teamId);

    if (!team) {
      return null;
    }

    return team;
  }

  async findMany(): Promise<Team[]> {
    return this.items;
  }
}
