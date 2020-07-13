const cmpHomeWiner = g => g.scoreFtHome > g.scoreFtAway || g.scorePenHome > g.scorePenAway;
const cmpAwayWiner = g => g.scoreFtAway > g.scoreFtHome || g.scorePenAway > g.scorePenHome;
const cmpHomeLoser = g => g.scoreFtHome < g.scoreFtAway || g.scorePenHome < g.scorePenAway;
const cmpAwayLoser = g => g.scoreFtAway < g.scoreFtHome || g.scorePenAway < g.scorePenHome;

export function isWinner(game: Game, teamId: number): boolean {
    return teamIs(game, teamId, cmpHomeWiner, cmpAwayWiner);
}

export function isLoser(game: Game, teamId: number): boolean {
    return teamIs(game, teamId, cmpHomeLoser, cmpAwayLoser);
}
