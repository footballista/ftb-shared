// TODO this script isn't ready yet - figure out how to deal with prodBuild
import { __awaiter } from "tslib";
import { getRepository } from './../utils/repository';
import { getPr } from './../utils/pr';
import { TgClient } from './../utils/telegram';
import { emoji } from './../utils/emoji';
// import { prodBuild } from './../utils/prod-build';
const prMergeBranch = process.env.GITHUB_REF;
const tgClient = new TgClient();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield getRepository();
    const pr = yield getPr(prMergeBranch, repo);
    yield checkIsUpToDate(pr, repo);
    yield build(pr, repo);
});
const checkIsUpToDate = (pr, repo) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield repo.isUpToDate()) {
        console.log('repo is up to date');
    }
    else {
        yield pr.leaveComment(` Branch is not up to date with master. Please follow these steps:
            1. Convert your PR state to 'draft'
            2. Merge master branch into this PR branch (\`${repo.currentBranch}\`)
            3. Test that everything works fine
            4. Change PR state to 'ready'`);
        yield tgClient.sendMessage(pr.authorLogin, `${emoji.no_entry} *PR "${pr.title}" declined* ${emoji.no_entry}
PR branch is not up to date with master. Merging is prohibited. See PR comment for details
${pr.url}`);
        throw new Error('Branch is not up to date');
    }
});
const build = (pr, repo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // prodBuild(true);
    }
    catch (e) {
        yield pr.leaveComment(`Production build failed. Please follow these steps:
     1. Convert your PR state to 'draft'
     2. Fix production build issues
     3. Merge master branch into this PR branch (\`${repo.currentBranch}\`)
    4. Change PR state to 'ready`);
        yield tgClient.sendMessage(pr.authorLogin, `${emoji.no_entry} *PR "${pr.title}" declined* ${emoji.no_entry}
Production build failed. Merging is prohibited. See PR comment for details
${pr.url}`);
        console.error(e);
        throw new Error('production build failed');
    }
});
run()
    .then(() => {
    console.log('everything is fine');
})
    .catch((e) => {
    console.error(e);
    process.exit(254);
});
//# sourceMappingURL=check-pr.js.map