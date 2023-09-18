import { GuiaTurApiRequest } from "@/interfaces/server/Request";
import { GuiaTurApiResponse } from "@/interfaces/server/Response";
import withSession from "@/middlewares/session";
import prisma from "@/schema/client";

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { key }: { key: string } = req.body;
  
  try {
    await prisma.totem.delete({
      where: {
        key,
        userId: req.session!.id,
      },
    });
  } catch(e) {
    void(0);
  }

  return res.status(200).json({ error: false, result: { status: 'ok' } });
}

export default withSession(handler);
