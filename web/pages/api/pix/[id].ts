import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import prisma from '@/schema/client';

export default async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  const doc = await prisma.fakeSaleLock.findUnique({
    where: {
      seed: id as string,
    },
  });

  if (!doc) {
    return res.status(404).json({ error: { code: 'not_found', message: 'Não encontrado' } });
  }

  return res.status(200).json({ error: false, result: { status: 'ok' } });
}
