import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { location, name, room, price, total } = req.body;

  if (!location || !name || !total || !price) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  const loc = await prisma.spots.findUnique({
    where: {
      id: location as string,
      userId: req.session!.id,
    },
  });

  if (!loc) {
    return res.status(404).json({ error: { code: 'location_not_found', message: 'Local não encontrado' } });
  }

  if (room) {
    try {
      await prisma.rooms.update({
        where: {
          id: room as string,
        },
        data: {
          name,
          total,
          price,
        },
      });
    } catch (_e) {
      return res.status(500).json({ error: { code: 'internal_server_error', message: 'Erro interno do servidor' } });
    }
  } else {
    try {
      await prisma.rooms.create({
        data: {
          name,
          total,
          price,
          spotId: location as string,
        },
      });
    } catch (_e) {
      return res.status(500).json({ error: { code: 'internal_server_error', message: 'Erro interno do servidor' } });
    }
  }

  return res.status(200).json({ error: false, result: { status: 'ok' } });
}

export default withSession(handler);
