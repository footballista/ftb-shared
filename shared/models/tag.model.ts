import { AbstractModel } from './abstract.model';
import { City } from './city.model';
import { League } from './league.model';
import { Champ } from './champ.model';
import { Team } from './team.model';
import { Stadium } from './stadium.model';
import { Game } from './game.model';
import { Player } from './player.model';

export class Tag extends AbstractModel {
  _id: string;
  key: string;
  city: City;
  league: League;
  champ: Champ;
  team: Team;
  stadium: Stadium;
  game: Game;
  player: Player;

  constructor(model?: object) {
    super();
    this.map(model || {}, {
      city: model => (this.city = new City(model.city)),
      league: model => (this.league = new League(model.league)),
      champ: model => (this.champ = new Champ(model.champ)),
      team: model => (this.team = new Team(model.team)),
      stadium: model => (this.stadium = new Stadium(model.stadium)),
      game: model => (this.game = new Game(model.game)),
      player: model => (this.player = new Player(model.player)),
    });
  }
}
