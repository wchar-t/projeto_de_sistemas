import Session from '@/interfaces/shared/Session';
import TotemSession from '../interfaces/shared/TotemSession';
import LoginRegisterSuccess from '@/interfaces/client/LoginRegisterSuccess';
import Totem from '@/interfaces/client/Totem';

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
  private static session: Session | null = null;

  static setToken(token?: string) {
    window.localStorage.setItem('token', token ?? '');
  }

  static setSession(session: Session | null) {
    this.session = session;
  }

  static setTotemSession(token?: string) {
    window.localStorage.setItem('totemToken', token ?? '');
  }

  static async register(
    name: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ): Promise<RequestResponse<LoginRegisterSuccess>> {
    return request<LoginRegisterSuccess>('/api/register', {
      name, lastName, username, email, password,
    });
  }

  static async login(
    username: string,
    password: string,
  ): Promise<RequestResponse<LoginRegisterSuccess>> {
    return request<LoginRegisterSuccess>('/api/login', {
      username, password,
    });
  }

  static async loginTotem(
    key: string,
  ): Promise<RequestResponse<LoginRegisterSuccess>> {
    return request<LoginRegisterSuccess>('/api/totem/login', { key });
  }

  /* private routes */

  static getSession(): Session | null {
    return this.session;
  }

  static async getMe(): Promise<RequestResponse<{
    session: Session,
    jwt: string,
  }>> {
    return request<{session: Session, jwt: string}>('/api/@me');
  }

  static async registerTotem(
    key: string,
    description: string,
  ): Promise<RequestResponse<{status: string}>> {
    return request<{status: string}>('/api/totems/register', { key, description });
  }

  static async getTotems(): Promise<RequestResponse<{totems: Totem[]}>> {
    return request<{totems: Totem[]}>('/api/totems');
  }
}
