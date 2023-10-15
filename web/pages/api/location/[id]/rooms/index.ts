import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { id } = req.query;
  const location = await prisma.spots.findUnique({
    where: {
      id: id as string,
      userId: req.session!.id,
    },
  });

  if (!location) {
    return res.status(404).json({ error: { code: 'location_not_found', message: 'Local não encontrado' } });
  }

  const docs = await prisma.rooms.findMany({
    where: {
      spotId: id as string,
    },
  });

  return res.status(200).json({ error: false, result: docs });
}

export default withSession(handler);
