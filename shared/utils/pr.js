import { __awaiter } from "tslib";
import { githubGraphql, githubRest } from './github';
export const getPr = (mergeBranch, repo) => __awaiter(void 0, void 0, void 0, function* () {
    const number = parseInt(mergeBranch.split('/')[2]);
    const pr = new Pr(number, repo);
    yield pr.loadInfo();
    return pr;
});
export class Pr {
    constructor(number, repo) {
        this.number = number;
        this.repo = repo;
        this.url = `https://github.com/${this.repo.owner}/${this.repo.name}/pull/${this.number}`;
    }
    loadInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield githubGraphql(`repository(name:"${this.repo.name}", owner:"${this.repo.owner}"){
        pullRequest(number:${this.number}) { title, author {login } }
    }`);
            this.title = response.repository.pullRequest.title;
            this.authorLogin = response.repository.pullRequest.author.login;
        });
    }
    // todo check if we can require changes
    leaveComment(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return githubRest('POST', `/repos/${this.repo.owner}/${this.repo.name}/pulls/${this.number}/reviews`, {
                body: text,
                event: 'REQUEST_CHANGES',
            });
        });
    }
}
//# sourceMappingURL=pr.js.map