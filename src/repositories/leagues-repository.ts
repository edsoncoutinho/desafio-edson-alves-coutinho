import { League, Prisma } from "@prisma/client";

export interface LeaguesRepository {
  create: (league: Prisma.LeagueCreateInput) => Promise<League>;
  findById: (leagueId: number) => Promise<League | null>;
  findMany: () => Promise<League[]>;
}
