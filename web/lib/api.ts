import TotemSession from '../interfaces/shared/TotemSession';

/* eslint-disable no-undef */
export interface SuccessfulResponse<Data extends Record<string, any>> {
  error: false,
  result: Data,
}

export interface ErrorResponse {
  error: {
    code: string,
    message: string,
  },
  result: null,
}

type RequestResponse<Data extends Record<string, any>> =
  | SuccessfulResponse<Data>
  | ErrorResponse;

export const request = async <Data extends Record<string, any>>(
  url: string, data?: object, options?: RequestInit,
): Promise<RequestResponse<Data>> => {
  const headers = options?.headers ? new Headers(options.headers) : new Headers();
  const token = window.localStorage.getItem('token');
  const serialized = data ? JSON.stringify(data) : null;
  const method = options?.method ?? (data ? 'POST' : 'GET');

  if (method === 'POST') {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('Authorization', `Bearer ${token}`);

  const { error, result } = await window.fetch(url, {
    ...options,
    method,
    body: method === 'PUT' ? data as FormData : serialized,
    headers,
  }).then((e) => e.json());

  if (error) {
    return <ErrorResponse>{ error: { code: error.code, message: error.message } };
  }

  return <SuccessfulResponse<Data>>{ result };
};

export default class Api {
  static session: TotemSession | null = null;

  static setToken(token?: string) {
    window.localStorage.setItem('token', token ?? '');
  }

  /* private routes */
}
