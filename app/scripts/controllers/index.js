angular.module('clientApp')
  .controller('IndexCtrl', function ($location) {
    var vm = this;

    vm.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  });
