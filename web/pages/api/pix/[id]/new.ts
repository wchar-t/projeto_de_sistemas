import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import prisma from '@/schema/client';

export default async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  await prisma.fakeSaleLock.create({
    data: {
      seed: id as string,
    },
  });

  return res.status(200).json({ error: false, result: { status: 'ok' } });
}
