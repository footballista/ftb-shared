import { AbstractModel } from './abstract.model';
import { Game } from './game.model';
import { Player } from './player.model';
import { Team } from './team.model';

export class GameEvent extends AbstractModel {
  static TYPES = {
    GAME_STARTED: 1,
    PART_ENDED: 2,
    GAME_ENDED: 3,

    COMMENT: 9,

    F_GOAL: 101,

    F_YELLOW: 111,
    F_SECOND_YELLOW: 112,
    F_RED: 113,

    F_SHOT: 121,
    F_SHOT_MISSED: 122,
    F_CORNER: 123,
    F_DANGER: 124,
    F_FOUL: 125,

    B_FOUL: 211,
    B_TECHNICAL_FOUL: 212,

    B_SHOT_ONE: 221,
    B_SHOT_TWO: 222,
    B_SHOT_THREE: 223,

    B_MISSED_ONE: 231,
    B_MISSED_TWO: 232,
    B_MISSED_THREE: 233,

    B_REBOUND_A: 241,
    B_REBOUND_D: 242,
    B_STEAL: 243,
    B_LOSS: 244,

    V_POINT: 301,
    V_ACE: 302,
    V_BLOCK: 311,
  };

  static EXTRAS = {
    OWN_GOAL: 1,
    FREE_KICK: 2,
    PENALTY: 3,
  };

  _id: number;
  type: number;
  team: Team;
  game: Game;
  firstPlayer: Player;
  secondPlayer: Player;
  minute: number;
  comment: string;
  part: number; // half, quarter or set

  state: 'saving' | 'failed' | 'saved' = 'saved';

  constructor(model?: Object) {
    super();
    this.map(model || {}, {
      firstPlayer: (model) => (this.firstPlayer = new Player(model.firstPlayer)),
      secondPlayer: (model) => (this.secondPlayer = new Player(model.secondPlayer)),
    });
  }
}
