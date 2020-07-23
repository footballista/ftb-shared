import { AbstractModel } from './abstract.model';
import dayjs from 'dayjs';
export class StageEvent extends AbstractModel {
  constructor(model) {
    super();
    this.map(model || {}, {
      date: (model) => (this.date = dayjs(model.date)),
    });
  }
}
StageEvent.TYPES = {
  replace: 'TEAM_REPLACED',
  disqual: 'TEAM_DISQUALIFIED',
  penalty: 'TEAM_PENALIZED',
};
//# sourceMappingURL=stage-event.model.js.map
