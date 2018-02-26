var client = require('firebase-tools');

export async function deploy() {
  try {
    return await client.deploy({
      project: 'hnpwa-coffee',
      token: process.env.TOKEN,
      cwd: process.cwd()
    });
  } catch (e) {
    throw e;
  }
}
