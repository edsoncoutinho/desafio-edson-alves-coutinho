import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryTeamsRepository } from "@/repositories/in-memory/in-memory-teams-repository";
import { ConsumerTeamUseCase } from "./consumer-team";

let teamsRepository: InMemoryTeamsRepository;
let sut: ConsumerTeamUseCase;

describe("Create Team Use Case", () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository();
    sut = new ConsumerTeamUseCase(teamsRepository);
  });

  it("should be able consumer a team", async () => {
    const { team } = await sut.execute({
      teamId: 1,
      name: "Team Name",
      logo: "team-logo.png",
    });

    expect(team.id).toEqual(expect.any(String));
  });
});
