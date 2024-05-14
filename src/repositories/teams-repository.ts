import { type Prisma, type Team } from "@prisma/client";

export interface TeamsRepository {
  create(data: Prisma.TeamCreateInput): Promise<Team>;
  findById: (teamId: number) => Promise<Team | null>;
  findMany: () => Promise<Team[]>;
}
