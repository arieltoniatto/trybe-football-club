import IMatch from '../Interface/Match/IMatch';
import ILeaderboard from '../Interface/Leaderboard/ILeaderboard';

// inserir regras de negócio

// retornar um [] de obj
// "name": "Palmeiras",
// "totalPoints": 13, OK
// "totalGames": 5, OK
// "totalVictories": 4, OK
// "totalDraws": 1, OK
// "totalLosses": 0, OK
// "goalsFavor": 17, OK
// "goalsOwn": 5, OK
// "goalsBalance": 12, OK
// "efficiency": 86.67 OK

// map para construir obj

// forEach -> id/nome -> func calc

const victories = (matches: IMatch[], isHome: boolean) => {
  let totalVictories = 0;
  matches.forEach((match) => {
    switch (isHome) {
      case true:
        if (match.homeTeamGoals > match.awayTeamGoals) {
          totalVictories += 1;
        }
        break;
      case false:
        if (match.homeTeamGoals < match.awayTeamGoals) {
          totalVictories += 1;
        }
        break;
      default:
    }
  });
  return totalVictories;
};

const draws = (matches: IMatch[]) => {
  let totalDraws = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const losses = (matches: IMatch[], isHome: boolean) => {
  let totalLosses = 0;
  matches.forEach((match) => {
    switch (isHome) {
      case true:
        if (match.homeTeamGoals < match.awayTeamGoals) {
          totalLosses += 1;
        }
        break;
      case false:
        if (match.homeTeamGoals > match.awayTeamGoals) {
          totalLosses += 1;
        }
        break;
      default:
    }
  });
  return totalLosses;
};

const points = (matches: IMatch[], isHome: boolean) => {
  let totalPoints = 0;
  matches.forEach((match) => {
    switch (isHome) {
      case true:
        if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
        break;
      case false:
        if (match.homeTeamGoals < match.awayTeamGoals) totalPoints += 3;
        break;
      default:
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

const games = (matches: IMatch[]) => matches.length;

const goalsFavor = (matches: IMatch[], isHome: boolean) => {
  let totalGoalsF = 0;
  matches.forEach((match) => {
    switch (isHome) {
      case true:
        totalGoalsF += match.homeTeamGoals;
        break;
      case false:
        totalGoalsF += match.awayTeamGoals;
        break;
      default:
    }
  });
  return totalGoalsF;
};

const goalsTaken = (matches: IMatch[], isHome: boolean) => {
  let totalGoalsT = 0;
  matches.forEach((match) => {
    switch (isHome) {
      case true:
        totalGoalsT += match.awayTeamGoals;
        break;
      case false:
        totalGoalsT += match.homeTeamGoals;
        break;
      default:
    }
  });
  return totalGoalsT;
};

const goalsBalance = (matches: IMatch[], isHome: boolean) => {
  const favor = goalsFavor(matches, isHome);
  const taken = goalsTaken(matches, isHome);
  return favor - taken;
};

const efficiency = (matches: IMatch[], isHome: boolean) => {
  const pointsTotal = points(matches, isHome);
  const gamesTotal = games(matches);
  const result = Number(((pointsTotal / (gamesTotal * 3)) * 100).toFixed(2));
  return result;
};

const filterTeams = (matches: IMatch[], isHome: boolean, team: string) => {
  let teamGames: IMatch[] = [];
  if (isHome) {
    teamGames = matches.filter(({ teamHome }) => teamHome?.teamName === team);
  } else {
    teamGames = matches.filter(({ teamAway }) => teamAway?.teamName === team);
  }
  return teamGames;
};

const generateBoard = (teamsName: string[], matches: IMatch[], isHome: boolean) => {
  const leaderboard: ILeaderboard[] = [];
  teamsName.forEach((team) => {
    const teamsGames = filterTeams(matches, isHome, team);
    leaderboard.push({
      name: team,
      totalPoints: points(teamsGames, isHome),
      totalGames: games(teamsGames),
      totalVictories: victories(teamsGames, isHome),
      totalDraws: draws(teamsGames),
      totalLosses: losses(teamsGames, isHome),
      goalsFavor: goalsFavor(teamsGames, isHome),
      goalsOwn: goalsTaken(teamsGames, isHome),
      goalsBalance: goalsBalance(teamsGames, isHome),
      efficiency: efficiency(teamsGames, isHome),
    });
  });
  return leaderboard;
};

export default generateBoard;
