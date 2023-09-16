import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withMethod from '@/middlewares/method';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

interface params {
  key: string,
  description: string,
}

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { key, description }: params = req.body;

  if (!key || !description) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  if (req.session!.type === 'totem') {
    return res.status(400).json({ error: { code: 'invalid_session', message: 'Sessão inválida' } });
  }

  const doc = await prisma.totem.findUnique({
    where: {
      key,
    },
  });

  if (doc) {
    return res.status(400).json({ error: { code: 'totem_already_exists', message: 'A chave já está sendo usada' } });
  }

  await prisma.totem.create({
    data: {
      key,
      description,
      userId: req.session!.id,
      coords: [0.0, 0.0],
    },
  });

  return res.status(200).json({ error: false, result: { status: 'ok' } });
}

export default withSession(withMethod(handler, ['POST']));
