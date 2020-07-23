import { AbstractModel } from './abstract.model';
import { Team } from './team.model';
import { League } from './league.model';
import { User } from './user.model';
import { Disqualification } from './disqualification.model';
import { TransferRequest } from './transfer-request.model';
import dayjs from 'dayjs';
import customFormat from 'dayjs/plugin/customParseFormat';
import { Game } from './game.model';
import { Post } from './post.model';
dayjs.extend(customFormat);
export class Player extends AbstractModel {
    constructor(model) {
        super();
        this.teams = [];
        this.pendingTeams = [];
        this.requests = [];
        this.disqualifications = [];
        this.map(model || {}, {
            league: model => (this.league = new League(model.league)),
            teams: model => (this.teams = model.teams.map(t => new Team(t))),
            news: model => (this.news = model.news.map(n => new Post(n))),
            requests: model => (this.requests = model.requests.map(r => new TransferRequest(r))),
            disqualifications: model => (this.disqualifications = model.disqualifications.map(d => new Disqualification(d))),
            birthdayDate: model => {
                this.birthdayDate = dayjs(model.birthdayDate);
                if (!this.birthdayDate.isValid())
                    this.birthdayDate = dayjs(model.birthday, 'DD.MM.YYYY');
                if (!this.birthdayDate.isValid())
                    this.birthdayDate = null;
            },
            blacklistedBy: model => (this.blacklistedBy = new User(model.blacklistedBy)),
            blacklistedTimestamp: model => {
                this.blacklistedTimestamp = model.blacklistedTimestamp;
                this.blacklistedDate = dayjs(model.blacklistedTimestamp, 'X');
            },
            career: model => {
                if (!model.career.teams)
                    model.career.teams = [];
                if (!model.career.seasons)
                    model.career.seasons = [];
                model.career.teams = model.career.teams.map(t => {
                    if (t.from)
                        t.from = dayjs(t.from);
                    if (t.till)
                        t.till = dayjs(t.till);
                    return t;
                });
                this.career = model.career;
            },
            games: model => {
                return (this.games = model.games.map(g => (Object.assign(Object.assign({}, g), { game: new Game(g.game) }))));
            },
            gamesWithPhotos: model => (this.gamesWithPhotos = model.gamesWithPhotos.map(g => new Game(g))),
            gamesWithVideos: model => (this.gamesWithVideos = model.gamesWithVideos.map(g => new Game(g))),
        });
        this.pendingTeams = this.teams.filter(t => this.requests.some(r => r.toTeam && r.toTeam._id == t._id && r.state < 2));
    }
    get name() {
        return this.lastName + ' ' + this.firstName + ' ' + (this.middleName || '');
    }
    get age() {
        if (!this.birthdayDate)
            return null;
        return dayjs().diff(this.birthdayDate, 'year');
    }
}
//# sourceMappingURL=player.model.js.map