const hnapi = require('hnpwa-api');

exports.api0 = hnapi.trigger({
   useCors: true,
   routerPath: '/api/v0'
});
