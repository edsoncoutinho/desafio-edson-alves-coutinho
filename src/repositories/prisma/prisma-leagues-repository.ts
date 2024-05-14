import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { LeaguesRepository } from "../leagues-repository";

export class PrismaLeaguesRepository implements LeaguesRepository {
  async create(data: Prisma.LeagueCreateInput) {
    return await prisma.league.create({ data });
  }

  async save(data: Prisma.LeagueUpdateInput) {
    return await prisma.league.update({ where: { id: String(data.id) }, data });
  }

  async findById(leagueId: number) {
    return await prisma.league.findFirst({ where: { leagueId } });
  }

  async findMany() {
    return await prisma.league.findMany();
  }
}
