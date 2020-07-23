import { AbstractModel } from './abstract.model';
import { User } from './user.model';
import { League } from './league.model';
import dayjs from 'dayjs';

export class Document extends AbstractModel {
  _id: number;
  name: string;
  show: boolean;
  author: User;
  league: League;
  size: number;
  extension: string;
  timestamp: number;
  date: dayjs.Dayjs;
  sortIdx: number;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      date: (model) => {
        this.date = dayjs(model.date);
        this.timestamp = this.date.unix() * 1000;
      },
      timestamp: (model) => {
        this.date = dayjs(model.timestamp, 'X');
        this.timestamp = this.date.unix() * 1000;
      },
      author: (model) => {
        this.author = new User(model.author);
      },
      league: (model) => {
        this.league = new League(model.league);
      },
    });
  }
}
