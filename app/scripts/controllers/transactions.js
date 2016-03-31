'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionsCtrl
 * @description
 * # TransactionsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TransactionsCtrl', function (Transaction) {  // add Transaction for REST
    var vm = this;

    vm.transactions = Transaction.getList().$object;
    vm.ViewTransactions = true;
    //this.transactions = [
    //  {
    //    account: 'Birdman',
    //    type: 'http://google.com',
    //    pay: 23.54,
    //    dueDate: '3/5/2016',
    //    isPaid: false
    //  },
    //  {
    //    account: 'Jaguar',
    //    type: 'http://jaguar.com',
    //    pay: 15.25,
    //    dueDate: '3/8/2016',
    //    isPaid: false
    //  }
    //];
  });
