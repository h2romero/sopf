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
        'config',         // add environment
        'auth0', 'angular-storage', 'angular-jwt', 'ngRoute'  // add auth0
      ])
      .config(function ($routeProvider, RestangularProvider, ENV) {  // add RestangularProvider for REST
                                                                     // add ENV for environment
        //RestangularProvider.setBaseUrl('http://localhost:3000');   // add base url for REST
        RestangularProvider.setBaseUrl(ENV.apiEndpoint);   // add base url for REST
        //RestangularProvider.setBaseUrl('https://cryptic-fortress-59506.herokuapp.com/');

        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            //controllerAs: 'main'
            controllerAs: 'user'
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
          })
      .config(function($provide, authProvider, $httpProvider, jwtInterceptorProvider){  // Auth0
        authProvider.init({
          domain: 'sopf.auth0.com',
          clientID: 'Vd2v0braxVQxH0lASGPNci2LlthA8fgn'
        });
        jwtInterceptorProvider.tokenGetter = function(store) {
          return store.get('id_token');
        }

        // Redirect on Invalid requests
        function redirect($q, $injector, auth, store, $location) {
          return {
            responseError: function(rejection) {
              if (rejection.status === 401) {
                auth.signout();
                store.remove('profile');
                store.remove('id_token');
                $location.path('/about');
              }
              return $q.reject(rejection);
            }
          }
        }

        $provide.factory('redirect', redirect);
        $httpProvider.interceptors.push('redirect');

        $httpProvider.interceptors.push('jwtInterceptor');
      })
    .run(function($rootScope, auth, store, jwtHelper, $location) {    // To keep logged in after refresh if still have valid token
      $rootScope.$on('$locationChangeStart', function() {
        var token = store.get('id_token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          }
        } else {
          $location.path('/');
        }
      })
    });
}());
