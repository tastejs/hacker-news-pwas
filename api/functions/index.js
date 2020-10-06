const hnapi = require('hnpwa-api');

exports.api0 = hnapi.trigger({
   useCors: true,
   routerPath: '/v0',
   cdnCacheExpiry: 1200,
   browserCacheExpiry: 300,
   staleWhileRevalidate: 86400,
   runWith: {
      memory: '1GB',
      timeoutSeconds: 30
   }
});
