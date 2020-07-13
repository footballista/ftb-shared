import { AbstractModel } from './abstract.model';
import { Champ } from './champ.model';
import { League } from './league.model';
import { Player } from './player.model';
import dayjs from 'dayjs';

export class Disqualification extends AbstractModel {
  _id: number;
  mode: 'games' | 'time';
  player: Player;
  league: League;
  champ: Champ;
  games: number;
  gamesLeft: number;
  until: dayjs.Dayjs;
  comment: string;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      champ: model => (this.champ = new Champ(model.champ)),
      league: model => (this.league = new League(model.league)),
      player: model => (this.player = new Player(model.player)),
      until: model => (this.until = dayjs(model.until)),
    });
  }
}
