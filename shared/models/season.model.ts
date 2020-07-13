import { AbstractModel } from './abstract.model';
import { Champ } from './champ.model';
import { League } from './league.model';
import { Stage } from './stage.model';
import { Game } from './game.model';
import { Team } from './team.model';
import { Post } from './post.model';
import { Player } from './player.model';

export class Season extends AbstractModel {
  _id: number;
  name: string;
  show: boolean;
  inProgress: boolean;
  sortIdx: number;
  champ: Champ;
  league: League;
  stages: Stage[];
  games: Game[];
  videos: Array<{ link: string; name: string }>;
  playersStats: Array<{
    _id: number;
    firstName: string;
    lastName: string;
    photoId: number;
    played: number;
    goals: number;
    assists: number;
    goals_assists: number;
    points: number;
    yellowCards: number;
    redCards: number;
    fouls: number;
    technicalFouls: number;
    allFouls: number;
    losses: number;
    steals: number;
    reboundsA: number;
    reboundsD: number;
    rebounds: number;
    missesOne: number;
    missesTwo: number;
    missesThree: number;
    misses: number;
    blocks: number;
    aces: number;
    teams: Team[];
  }>;

  news: Post[];
  gamesWithPhotos: Array<Game>;
  gamesWithVideos: Array<Game>;
  birthdays: Player[];

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      champ: model => (this.champ = new Champ(model.champ)),
      league: model => (this.league = new League(model.league)),
      stages: model => (this.stages = model.stages.map(s => new Stage(s))),
      games: model => (this.games = model.games.map(g => new Game(g))),
      news: model => (this.news = model.news.map(n => new Post(n))),
      gamesWithPhotos: model => (this.gamesWithPhotos = model.gamesWithPhotos.map(g => new Game(g))),
      gamesWithVideos: model => (this.gamesWithVideos = model.gamesWithVideos.map(g => new Game(g))),
      birthdays: model => (this.birthdays = model.birthdays.map(p => new Player(p))),
    });
  }
}
