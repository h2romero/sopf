'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($location) {
    var vm = this;

    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
