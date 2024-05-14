import { GetPlayersUseCase } from "../get-players";
import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository";

export function makeGetPlayersUseCase() {
  const playersRepository = new PrismaPlayersRepository();
  const getPlayersUseCase = new GetPlayersUseCase(playersRepository);

  return getPlayersUseCase;
}
