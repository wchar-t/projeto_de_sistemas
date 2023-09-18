import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import Session from '@/interfaces/shared/Session';
import withSession, { encrypt as encryptJwt } from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const doc = await prisma.user.findUnique({
    where: {
      id: req.session!.id,
    },
  });

  if (!doc) {
    return res.status(400).json({ error: { code: 'user_not_found', message: 'Usuário não encontrado' } });
  }

  const session: Session = {
    id: doc.id,
    type: 'user',
    username: doc.username,
    email: doc.email,
    name: doc.name,
    createdAt: doc.createdAt,
  };

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { session, jwt } });
}

export default withSession(handler);
