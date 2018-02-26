require('@google-cloud/trace-agent').start();

import { deploy } from './deploy';
import { publisher } from 'hnpwa-api';
const ErrorReporting = require('@google-cloud/error-reporting');
const errors = ErrorReporting();
const errorEvent = errors.event();

const runner = publisher({
  interval: '*/20 * * * *',
  dest: 'dist/public/v0',
  cwd: process.cwd(),
  log: console.log
}, async function afterWrite() {
  try {
    await deploy();
    console.log('Deployed to Firebase Hosting!');
  } catch (e) {
    errors.report(e);
  }
});

runner.start();
