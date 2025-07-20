import { HttpClient } from '../utils/http-client';
import { Session, CreateSessionRequest } from '../types';

export class SessionsResource {
  constructor(private httpClient: HttpClient) {}

  async create(data: CreateSessionRequest): Promise<Session> {
    return this.httpClient.post<Session>('/api/sessions', data);
  }
}
