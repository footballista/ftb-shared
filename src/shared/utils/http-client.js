import { __awaiter } from 'tslib';
export function http(environment, urlOrOptions, abortSignal) {
  return __awaiter(this, void 0, void 0, function* () {
    const options =
      typeof urlOrOptions == 'string'
        ? { method: 'GET', url: urlOrOptions, host: environment.hosts.API }
        : urlOrOptions;
    if (!options.host) options.host = environment.hosts.API;
    options.url = options.host + options.url;
    if (!options.headers) options.headers = new Headers();
    // options.headers.append('AppKey', state.appKey);
    // options.headers.append('ClientLanguage', state.user$.getValue().language);
    // if (state.token$.getValue()) {
    //   options.headers.append('Authorization', 'Bearer ' + state.token$.getValue());
    // }
    try {
      const response = yield fetch(options.url, {
        method: options.method.toUpperCase(),
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: options.headers,
        redirect: 'error',
        body: JSON.stringify(options.body),
        signal: abortSignal,
      });
      if (!response.ok) throw response;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('json')) {
        return yield response.json();
      } else {
        return response.blob();
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
}
//# sourceMappingURL=http-client.js.map
