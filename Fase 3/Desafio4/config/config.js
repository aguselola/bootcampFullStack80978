import dotenv from 'dotenv';


dotenv.config();

export default {
  port: process.env.PORT || 3000,
  persistence: process.env.PERSISTENCE || 'filesystem',
};