import { AbstractModel } from './abstract.model';
import { League } from './league.model';

export class City extends AbstractModel {
  _id: number;
  name: string;
  flag: string;
  lat: number;
  long: number;
  show: boolean;
  sortIdx: number;
  leagues: League[] = [];

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      leagues: (model) => (this.leagues = model.leagues.map((l) => new League(l))),
    });
  }
}
