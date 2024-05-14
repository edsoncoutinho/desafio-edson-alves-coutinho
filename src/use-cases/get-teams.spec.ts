import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryTeamsRepository } from "@/repositories/in-memory/in-memory-teams-repository";
import { GetTeamsUseCase } from "./get-teams";

let teamsRepository: InMemoryTeamsRepository;
let sut: GetTeamsUseCase;
describe("Get Teams Use Case", () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository();
    sut = new GetTeamsUseCase(teamsRepository);
  });

  it("should be able to get teams", async () => {
    await teamsRepository.create({
      teamId: 1,
      name: "Team Name",
      logo: "team-logo.png",
    });

    const { teamsRows } = await sut.execute();

    expect(teamsRows).toHaveLength(1);
  });
});
