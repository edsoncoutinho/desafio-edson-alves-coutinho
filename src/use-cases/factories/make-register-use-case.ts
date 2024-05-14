import { RegisterUserUseCase } from "../register-user";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUserUseCase(usersRepository);

  return registerUseCase;
}
