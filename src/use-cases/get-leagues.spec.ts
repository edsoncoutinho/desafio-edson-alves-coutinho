import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryLeaguesRepository } from "@/repositories/in-memory/in-memory-leagues-repository";
import { GetLeaguesUseCase } from "./get-leagues";

let leaguesRepository: InMemoryLeaguesRepository;
let sut: GetLeaguesUseCase;
describe("Get Leagues Use Case", () => {
  beforeEach(() => {
    leaguesRepository = new InMemoryLeaguesRepository();
    sut = new GetLeaguesUseCase(leaguesRepository);
  });

  it("should be able to get leagues", async () => {
    await leaguesRepository.create({
      leagueId: 1,
      name: "League Name",
      country: "Country",
      logo: "league-logo.png",
      flag: "flag.png",
      season: 2020,
    });

    const { leaguesRows } = await sut.execute();

    expect(leaguesRows).toHaveLength(1);
  });
});
