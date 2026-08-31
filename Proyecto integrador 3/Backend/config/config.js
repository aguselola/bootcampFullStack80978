import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  modoPersistencia: process.env.MODO_PERSISTENCIA || 'MONGODB',
  strCnx: process.env.STRCNX,
  base: process.env.BASE || 'ecommerce',
  mpAccessToken: process.env.MP_ACCESS_TOKEN || '',
};