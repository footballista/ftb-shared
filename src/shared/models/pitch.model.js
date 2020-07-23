import { AbstractModel } from './abstract.model';
import { Stadium } from './stadium.model';
export class Pitch extends AbstractModel {
  constructor(model) {
    super();
    this.map(model || {}, {
      stadium: (model) => (this.stadium = new Stadium(model.stadium)),
    });
  }
}
//# sourceMappingURL=pitch.model.js.map
