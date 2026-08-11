import config from '../config/config.js';
import { FilesystemDAO } from './filesystem.js';
import { mongoDBDAO } from './mongodb.js';

let dao;

if (config.persistence === 'mongodb') {
  dao = new mongoDBDAO();
} else {
  dao = new FilesystemDAO();
}

export default dao;