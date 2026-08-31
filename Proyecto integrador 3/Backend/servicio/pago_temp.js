import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../config/config.js';

const client = new MercadoPagoConfig({ accessToken: config.mpAccessToken });
export const preference = new Preference(client);