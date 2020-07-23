import { AbstractModel } from './abstract.model';
import { Stadium } from './stadium.model';

export class Pitch extends AbstractModel {
  _id: number;
  name: string;
  show: boolean;
  sortIdx: number;
  description: string;
  stadium: Stadium;
  hasPhoto: boolean;
  photoId: number;
  photo: string;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      stadium: (model) => (this.stadium = new Stadium(model.stadium)),
    });
  }
}
