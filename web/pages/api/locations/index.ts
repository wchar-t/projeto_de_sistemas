import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const docs = (await prisma.spots.findMany()).map((e) => ({
    ...e,
    coords: {
      lat: e.coords[0],
      lng: e.coords[1],
    },
  }));

  return res.status(200).json({ error: false, result: docs });
}

export default handler;
