import { AbstractModel } from "./abstract.model";
import { Team } from "./team.model";
import { League } from "./league.model";
import { Champ } from "./champ.model";
export class Country extends AbstractModel {
    constructor(model) {
        super();
        this.teams = [];
        this.champs = [];
        this.map(model || {}, {
            league: model => (this.league = new League(model.league)),
            teams: model => (this.teams = model.teams.map(t => new Team(t))),
            champs: model => (this.champs = model.champs.map(c => new Champ(c))),
        });
    }
}
//# sourceMappingURL=country.model.js.map