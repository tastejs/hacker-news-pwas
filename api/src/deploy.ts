var client = require('firebase-tools');

export async function deploy() {
  try {
    return await client.deploy({
      project: 'hnpwa-coffee',
      token: '1/M_Kklp6W2GrmMw8BuIKj6WwqsXGnhMhobUFXo1vJyjw',
      cwd: process.cwd()
    });
  } catch (e) {
    throw e;
  }
}
