import { GuiaTurApiRequest } from '@/interfaces/server/Request';
import { GuiaTurApiResponse } from '@/interfaces/server/Response';
import { encrypt as encryptJwt } from '@/middlewares/session';
import withMethod from '@/middlewares/method';
import prisma from '../../schema/client';
import Session from '@/interfaces/shared/Session';

interface params {
  name: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
}

async function handler(req: GuiaTurApiRequest, res: GuiaTurApiResponse) {
  const { lastName, password } = req.body;
  let {
    name, username, email,
  }: params = req.body;

  if (!name || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: { code: 'invalid_data', message: 'Dados inválidos' } });
  }

  name = `${name.trim()} ${lastName.trim()}`.toLowerCase();
  username = username.trim();
  email = email.trim().toLowerCase();

  // todo: data validation

  const d1 = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (d1) {
    return res.status(400).json({ error: { code: 'username_already_exists', message: 'Nome de usuário já existe' } });
  }

  const d2 = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (d2) {
    return res.status(400).json({ error: { code: 'email_already_exists', message: 'Email já existe' } });
  }

  const doc = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password,
    },
  });

  const session: Session = {
    id: doc.id,
    type: 'user',
    name: doc.name,
    username: doc.username,
    email: doc.email,
    createdAt: doc.createdAt,
  };

  const jwt = encryptJwt(session);

  return res.status(200).json({ error: false, result: { jwt } });
}

export default withMethod(handler, ['POST']);
