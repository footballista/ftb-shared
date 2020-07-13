import { AbstractModel } from './abstract.model';
import { City } from './city.model';
import { Champ } from './champ.model';
import { Stadium } from './stadium.model';
import { Game } from './game.model';
import { Post } from './post.model';
import { Team } from './team.model';

export class League extends AbstractModel {
  _id: number;
  name: string;
  sortIdx: number;
  show: boolean;
  city: City;
  sports: string;
  sportsSubtype: string;

  linkVk: string;
  linkFb: string;
  linkWeb: string;
  linkIg: string;

  foundedYear: string;
  logoId: number;

  champs: Champ[];
  stadiums: Stadium[];
  teams: Team[];

  stats: {
    champs: number;
    teams: number;
    stadiums: number;
    players: number;
    rating: number;
    games: number;
  } = { champs: 0, teams: 0, rating: 0, players: 0, stadiums: 0, games: 0 };

  news: Post[];
  gamesWithPhotos: Array<Game>;
  gamesWithVideos: Array<Game>;
  documents: Document[];

  subtypes = {
    football: ['football 11x11', 'football 8x8', 'football 7x7', 'football 6x6', 'football 5x5'],
    beach_soccer: [],
    basketball: ['basketball 5x5', 'basketball 3x3'],
    hockey: [],
    tennis: [],
    volleyball: [],
  };

  getSubtypes() {
    let arr = [];
    for (const subtype of Object.keys(this.subtypes)) {
      if (this.subtypes[subtype].length) {
        arr = arr.concat(this.subtypes[subtype]);
      } else {
        arr.push(subtype.replace('_', '-'));
      }
    }
    return arr;
  }

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      city: model => (this.city = new City(model.city)),
      champs: model => (this.champs = model.champs.map(c => new Champ(c))),
      news: model => (this.news = model.news.map(n => new Post(n))),
      stadiums: model => (this.stadiums = model.stadiums.map(c => new Stadium(c))),
      gamesWithPhotos: model => (this.gamesWithPhotos = model.gamesWithPhotos.map(g => new Game(g))),
      gamesWithVideos: model => (this.gamesWithVideos = model.gamesWithVideos.map(g => new Game(g))),
    });
  }
}
