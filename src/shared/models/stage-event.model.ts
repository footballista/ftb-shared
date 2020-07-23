import { AbstractModel } from './abstract.model';
import { Team } from './team.model';
import dayjs from 'dayjs';

export class StageEvent extends AbstractModel {
  static TYPES = {
    replace: 'TEAM_REPLACED',
    disqual: 'TEAM_DISQUALIFIED',
    penalty: 'TEAM_PENALIZED',
  };

  type: 'TEAM_REPLACED' | 'TEAM_DISQUALIFIED' | 'TEAM_PENALIZED';
  team: Team;
  toTeam: Team;
  points: number;
  timestamp: number;
  date: dayjs.Dayjs;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      date: (model) => (this.date = dayjs(model.date)),
    });
  }
}
