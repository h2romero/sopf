(function(){
  'use strict';
  angular.module('clientApp')
    .factory('TransactionRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
    .factory('Transaction', function(TransactionRestangular){
    return TransactionRestangular.service('transaction');
  });
}());
