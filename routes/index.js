'use strict';

module.exports = function(app) {
  const accounts = require('./accounts')();

  app.get('/accounts', accounts.getAccounts);
  app.post('/accounts', accounts.addAccount);
  app.put('/accounts/:id', accounts.updateAccount);
  app.delete('/accounts/:id', accounts.removeAccount);

  return app;
};