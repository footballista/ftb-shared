import { AbstractModel } from './abstract.model';
import { League } from './league.model';
export class City extends AbstractModel {
  constructor(model) {
    super();
    this.leagues = [];
    this.map(model || {}, {
      leagues: (model) => (this.leagues = model.leagues.map((l) => new League(l))),
    });
  }
}
//# sourceMappingURL=city.model.js.map
