'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionViewCtrl
 * @description
 * # TransactionViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TransactionViewCtrl', function ($routeParams, Transaction) {
    var vm = this;
    vm.viewTransaction = true;
    vm.transaction = Transaction.one($routeParams.id).get().$object;
  });
