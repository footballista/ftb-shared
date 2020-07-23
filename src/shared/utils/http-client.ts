interface urlOptions {
  url: string;
  host?: string;
  method: string;
  body?: object;
  headers?: Headers;
}

interface QueryEnvironment {
  hosts: { API: string };
}

export function http(environment: QueryEnvironment, url: string, abortSignal?: AbortSignal): Promise<any>;
export function http(environment: QueryEnvironment, options: urlOptions, abortSignal?: AbortSignal): Promise<any>;

export async function http(
  environment: QueryEnvironment,
  urlOrOptions: string | urlOptions,
  abortSignal?: AbortSignal,
): Promise<any> {
  const options: urlOptions =
    typeof urlOrOptions == 'string' ? { method: 'GET', url: urlOrOptions, host: environment.hosts.API } : urlOrOptions;
  if (!options.host) options.host = environment.hosts.API;
  options.url = options.host + options.url;
  if (!options.headers) options.headers = new Headers();
  // options.headers.append('AppKey', state.appKey);
  // options.headers.append('ClientLanguage', state.user$.getValue().language);
  // if (state.token$.getValue()) {
  //   options.headers.append('Authorization', 'Bearer ' + state.token$.getValue());
  // }

  try {
    const response = await fetch(options.url, {
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
      return await response.json();
    } else {
      return response.blob();
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
