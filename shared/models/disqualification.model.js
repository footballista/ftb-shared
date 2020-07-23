import { AbstractModel } from './abstract.model';
import { Champ } from './champ.model';
import { League } from './league.model';
import { Player } from './player.model';
import dayjs from 'dayjs';
export class Disqualification extends AbstractModel {
    constructor(model) {
        super();
        this.map(model || {}, {
            champ: model => (this.champ = new Champ(model.champ)),
            league: model => (this.league = new League(model.league)),
            player: model => (this.player = new Player(model.player)),
            until: model => (this.until = dayjs(model.until)),
        });
    }
}
//# sourceMappingURL=disqualification.model.js.map