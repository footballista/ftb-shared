import { AbstractModel } from './abstract.model';
import { League } from './league.model';
import { Pitch } from './pitch.model';
import { Game } from './game.model';

export class Stadium extends AbstractModel {
  _id: number;
  name: string;
  show: boolean;
  sortIdx: number;

  address: string;
  description: string;
  lat: string;
  long: string;

  photoId: number;
  photo: string;

  pitches: Pitch[] = [];
  games: Game[] = [];
  league: League;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      league: (model) => (this.league = new League(model.league)),
      games: (model) => (this.games = model.games.map((g) => new Game(g))),
      pitches: (model) => (this.pitches = model.pitches.map((p) => new Pitch(p))),
    });
  }
}
