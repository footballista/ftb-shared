import { AbstractModel } from './abstract.model';
import { Team } from './team.model';
import { League } from './league.model';
import { Champ } from './champ.model';

export class Country extends AbstractModel {
  _id: number;
  name: string;
  founded: string;
  league: League;
  flag: string;
  teams: Team[] = [];
  champs: Champ[] = [];

  socialVk: string;
  socialFb: string;
  socialIg: string;

  photoId: string;
  show: boolean;
  sortIdx: number;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      league: (model) => (this.league = new League(model.league)),
      teams: (model) => (this.teams = model.teams.map((t) => new Team(t))),
      champs: (model) => (this.champs = model.champs.map((c) => new Champ(c))),
    });
  }
}
