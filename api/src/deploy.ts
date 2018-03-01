const client = require('firebase-tools');

export async function deploy(token: string) {
  try {
    return await client.deploy({
      project: 'hnpwa-coffee',
      token,
      cwd: process.cwd()
    });
  } catch (e) {
    throw e;
  }
}
