import { AbstractModel } from './abstract.model';
import { League } from './league.model';
import { Pitch } from './pitch.model';
import { Game } from './game.model';
export class Stadium extends AbstractModel {
    constructor(model) {
        super();
        this.pitches = [];
        this.games = [];
        this.map(model || {}, {
            league: model => (this.league = new League(model.league)),
            games: model => (this.games = model.games.map(g => new Game(g))),
            pitches: model => (this.pitches = model.pitches.map(p => new Pitch(p))),
        });
    }
}
//# sourceMappingURL=stadium.model.js.map