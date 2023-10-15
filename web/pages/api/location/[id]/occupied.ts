import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { id } = req.query;
  const start = parseInt(req.query.start as string, 10) * 1000 || undefined;
  const end = parseInt(req.query.end as string, 10) * 1000 || undefined;
  const location = await prisma.spots.findUnique({
    where: {
      id: id as string,
      userId: req.session!.id,
    },
  });

  if (!location) {
    return res.status(404).json({ error: { code: 'location_not_found', message: 'Local não encontrado' } });
  }

  const occupied = await prisma.roomsOccupied.findMany({
    where: {
      createdAt: {
        gte: start ? new Date(start) : undefined,
        lte: end ? new Date(end) : undefined,
      },
    },
  });

  const rooms = await prisma.rooms.findMany({
    where: {
      id: {
        in: occupied.map((o) => o.roomId),
      },
    },
  });

  const roomsOccupied = rooms.map((room) => ({
    name: room.name,
    total: room.total,
    occupied: occupied.filter((o) => o.roomId === room.id).length,
  }));

  return res.status(200).json({ error: false, result: roomsOccupied });
}

export default withSession(handler);
