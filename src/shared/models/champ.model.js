import { AbstractModel } from './abstract.model';
import { Season } from './season.model';
import { Country } from './country.model';
import { User } from './user.model';
import sortBy from 'lodash-es/sortBy';
export class Champ extends AbstractModel {
  constructor(model) {
    super();
    this.seasons = [];
    this.contacts = [];
    this.map(model || {}, {
      seasons: (model) => {
        this.seasons = sortBy(
          model.seasons.map((s) => new Season(s)),
          'sortIdx',
        );
        this.seasons.forEach((s) => {
          s.stages = sortBy(s.stages, 'sortIdx');
        });
        this.inProgress = this.seasons.some((s) => s.inProgress);
      },
      contacts: (model) => {
        this.contacts = model.contacts.map((c) => Object.assign(c, { user: new User(c.user) }));
      },
      country: (model) => {
        this.country = new Country(model.country);
      },
    });
  }
}
//# sourceMappingURL=champ.model.js.map
