import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const totems = await prisma.totem.findMany({
    where: {
      userId: req.session!.id,
    },
  });

  return res.json({ error: false, result: totems.reverse() });
}

export default withSession(handler);
