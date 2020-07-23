import { http } from './http-client';
import { models } from '../models/models-list';

declare var process: any;
declare var global: any;

const STATE_KEY = 'APP_STATE';

const HYDRATED_DATA = [];

let STATE;

interface QueryEnvironment {
  hosts: { GRAPHQL: string; API: string };
}

/**
 * @param environment - client app environment
 * @param query - standard in grapql format
 * @param name - optional request name for easy debug in browser devtools
 * @param abortSignal - if you need a cancel request functionality
 */
export async function graphql(environment: QueryEnvironment, query: string, name?: string, abortSignal?: AbortSignal) {
  const body = { query: '{ ' + query + ' }' };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const url = (name || '') + '?query=query {' + query + ' }';

  let response: any;

  if (!STATE && STATE_KEY in window) {
    STATE = JSON.parse(decodeURIComponent(window[STATE_KEY]));
  }

  if (STATE && name in STATE) {
    HYDRATED_DATA.push(name);

    response = STATE[name];

    delete STATE[name];
  } else {
    response = (
      await http(environment, { method: 'POST', host: environment.hosts.GRAPHQL, url, headers, body }, abortSignal)
    ).data;
  }

  let className = query.split('{')[0].split('(')[0].trim();

  if (typeof process === 'object') {
    global['data'][name] = response;
  }

  if (className.includes('_list')) {
    return response[className].map((item) => new models[className.split('_list')[0]](item));
  } else {
    return new models[className](response[className]);
  }
}
