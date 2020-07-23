import { AbstractModel } from './abstract.model';
import { Champ } from './champ.model';
import { League } from './league.model';
import { Stage } from './stage.model';
import { Game } from './game.model';
import { Post } from './post.model';
import { Player } from './player.model';
export class Season extends AbstractModel {
    constructor(model) {
        super();
        this.map(model || {}, {
            champ: model => (this.champ = new Champ(model.champ)),
            league: model => (this.league = new League(model.league)),
            stages: model => (this.stages = model.stages.map(s => new Stage(s))),
            games: model => (this.games = model.games.map(g => new Game(g))),
            news: model => (this.news = model.news.map(n => new Post(n))),
            gamesWithPhotos: model => (this.gamesWithPhotos = model.gamesWithPhotos.map(g => new Game(g))),
            gamesWithVideos: model => (this.gamesWithVideos = model.gamesWithVideos.map(g => new Game(g))),
            birthdays: model => (this.birthdays = model.birthdays.map(p => new Player(p))),
        });
    }
}
//# sourceMappingURL=season.model.js.map