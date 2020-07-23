import { AbstractModel } from './abstract.model';
import { Season } from './season.model';
import { Country } from './country.model';
import { User } from './user.model';
import sortBy from 'lodash-es/sortBy';

export class Champ extends AbstractModel {
  _id: number;
  show: boolean;
  sortIdx: number;
  name: string;
  country: Country;
  calcRating: boolean;
  seasons: Season[] = [];
  logo: string;
  logoId: number;
  inProgress: boolean;
  contacts: Array<{ _id: number; description: string; user: User }> = [];

  windowSchedulerEnabled: boolean;
  windowSchedulerDayFrom: number; //number 1 - 7
  windowSchedulerTimeFrom: string; // 00:00 - 23:59
  windowSchedulerDayTo: number; //number 1 - 7
  windowSchedulerTimeTo: string; // 00:00 - 23:59

  disqualEnabled: boolean;
  disqualYC: number;

  constructor(model?: object) {
    super();
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
