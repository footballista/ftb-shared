import { AbstractModel } from './abstract.model';
import { Team } from './team.model';
import { League } from './league.model';
import { User } from './user.model';

export class Role extends AbstractModel {
  static LEVELS = {
    ROOT: 'root',
    HEAD: 'head',
    CAPTAIN: 'captain',
    REFEREE: 'referee',
    PHOTOGRAPHER: 'photographer',
    JOURNALIST: 'journalist',
    OPERATOR: 'operator',
  };

  _id: number;
  level: string;
  user: User;
  league: League;
  team: Team;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      user: model => (this.user = new User(model.user)),
      league: model => (this.league = new League(model.league)),
      team: model => (this.team = new Team(model.team)),
    });
  }
}
