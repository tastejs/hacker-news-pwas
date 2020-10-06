import { deploy } from './deploy';
import { publisher } from 'hnpwa-api';

const env = require('../env.json');

const runner = publisher({
  interval: '*/20 * * * *',
  dest: 'dist/public/v0',
  cwd: process.cwd(),
  log: console.log
}, async function afterWrite() {
  try {
    const token = env.TOKEN;
    if(typeof token === undefined || typeof token === null) { 
      throw new Error('No token provided for Firebase Hosting deployment');
    }
    await deploy(token);
    console.log('Deployed to Firebase Hosting!');
  } catch (e) {
    console.error(e);
  }
});

runner.start();
