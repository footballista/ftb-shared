import { AbstractModel } from './abstract.model';
import dayjs from 'dayjs';
export class GameWish extends AbstractModel {
  constructor(model) {
    super();
    this.map(model || {}, {
      date: (model) => {
        this.date = dayjs(model.date);
        this.timestamp = parseInt(this.date.format('X'));
      },
    });
  }
}
//# sourceMappingURL=game-wish.model.js.map
