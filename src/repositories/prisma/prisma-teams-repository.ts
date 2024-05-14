import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TeamsRepository } from "../teams-repository";

export class PrismaTeamsRepository implements TeamsRepository {
  async create(data: Prisma.TeamCreateInput) {
    const team = await prisma.team.create({ data });
    return team;
  }

  async findById(teamId: number) {
    return await prisma.team.findFirst({ where: { teamId } });
  }

  async findMany() {
    return await prisma.team.findMany();
  }
}
