import { City } from './city.model';
import { League } from './league.model';
import { Champ } from './champ.model';
import { Country } from './country.model';
import { Disqualification } from './disqualification.model';
import { Game } from './game.model';
import { GameEvent } from './game-event.model';
import { GameWish } from './game-wish.model';
import { Pitch } from './pitch.model';
import { Player } from './player.model';
import { Role } from './role.model';
import { Season } from './season.model';
import { Stadium } from './stadium.model';
import { Stage } from './stage.model';
import { StageEvent } from './stage-event.model';
import { Team } from './team.model';
import { TransferRequest } from './transfer-request.model';
import { User } from './user.model';
import { Banner } from './banner.model';
import { Post } from './post.model';
import { Tag } from './tag.model';

/** TODO can we make this list auto-generated when model get added/changed/removed? */
export const models = {
  Champ: Champ,
  City: City,
  League: League,
  Country: Country,
  Disqualification: Disqualification,
  Game: Game,
  GameEvent: GameEvent,
  GameWish: GameWish,
  Pitch: Pitch,
  Player: Player,
  Role: Role,
  Season: Season,
  Stadium: Stadium,
  Stage: Stage,
  StageEvent: StageEvent,
  Team: Team,
  TransferRequest: TransferRequest,
  User: User,
  Banner: Banner,
  Post: Post,
  Tag: Tag,
};
