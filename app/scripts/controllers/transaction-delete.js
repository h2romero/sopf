'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionDeleteCtrl
 * @description
 * # TransactionDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TransactionDeleteCtrl', function ($routeParams, Transaction, $location) {
    var vm = this;
    vm.transaction = Transaction.one($routeParams.id).get().$object;
    vm.deleteTransaction = function() {
      vm.transaction.remove().then(function() {
        $location.path('/transactions');
      });
    };
    vm.back = function() {
      $location.path('/transaction/' + $routeParams.id);
    }
  });
