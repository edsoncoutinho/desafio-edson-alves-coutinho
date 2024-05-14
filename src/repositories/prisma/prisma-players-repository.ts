import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PlayersRepository } from "../players-repository";

export class PrismaPlayersRepository implements PlayersRepository {
  async create(data: Prisma.PlayerCreateInput) {
    return await prisma.player.create({ data });
  }

  async findById(playerId: number) {
    return await prisma.player.findFirst({ where: { playerId } });
  }

  async findMany() {
    return await prisma.player.findMany({
      include: {
        team: true,
        league: true,
      },
    });
  }
}
