import * as hnpwa from 'hnpwa-api';

export const startServer = (port = 3002, startMessage = 'Listening...') => {
  hnpwa.app('blah').listen(port, () => console.log(startMessage));
};
