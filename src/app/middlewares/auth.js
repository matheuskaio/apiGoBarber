import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // formato do token => Bearer fjajfafjiaosfjaojfoafjfjasofjajfasjfjaofa
  // a linha abaixo separa o Bearer do token e o pega
  // Assim usa a desestruturação onde será trasnformado em um array no formato
  // mostrado a baixo
  // Assim usa a desestruturação [Bearer, token]
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
