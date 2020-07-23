import { AbstractModel } from './abstract.model';
import { League } from './league.model';
import { Season } from './season.model';
import { Team } from './team.model';
import { Game } from './game.model';
import { StageEvent } from './stage-event.model';

export class Stage extends AbstractModel {
  _id: number;
  name: string;
  show: boolean;
  sortIdx: number;
  format: 'league' | 'free' | 'cup';
  definePosition: 'goals' | 'games';

  season: Season;
  league: League;
  teams: Team[] = [];
  events: StageEvent[] = [];
  games: Game[] = [];

  table: Array<any>;

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      season: (model) => (this.season = new Season(model.season)),
      league: (model) => (this.league = new League(model.league)),
      teams: (model) => (this.teams = model.teams.map((t) => new Team(t))),
      games: (model) => (this.games = model.games.map((g) => new Game(g))),
      events: (model) => (this.events = model.events.map((e) => new StageEvent(e))),
    });
  }
}
