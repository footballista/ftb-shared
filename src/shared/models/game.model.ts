import { Team } from './team.model';
import { Player } from './player.model';
import { User } from './user.model';
import { AbstractModel } from './abstract.model';
import { Stadium } from './stadium.model';
import { League } from './league.model';
import { Season } from './season.model';
import { Champ } from './champ.model';
import { Stage } from './stage.model';
import { Pitch } from './pitch.model';
import { GameEvent } from './game-event.model';
import { GameWish } from './game-wish.model';
import dayjs from 'dayjs';

export class Game extends AbstractModel {
  static STATES = {
    NOT_STARTED: 0,
    WISHES: 1,
    SCHEDULED: 2,
    STARTED: 3,
    CLOSED: 4,
  };

  _id: number;
  league: League;
  champ: Champ;
  season: Season;
  stage: Stage;

  tourNumber: number;
  netPosition: number;
  techDefeat: boolean;
  manualScore: boolean;
  state: string;
  stateCode: number;
  teamHome: Team;
  teamAway: Team;

  photoSetUrl: string;
  photos: Array<{ thumb: string; middle: string; full: string; hd: string }> = [];
  photoCover: string;

  stadium: Stadium;
  pitch: Pitch;

  referee: User;
  photographer: User;
  operator: User;
  journalist: User;
  doctor: User;
  manager: User;

  scoreFtHome: number;
  scoreFtAway: number;
  scorePenHome: number;
  scorePenAway: number;

  timestamp: number;
  date;
  events: GameEvent[] = [];
  videos: Array<{ _id: number; name: string; link: string; type: string }> = [];

  playersHome: Player[] = [];
  playersAway: Player[] = [];

  rosterHome: Player[] = [];
  rosterAway: Player[] = [];

  wishesHome: GameWish[] = [];
  wishesAway: GameWish[] = [];
  wishesCommentHome = '';
  wishesCommentAway = '';

  currentPart = 0;
  partsScoreHome: number[] = [];
  partsScoreAway: number[] = [];

  homeLineupOptimality: number;
  awayLineupOptimality: number;

  previousDuels: Game[];

  staff: Array<{ role: string; user: User }>;

  // todo refactor all this use-cases
  getSeason() {
    if (this.season) return this.season;
    if (this.stage) return this.stage.season;
  }

  getChamp() {
    if (this.champ) return this.champ;
    if (this.season) return this.season.champ;
    if (this.stage && this.stage.season) return this.stage.season.champ;
  }

  constructor(model?: Object) {
    super();

    this.map(model || {}, {
      league: model => (this.league = new League(model.league)),
      champ: model => (this.champ = new Champ(model.champ)),
      season: model => (this.season = new Season(model.season)),
      stage: model => (this.stage = new Stage(model.stage)),
      teamHome: model => (this.teamHome = new Team(model.teamHome)),
      teamAway: model => (this.teamAway = new Team(model.teamAway)),

      wishesHome: model => (this.wishesHome = model.wishesHome.map(w => new GameWish(w))),
      wishesAway: model => (this.wishesHome = model.wishesAway.map(w => new GameWish(w))),

      playersHome: model => (this.playersHome = model.playersHome.map(p => new Player(p))),
      playersAway: model => (this.playersAway = model.playersAway.map(p => new Player(p))),
      rosterHome: model => (this.rosterHome = model.rosterHome.map(p => new Player(p))),
      rosterAway: model => (this.rosterAway = model.rosterAway.map(p => new Player(p))),

      stadium: model => (this.stadium = new Stadium(model.stadium)),
      pitch: model => (this.pitch = new Pitch(model.pitch)),

      referee: model => (this.referee = new User(model.referee)),
      photographer: model => (this.photographer = new User(model.photographer)),
      operator: model => (this.operator = new User(model.operator)),
      journalist: model => (this.journalist = new User(model.journalist)),
      manager: model => (this.manager = new User(model.manager)),
      date: model => {
        if (model.date) {
          this.date = dayjs(model.date);
          this.timestamp = this.date.unix() * 1000;
        }
      },
      timestamp: model => {
        if (model.timestamp) {
          this.date = dayjs(model.timestamp);
          this.timestamp = model.timestamp;
        }
      },
      previousDuels: model => {
        this.previousDuels = model.previousDuels.map(g => new Game(g));
      },
      events: model =>
        (this.events = model.events.map(e => {
          const event = new GameEvent(e);
          if (e.team) {
            event.team = event.team._id == model.teamHome._id ? new Team(model.teamHome) : new Team(model.teamAway);
          }
          event.game = new Game({ _id: model._id });
          return event;
        })),
      staff: model => {
        this.staff = model.staff.map((s) => ({ role: s.role, user: new User(s.user) }));
      },
    });
  }
}
