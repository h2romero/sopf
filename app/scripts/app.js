(function () {
  'use strict';

  /**
     * @ngdoc overview
     * @name clientApp
     * @description
     * # clientApp
     *
     * Main module of the application.
     */
    var app = angular.module('clientApp', [
        'ngRoute',
        'restangular',   // add restangular for REST. Also did
        'config'         // add environment
      ])
      .config(function ($routeProvider, RestangularProvider, ENV) {  // add RestangularProvider for REST
                                                                     // add ENV for environment
        //RestangularProvider.setBaseUrl('http://localhost:3000');   // add base url for REST
        RestangularProvider.setBaseUrl(ENV.apiEndpoint);   // add base url for REST

        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            //controllerAs: 'main'
            controllerAs: 'vm'
          })
          .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            //controllerAs: 'about'
            controllerAs: 'vm'
          })
                  .when('/transactions', {
                    templateUrl: 'views/transactions.html',
                    controller: 'TransactionsCtrl',
                      //controllerAs: 'transactions'
                      controllerAs: 'vm'
                  })
                  .when('/create/transaction', {
                    templateUrl: 'views/transaction-add.html',
                    controller: 'TransactionAddCtrl',
                    //controllerAs: 'transactionAdd'
                    controllerAs: 'vm'
                  })
                  .when('/transaction/:id', {
                    templateUrl: 'views/transaction-view.html',
                    controller: 'TransactionViewCtrl',
                    //controllerAs: 'transactionView'
                    controllerAs: 'vm'
                  })
                  .when('/transaction/:id/delete', {
                    templateUrl: 'views/transaction-delete.html',
                    controller: 'TransactionDeleteCtrl',
                    //controllerAs: 'transactionDelete'
                    controllerAs: 'vm'
                  })
                  .when('/transaction/:id/edit', {
                    templateUrl: 'views/transaction-edit.html',
                    controller: 'TransactionEditCtrl',
                    //controllerAs: 'transactionEdit'
                    controllerAs: 'vm'
                  })
                  .otherwise({
                      redirectTo: '/'
                  });
          });
}());
