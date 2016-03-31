'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionAddCtrl
 * @description
 * # TransactionAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TransactionAddCtrl', function (Transaction, $location) {
    var vm = this;
    vm.transaction = {};
    vm.transaction.dueDate = Date.now();
    vm.saveTransaction = function() {
      Transaction.post(vm.transaction).then(function() {
        $location.path('/transactions');
      });
    }
  });
