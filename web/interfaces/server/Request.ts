import { NextApiRequest } from 'next';
import Session from '../shared/Session';
import TotemSession from '../shared/TotemSession';

export interface GuiaTurApiRequest extends NextApiRequest {
  session?: Session | TotemSession,
}
