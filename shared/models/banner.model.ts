import { AbstractModel } from './abstract.model';

export class Banner extends AbstractModel {
  _id: number;
  show: boolean;
  slotCode: string;
  link: string;
  description: string;
  photoId: number;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {});
  }
}
