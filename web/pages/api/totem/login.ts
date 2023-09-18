import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import { encrypt as encryptJwt } from '@/middlewares/session';
import withMethod from '@/middlewares/method';
import prisma from '@/schema/client';
import TotemSession from '@/interfaces/shared/TotemSession';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { key }: { key: string } = req.body;

  if (!key) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  const doc = await prisma.totem.findUnique({
    where: {
      key,
    },
  });

  if (!doc) {
    return res.status(400).json({ error: { code: 'totem_not_found', message: 'Totem não encontrado' } });
  }

  const session: TotemSession = {
    id: doc.id,
    userId: doc.userId,
    type: 'totem',
    key: doc.key,
    description: doc.description,
    coords: { lat: doc.coords[0], lng: doc.coords[1] },
    createdAt: doc.createdAt,
    lastActive: doc.lastActive,
  }

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, ['POST']);
