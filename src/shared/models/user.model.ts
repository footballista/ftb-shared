import { AbstractModel } from './abstract.model';
import { League } from './league.model';
import { Role } from './role.model';
import { Player } from './player.model';
import { Team } from './team.model';
import { Game } from './game.model';

export class User extends AbstractModel {
  _id: number;
  name: string;
  language: string;
  league: League = new League();
  photoId: number;
  roles: Role[] = [];
  phone: string;
  vk: string;
  fb: string;
  notificationsAllowed: boolean;
  sports: 'football' | 'basketball' | 'beach-soccer';
  token: string;
  players: Player[] = [];
  games: Game[] = [];
  devices: { uuid: string; fbToken: string }[] = [];
  timezoneOffset: number;

  constructor(model?: object) {
    super();

    this.timezoneOffset = new Date().getTimezoneOffset();

    this.map(model || {}, {
      league: (model) => (this.league = new League(model.league)),
      leagueId: (model) => (this.league = new League({ _id: model.leagueId, name: model.leagueName })),
      players: (model) => (this.players = model.players.map((p) => new Player(p))),
      roles: (model) => (this.roles = model.roles.map((r) => new Role(r))),
      games: (model) => (this.games = model.games.map((g) => new Game(g))),
    });
  }

  isRoot() {
    return this.roles.some((r) => r.level == 'root');
  }

  isLeagueHead() {
    if (this.isRoot()) return true;
    for (let r of this.roles) {
      if (r.level == Role.LEVELS.HEAD && r.league._id == this.league._id) {
        return true;
      }
    }
    return false;
  }

  isReferee() {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.REFEREE && r.league._id == this.league._id) {
        return true;
      }
    }
    return false;
  }

  isCaptain() {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.CAPTAIN) return true;
    }
  }

  isJournalist() {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.JOURNALIST) return true;
    }
  }

  isPhotographer() {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.PHOTOGRAPHER) return true;
    }
  }

  isStaff() {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.PHOTOGRAPHER || r.level == Role.LEVELS.JOURNALIST || r.level == Role.LEVELS.REFEREE)
        return true;
    }
  }

  hasAccessToTeam(team: Team) {
    if (this.isRoot()) return true;
    if (this.isLeagueHead()) return true;
    for (var i in this.roles) {
      let r = this.roles[i];
      if (r.level == Role.LEVELS.CAPTAIN && r.team._id == team._id) return true;
    }
    return false;
  }

  hasAdminAccessToLeague(league: League) {
    if (this.isRoot()) return true;
    for (const r of this.roles) {
      if (
        [
          Role.LEVELS.HEAD,
          Role.LEVELS.REFEREE,
          Role.LEVELS.OPERATOR,
          Role.LEVELS.JOURNALIST,
          Role.LEVELS.PHOTOGRAPHER,
        ].includes(r.level) &&
        r.league._id === league._id
      )
        return true;
    }
    return false;
  }

  hasAdminPrivileges() {
    if (this.isRoot()) {
      return true;
    } else {
      return this.roles.some((r) => {
        return [
          Role.LEVELS.HEAD,
          Role.LEVELS.PHOTOGRAPHER,
          Role.LEVELS.OPERATOR,
          Role.LEVELS.JOURNALIST,
          Role.LEVELS.REFEREE,
        ].includes(r.level);
      });
    }
  }
}
