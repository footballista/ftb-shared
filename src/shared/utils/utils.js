export function extractVideoPreviewSrc(src) {
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
function teamIs(game, teamId, cmpHome, cmpAway) {
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
export function isWinner(game, teamId) {
  return teamIs(game, teamId, cmpHomeWiner, cmpAwayWiner);
}
export function isLoser(game, teamId) {
  return teamIs(game, teamId, cmpHomeLoser, cmpAwayLoser);
}
//# sourceMappingURL=utils.js.map
