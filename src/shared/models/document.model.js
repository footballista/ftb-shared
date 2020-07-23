import { AbstractModel } from './abstract.model';
import { User } from './user.model';
import { League } from './league.model';
import dayjs from 'dayjs';
export class Document extends AbstractModel {
  constructor(model) {
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
//# sourceMappingURL=document.model.js.map
