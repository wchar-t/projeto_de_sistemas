import { GuiaTurApiRequest } from '../interfaces/server/Request';
import { GuiaTurApiResponse } from '../interfaces/server/Response';

export default function withMethod(
  handler: (req: GuiaTurApiRequest, res: GuiaTurApiResponse) => void,
  methods: string[],
) {
  return (req: GuiaTurApiRequest, res: GuiaTurApiResponse) => {
    if (!methods.includes(req.method ?? '')) {
      return res.status(405).json({ error: true, result: 'Método não permitido' });
    }

    if (req.method === 'POST') {
      const contentType = (req.headers?.['content-type'] || '').toLowerCase();
      if (contentType !== 'application/json') {
        return res.status(400).json({ error: true, result: 'Content-Type inválido' });
      }
    }

    return handler(req, res);
  };
}
