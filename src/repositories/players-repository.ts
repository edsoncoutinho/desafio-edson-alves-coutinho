import { type Player, Prisma } from "@prisma/client";

type PlayerWithLeagueAndTeam = Prisma.PlayerGetPayload<{
  include: { league: true; team: true };
}>;

export interface PlayersRepository {
  create: (player: Prisma.PlayerCreateInput) => Promise<Player>;
  findById: (playerId: number) => Promise<Player | null>;
  findMany: () => Promise<PlayerWithLeagueAndTeam[]>;
}
