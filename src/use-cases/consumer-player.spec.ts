import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPlayersRepository } from "@/repositories/in-memory/in-memory-players-repository";
import { ConsumerPlayerUseCase } from "./consumer-player";
import { InMemoryTeamsRepository } from "@/repositories/in-memory/in-memory-teams-repository";
import { InMemoryLeaguesRepository } from "@/repositories/in-memory/in-memory-leagues-repository";

let playersRepository: InMemoryPlayersRepository;
let teamsRepository: InMemoryTeamsRepository;
let leaguesRepository: InMemoryLeaguesRepository;
let sut: ConsumerPlayerUseCase;

describe("Create Player Use Case", () => {
  beforeEach(() => {
    teamsRepository = new InMemoryTeamsRepository();
    leaguesRepository = new InMemoryLeaguesRepository();
    playersRepository = new InMemoryPlayersRepository(
      teamsRepository,
      leaguesRepository,
    );
    sut = new ConsumerPlayerUseCase(
      playersRepository,
      teamsRepository,
      leaguesRepository,
    );
  });

  it("should be able consumer a player", async () => {
    await leaguesRepository.create({
      leagueId: 1,
      name: "League Name",
      country: "Country",
      logo: "league-logo.png",
      flag: "flag.png",
      season: 2020,
    });

    await teamsRepository.create({
      teamId: 1,
      name: "Team Name",
      logo: "team-logo.png",
    });

    const { player } = await sut.execute({
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
      teamId: 1,
      leagueId: 1,
    });

    expect(player.id).toEqual(expect.any(String));
  });
});
