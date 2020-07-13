import { AbstractModel } from './abstract.model';
import { Player } from './player.model';
import { Team } from './team.model';
import { User } from './user.model';
import dayjs from 'dayjs';

export class TransferRequest extends AbstractModel {
  static TYPES = {
    CREATE: 'create',
    TRANSFER: 'transfer',
    FREE_TRANSFER: 'free_transfer',
    COMBINE: 'combine',
    REMOVE: 'roster_remove',
  };
  static STATES = { sent: 0, capConfirmed: 1, adminConfirmed: 2, declined: 3 };

  _id: number;
  fromTeam: Team;
  toTeam: Team;
  player: Player;
  state: number;
  type: 'create' | 'transfer' | 'free_transfer' | 'combine' | 'roster_remove';

  createdDate: dayjs.Dayjs;
  createdBy: User;
  capApprovedDate: dayjs.Dayjs;
  capApprovedBy: User;
  adminConfirmedDate: dayjs.Dayjs;
  adminConfirmedBy: User;
  declinedDate: dayjs.Dayjs;
  declinedBy: User;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      fromTeam: model => (this.fromTeam = new Team(model.fromTeam)),
      toTeam: model => (this.toTeam = new Team(model.toTeam)),
      player: model => (this.player = new Player(model.player)),
      createdTimestamp: model => (this.createdDate = dayjs(model.createdTimestamp, 'X')),
      capApprovedTimestamp: model => (this.capApprovedDate = dayjs(model.capApprovedTimestamp, 'X')),
      adminConfirmedTimestamp: model => (this.adminConfirmedDate = dayjs(model.adminConfirmedTimestamp, 'X')),
      declinedTimestamp: model => (this.declinedDate = dayjs(model.declinedTimestamp, 'X')),
      createdBy: model => (this.createdBy = new User(model.createdBy)),
      capApprovedBy: model => (this.capApprovedBy = new User(model.capApprovedBy)),
      adminConfirmedBy: model => (this.adminConfirmedBy = new User(model.adminConfirmedBy)),
      declinedBy: model => (this.declinedBy = new User(model.declinedBy)),
    });
  }

  get timestamp() {
    return this.date ? this.date.format('X') : '';
  }

  get date() {
    return this.declinedDate || this.adminConfirmedDate || this.capApprovedDate || this.createdDate;
  }
}
