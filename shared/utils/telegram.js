import { __awaiter } from "tslib";
import fetch from 'node-fetch';
export class TgClient {
    constructor() {
        this.token = process.env.TG_BOT_TOKEN;
        this.ghUsers = {
            favetisov: { chatId: 109124816, login: '@favetisov' },
            pyfuk: { chatId: 145871247, login: '@Shaxboz_Khalikov' },
            tonypizzicato: { chatId: 397993844 },
            channel: { chatId: -1001273536067 },
        };
    }
    call(command, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://api.telegram.org/bot${this.token}/${command}`, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-Type': 'application/json' },
            });
            return yield response.json();
        });
    }
    sendMessage(ghUser, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.ghUsers[ghUser];
            if (!user) {
                console.warn(`No telegram user set for github account '${ghUser}'`);
            }
            else {
                const response = yield this.call('sendMessage', {
                    chat_id: user.chatId,
                    text,
                    parse_mode: 'markdown',
                });
                return response;
            }
        });
    }
}
//# sourceMappingURL=telegram.js.map