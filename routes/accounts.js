'use strict';

module.exports = function() {
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/edx-course-db');

  const Account = mongoose.model('Account', {
    name: String,
    balance: Number
  });

  return {
    getAccounts(req, res, next) {
      Account.find({}, (err, accounts) => {
        if (err) {
          return next(err);
        }
        res.status(200).send({ accounts: accounts });
      });
    },
    addAccount(req, res, next) {
      Account.create({
        name: req.body.name,
        balance: req.body.balance
      }, (err, account) => {
        if (err) {
          return next(err);
        }
        res.status(201).send({ id: account._id });
      });
    },
    updateAccount(req, res, next) {
      Account.findOne({
        _id: req.params.id
      }, (err, account) => {
        if (err) {
          return next(err);
        }
        if (!account) {
          return res.status(400).send();
        }
        account.name = req.body.name;
        account.balance = req.body.balance;
        account.save((err, updatedAccount) => {
          if (err) {
            return next(err);
          }
          res.status(200).send({ account: updatedAccount });
        });
      });
    },
    removeAccount(req, res, next) {
      Account.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
          next(err);
        }
        res.status(204).send();
      });
    }
  };
};