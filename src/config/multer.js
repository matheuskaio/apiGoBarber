import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(15, (err, res) => {
        if (err) return cb(err);
        // O callback => cb(), recebe como primeiro parametro um erro, mas como não
        // desejamos passar o erro e sim retornar o nome gerado aleatorimente,
        // passamos null como primeiro parametro e no segundo parametro passamos o
        // nome da imagem
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
