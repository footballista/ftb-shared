import { Game } from '../models/game.model';

export function extractVideoPreviewSrc(src: string): string {
  const youtube = src.indexOf('youtu.be') > -1 || src.indexOf('youtube.com') > -1;

  if (!youtube) {
    return;
  }

  let videoId =
    src.indexOf('youtu.be') !== -1 && src.indexOf('youtube.com') === -1
      ? src.split('youtu.be/')[1]
      : src.split('?v=')[1];

  videoId = videoId.split('&')[0];

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

type CompareScoreFn = (g: Game) => boolean;

function teamIs(game: Game, teamId: number, cmpHome: CompareScoreFn, cmpAway: CompareScoreFn): boolean {
  const home = game.teamHome._id === teamId;
  const away = game.teamAway._id === teamId;

  if (!home && !away) {
    console.warn(`${teamId} not found in game ${game._id} with teams ${game.teamHome._id} and ${game.teamAway._id}`);

    return false;
  }

  const winHome = home && cmpHome(game);
  const winAway = away && cmpAway(game);

  return winHome || winAway;
}

const cmpHomeWiner = (g) => g.scoreFtHome > g.scoreFtAway || g.scorePenHome > g.scorePenAway;
const cmpAwayWiner = (g) => g.scoreFtAway > g.scoreFtHome || g.scorePenAway > g.scorePenHome;
const cmpHomeLoser = (g) => g.scoreFtHome < g.scoreFtAway || g.scorePenHome < g.scorePenAway;
const cmpAwayLoser = (g) => g.scoreFtAway < g.scoreFtHome || g.scorePenAway < g.scorePenHome;

export function isWinner(game: Game, teamId: number): boolean {
  return teamIs(game, teamId, cmpHomeWiner, cmpAwayWiner);
}

export function isLoser(game: Game, teamId: number): boolean {
  return teamIs(game, teamId, cmpHomeLoser, cmpAwayLoser);
}
