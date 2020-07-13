import { AbstractModel } from './abstract.model';
import { Game } from './game.model';
import dayjs from 'dayjs';

export class GameWish extends AbstractModel {
  date: dayjs.Dayjs;
  timestamp: number;
  fits: boolean;
  game: Game;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      date: model => {
        this.date = dayjs(model.date);
        this.timestamp = parseInt(this.date.format('X'));
      },
    });
  }
}
