'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionEditCtrl
 * @description
 * # TransactionEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TransactionEditCtrl', function ($routeParams, Transaction, $location, $filter, $scope) {
    var vm = this;
    vm.transaction = {};
    vm.editTransaction = true;
    Transaction.one($routeParams.id).get().then(function(transaction) {
      vm.transaction = transaction;
      vm.saveTransaction = function () {
        vm.transaction.save().then(function() {
          $location.path('/transaction/' + $routeParams.id);
        })
      }

    });
    //$scope.$watch('vm.transaction.dueDate', function(newValue, oldValue) {
    //  if (newValue != null && oldValue == null)
    //    vm.transaction.dueDate = new Date($filter('date')(vm.transaction.dueDate, 'yyyy-MM-dd'));
    //vm.transaction.dueDate = new Date(vm.transaction.dueDate);
  //    console.log(newValue);
  //  });
  });
