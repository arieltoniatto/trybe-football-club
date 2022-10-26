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

const victories = (matches: IMatch[]) => {
  let totalVictories = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1;
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

const losses = (matches: IMatch[]) => {
  let totalLosses = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const points = (matches: IMatch[]) => {
  let totalPoints = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalPoints += 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

const games = (matches: IMatch[]) => matches.length;

const goalsFavor = (matches: IMatch[]) => {
  let totalGoalsF = 0;
  matches.forEach((match) => {
    totalGoalsF += match.homeTeamGoals;
  });
  return totalGoalsF;
};

const goalsTaken = (matches: IMatch[]) => {
  let totalGoalsT = 0;
  matches.forEach((match) => {
    totalGoalsT += match.awayTeamGoals;
  });
  return totalGoalsT;
};

const goalsBalance = (matches: IMatch[]) => goalsFavor(matches) - goalsTaken(matches);

const efficiency = (matches: IMatch[]) => {
  const pointsTotal = points(matches);
  const gamesTotal = games(matches);
  const result = Number(((pointsTotal / (gamesTotal * 3)) * 100).toFixed(2));
  return result;
};

const generateBoard = (teamsName: string[], matches: IMatch[]) => {
  const leaderboard: ILeaderboard[] = [];

  teamsName.forEach((team) => {
    const teamsGames = matches.filter(({ teamHome }) => teamHome?.teamName === team);
    leaderboard.push({
      name: team,
      totalPoints: points(teamsGames),
      totalGames: games(teamsGames),
      totalVictories: victories(teamsGames),
      totalDraws: draws(teamsGames),
      totalLosses: losses(teamsGames),
      goalsFavor: goalsFavor(teamsGames),
      goalsOwn: goalsTaken(teamsGames),
      goalsBalance: goalsBalance(teamsGames),
      efficiency: efficiency(teamsGames),
    });
  });
  return leaderboard;
};

export default generateBoard;
