import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import { encrypt as encryptJwt } from '@/middlewares/session';
import withMethod from '@/middlewares/method';
import prisma from '../../schema/client';
import Session from '@/interfaces/shared/Session';

interface params {
  username: string,
  password: string,
}

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { username, password }: params = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  const doc = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!doc) {
    return res.status(400).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado' } });
  }

  if (doc.password !== password) {
    return res.status(400).json({ error: { code: 'invalid_password', message: 'Senha inválida' } });
  }

  const session: Session = {
    id: doc.id,
    username: doc.username,
    email: doc.email,
    name: doc.name,
    createdAt: doc.createdAt,
  };

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, ['POST']);
