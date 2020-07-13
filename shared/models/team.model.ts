import { AbstractModel } from './abstract.model';
import { Country } from './country.model';
import { League } from './league.model';
import { Player } from './player.model';
import { Game } from './game.model';
import { Season } from './season.model';
import { TransferRequest } from './transfer-request.model';
import { Post } from './post.model';

export class Team extends AbstractModel {
  _id: number;
  url: string;
  name: string;
  shortName: string;
  founded: string; //YYYY-MM-DD
  league: League;
  country: Country;
  uniform: string[] = [];
  parentTeam: Team;
  reserveTeam: Team;
  players: Player[] = [];
  avgAge: number;
  games: Game[] = [];
  seasons: Season[] = [];

  transferRequests: Array<TransferRequest> = [];
  rating: number;
  show: boolean;

  photoId: number;
  hasPhoto: boolean;

  logo: string;
  logoId: number;
  stats: {
    games: number;
    won: number;
    draw: number;
    lost: number;
    scored: number;
    conceded: number;
    winPercent: number;
  };

  topPlayers: {
    goals: Array<{ value: number; player: Player }>;
    assists: Array<{ value: number; player: Player }>;
    goals_assists: Array<{ value: number; player: Player }>;
    played: Array<{ value: number; player: Player }>;
    connection: Array<{ value: number; firstPlayer: Player; secondPlayer }>;
  };

  news: Post[];
  gamesWithPhotos: Array<Game>;
  gamesWithVideos: Array<Game>;

  contacts: Player[] = [];

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      country: model => (this.country = new Country(model.country)),
      players: model => {
        this.players = model.players.map(p => new Player(p));
        this.avgAge = this.players.reduce((stats, pl) => {
          if (pl.age) {
            stats.sum += pl.age;
            stats.total++;
            stats.avg = Math.round(stats.sum/stats.total * 10) / 10;
          }
          return stats;
        }, { total: 0, sum: 0, avg: 0}).avg;
      },
      games: model => (this.games = model.games.map(g => new Game(g))),
      seasons: model => (this.seasons = model.seasons.map(s => new Season(s))),
      contacts: model => (this.contacts = model.contacts.map(p => new Player(p))),
      parentTeam: model => (this.parentTeam = new Team(model.parentTeam)),
      reserveTeam: model => (this.reserveTeam = new Team(model.reserveTeam)),
      news: model => (this.news = model.news.map(n => new Post(n))),
      gamesWithPhotos: model => (this.gamesWithPhotos = model.gamesWithPhotos.map(g => new Game(g))),
      gamesWithVideos: model => (this.gamesWithVideos = model.gamesWithVideos.map(g => new Game(g))),
    });
  }
}
