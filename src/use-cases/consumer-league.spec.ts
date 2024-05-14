import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryLeaguesRepository } from "@/repositories/in-memory/in-memory-leagues-repository";
import { ConsumerLeagueUseCase } from "./consumer-league";

let leaguesRepository: InMemoryLeaguesRepository;
let sut: ConsumerLeagueUseCase;

describe("Create League Use Case", () => {
  beforeEach(() => {
    leaguesRepository = new InMemoryLeaguesRepository();
    sut = new ConsumerLeagueUseCase(leaguesRepository);
  });

  it("should be able consumer a league", async () => {
    const { league } = await sut.execute({
      leagueId: 1,
      name: "League Name",
      country: "Country",
      logo: "league-logo.png",
      flag: "flag.png",
      season: 2020,
    });

    expect(league.id).toEqual(expect.any(String));
  });
});
