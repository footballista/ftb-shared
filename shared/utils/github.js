import { __awaiter } from "tslib";
import fetch from 'node-fetch';
const token = process.env.GITHUB_TOKEN;
export const githubGraphql = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ query: 'query { ' + query + '}' });
    const headers = new fetch.Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const response = yield fetch('https://api.github.com/graphql', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers,
        body: body,
    });
    const json = yield response.json();
    if (!json.data) {
        throw new Error('ERROR LOADING GRAPHQL' + JSON.stringify(json));
    }
    return json.data;
});
export const githubRest = (method, url, body) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new fetch.Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    const response = yield fetch('https://api.github.com' + url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers,
        body: JSON.stringify(body),
    });
    return yield response.json();
});
//# sourceMappingURL=github.js.map