import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import withSession from '@/middlewares/session';
import prisma from '@/schema/client';

interface params {
  title: string,
  subtitle: string,
  description: string,
  images: string[],
  price: number,
  priceFormat: string,
  icon: string,
  lat: number,
  lng: number,
}

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const {
    title, subtitle, description, images, price, priceFormat, icon, lat, lng,
  }: params = req.body;

  if (!title || !subtitle || !description || !images) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  if (!price || !priceFormat || !icon || !lat || !lng) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  if (!(images instanceof Array)) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  await prisma.spots.create({
    data: {
      userId: req.session!.id,
      title,
      subtitle,
      description,
      images,
      price,
      priceFormat,
      icon,
      coords: [lat, lng],
    },
  });

  return res.status(200).json({ status: 'ok' });
}

export default withSession(handler);
