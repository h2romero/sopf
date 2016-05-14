'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location, store, $http) {
    var vm = this;

    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    vm.getMessage = getMessage;
    vm.getSecretMessage = getSecretMessage;
    vm.message;

    vm.profile = store.get('profile');

    function getMessage() {
      $http.get('http://localhost:3000/api/public', {
        skipAuthorization: true
      }).then( function(response) {
        vm.message = response.data.message;
      });
    }

    function getSecretMessage() {
      $http.get('http://localhost:3000/api/private').then(function(response) {
        vm.message = response.data.message;
      })
    }
  });
