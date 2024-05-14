import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPlayersRepository } from "@/repositories/in-memory/in-memory-players-repository";
import { GetPlayersUseCase } from "./get-players";
import { InMemoryTeamsRepository } from "@/repositories/in-memory/in-memory-teams-repository";
import { InMemoryLeaguesRepository } from "@/repositories/in-memory/in-memory-leagues-repository";

let leaguesRepository: InMemoryLeaguesRepository;
let teamsRepository: InMemoryTeamsRepository;
let playersRepository: InMemoryPlayersRepository;
let sut: GetPlayersUseCase;
describe("Get Players Use Case", () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository();
    leaguesRepository = new InMemoryLeaguesRepository();
    playersRepository = new InMemoryPlayersRepository(
      teamsRepository,
      leaguesRepository,
    );
    sut = new GetPlayersUseCase(playersRepository);
  });

  it("should be able to get players", async () => {
    const league = await leaguesRepository.create({
      leagueId: 1,
      name: "League Name",
      country: "Country",
      logo: "league-logo.png",
      flag: "flag.png",
      season: 2020,
    });

    const team = await teamsRepository.create({
      teamId: 1,
      name: "Team Name",
      logo: "team-logo.png",
    });

    await playersRepository.create({
      playerId: 1,
      name: "Player Name",
      firstName: "First Name",
      lastName: "Last Name",
      age: 25,
      birthDate: new Date("1996-06-22"),
      birthPlace: "Place",
      birthCountry: "Country",
      nationality: "Nationality",
      height: 180,
      weight: 75,
      injured: false,
      photo: "player-photo.png",
      goals: 10,
      assists: 5,
      team: { connect: { id: team.id } },
      league: { connect: { id: league.id } },
    });

    const { playersRows } = await sut.execute();

    expect(playersRows).toHaveLength(1);
  });
});
