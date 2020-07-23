import { __awaiter } from "tslib";
import { http } from './http-client';
import { models } from '../models/models-list';
const STATE_KEY = 'APP_STATE';
const HYDRATED_DATA = [];
let STATE;
/**
 * @param environment - client app environment
 * @param query - standard in grapql format
 * @param name - optional request name for easy debug in browser devtools
 * @param abortSignal - if you need a cancel request functionality
 */
export function graphql(environment, query, name, abortSignal) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = { query: '{ ' + query + ' }' };
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = (name || '') + '?query=query {' + query + ' }';
        let response;
        if (!STATE && STATE_KEY in window) {
            STATE = JSON.parse(decodeURIComponent(window[STATE_KEY]));
        }
        if (STATE && name in STATE) {
            HYDRATED_DATA.push(name);
            response = STATE[name];
            delete STATE[name];
        }
        else {
            response = (yield http(environment, { method: 'POST', host: environment.hosts.GRAPHQL, url, headers, body }, abortSignal)).data;
        }
        let className = query.split('{')[0].split('(')[0].trim();
        if (typeof process === 'object') {
            global['data'][name] = response;
        }
        if (className.includes('_list')) {
            return response[className].map((item) => new models[className.split('_list')[0]](item));
        }
        else {
            return new models[className](response[className]);
        }
    });
}
//# sourceMappingURL=graphql-client.js.map