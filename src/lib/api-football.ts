import { env } from "@/env";
import axios from "axios";

export class ApiFootballService {
  private baseUrl = env.API_FOOTBALL_URL;
  private headers = {
    "x-rapidapi-host": env.API_FOOTBALL_HOST,
    "x-rapidapi-key": env.API_FOOTBALL_KEY,
  };

  async getAll({ page } = { page: 1 }) {
    const response = await axios.get(
      `${this.baseUrl}/players?league=${env.CONSUMER_LEAGUE_ID}&season=${env.CONSUMER_SEASON}&page=${page}`,
      { headers: this.headers },
    );

    const players = {};
    const leagues = {};
    const teams = {};

    response.data.response.map(({ player, statistics }) => {
      if (statistics && statistics.length > 0) {
        const playerId = player.id;
        const stat = statistics[0];
        const { id: teamId, name: teamName, logo: teamLogo } = stat.team;
        const {
          id: leagueId,
          name: leagueName,
          country: leagueCountry,
          logo: leagueLogo,
          flag: leagueFlag,
          season: leagueSeason,
        } = stat.league;

        players[playerId] = {
          id: playerId,
          name: player.name,
          firstName: player.firstname,
          lastName: player.lastname,
          age: player.age,
          birthDate: player.birth.date,
          birthPlace: player.birth.place
            ? player.birth?.place.replace(/\n/g, "").trim()
            : null,
          birthCountry: player.birth.country,
          nationality: player.nationality,
          height: player.height ? player.height.replace(/\D/g, "") : "",
          weight: player.weight ? player.weight.replace(/\D/g, "") : "",
          injured: player.injured,
          photo: player.photo,
          goals: stat.goals.total,
          assists: stat.goals.assists || 0,
          teamId,
          leagueId,
        };

        teams[teamId] = { id: teamId, name: teamName, logo: teamLogo };
        leagues[leagueId] = {
          id: leagueId,
          name: leagueName,
          country: leagueCountry,
          logo: leagueLogo,
          flag: leagueFlag,
          season: leagueSeason,
        };
      }
    });

    return { players, leagues, teams };
  }

  async getLeagues({ page } = { page: 1 }) {
    const response = await axios.get(
      `${this.baseUrl}/players?league=${env.CONSUMER_LEAGUE_ID}&season=${env.CONSUMER_SEASON}&page=${page}`,
      { headers: this.headers },
    );

    const data = response.data.response;

    const leagues = {};

    data.map(({ statistics }) => {
      if (statistics && statistics.length > 0) {
        const stat = statistics[0];
        const {
          id: leagueId,
          name: leagueName,
          country: leagueCountry,
          logo: leagueLogo,
          flag: leagueFlag,
          season: leagueSeason,
        } = stat.league;

        leagues[leagueId] = {
          id: leagueId,
          name: leagueName,
          country: leagueCountry,
          logo: leagueLogo,
          flag: leagueFlag,
          season: leagueSeason,
        };
      }
    });

    return { leagues };
  }

  async getTeams({ page } = { page: 1 }) {
    const response = await axios.get(
      `${this.baseUrl}/players?league=${env.CONSUMER_LEAGUE_ID}&season=${env.CONSUMER_SEASON}&page=${page}`,
      { headers: this.headers },
    );

    const data = response.data.response;

    const teams = {};

    data.map(({ statistics }) => {
      if (statistics && statistics.length > 0) {
        const stat = statistics[0];
        const { id: teamId, name: teamName, logo: teamLogo } = stat.team;

        teams[teamId] = { id: teamId, name: teamName, logo: teamLogo };
      }
    });

    return { teams };
  }

  async getPlayers({ page } = { page: 1 }) {
    const response = await axios.get(
      `${this.baseUrl}/players?league=${env.CONSUMER_LEAGUE_ID}&season=${env.CONSUMER_SEASON}&page=${page}`,
      { headers: this.headers },
    );

    const data = response.data.response;

    const players = {};

    data.map(({ player, statistics }) => {
      if (statistics && statistics.length > 0) {
        const playerId = player.id;
        const stat = statistics[0];
        const { id: teamId } = stat.team;
        const { id: leagueId } = stat.league;

        const birthPlace = player.birth.place
          ? player.birth.place.replace(/\n/g, "").trim()
          : null;

        players[playerId] = {
          id: playerId,
          name: player.name,
          firstName: player.firstname,
          lastName: player.lastname,
          age: player.age,
          birthDate: player.birth.date,
          birthPlace: birthPlace || null,
          birthCountry: player.birth.country,
          nationality: player.nationality,
          height: player.height ? player.height.replace(/\D/g, "") : "",
          weight: player.weight ? player.weight.replace(/\D/g, "") : "",
          injured: player.injured,
          photo: player.photo,
          goals: stat.goals.total || 0,
          assists: stat.goals.assists || 0,
          teamId,
          leagueId,
        };
      }
    });

    return { players };
  }
}
