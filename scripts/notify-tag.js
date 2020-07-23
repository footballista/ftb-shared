import { __awaiter } from "tslib";
import { emoji } from '../shared/utils/emoji';
import { TgClient } from '../shared/utils/telegram';
import { getRepository } from '../shared/utils/repository';
const tgClient = new TgClient();
const notify = () => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield getRepository();
    yield tgClient.sendMessage('channel', `${emoji.purple_heart} *SHARED COMPONENTS* new tag released. Do not forget to update dependencies in client projects.\n\n
changelog: https://github.com/${repo.owner}/${repo.name}/blob/master/CHANGELOG.md`);
});
notify();
//# sourceMappingURL=notify-tag.js.map