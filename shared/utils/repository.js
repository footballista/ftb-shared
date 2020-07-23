import { __awaiter } from "tslib";
const git = require('simple-git/promise')(__dirname + '/../../');
export const getRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const repo = new Repository();
    yield repo.init();
    return repo;
});
export class Repository {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const remote = yield git.remote(['show', 'origin']);
            [this.owner, this.name] = remote.split('github.com/')[1].split('\n')[0].split('/');
            const newRemote = `https://action:${process.env.GITHUB_TOKEN}@github.com/${this.owner}/${this.name}`;
            yield git.addConfig('user.email', 'action@github.com');
            yield git.addConfig('user.name', 'GitHub Action');
            yield git.removeRemote('origin');
            yield git.addRemote('origin', newRemote);
            yield git.fetch(['--all']);
            this.currentBranch = (yield git.status()).current;
        });
    }
    isUpToDate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield git.mergeFromTo('origin/master', 'HEAD', ['--no-ff', '--no-commit']);
                const modifiedFiles = (yield git.status()).modified;
                console.log(modifiedFiles, 'modified files');
                if (modifiedFiles.length) {
                    throw new Error('Has modified files: ' + modifiedFiles.join(', '));
                }
                return true;
            }
            catch (e) {
                return false;
            }
            finally {
                yield git.reset(['--merge']);
            }
        });
    }
}
//# sourceMappingURL=repository.js.map