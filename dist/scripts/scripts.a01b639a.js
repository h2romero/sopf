!function(){"use strict";angular.module("clientApp",["ngRoute","restangular","config"]).config(["$routeProvider","RestangularProvider","ENV",function(a,b,c){b.setBaseUrl("https://cryptic-fortress-59506.herokuapp.com/"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"vm"}).when("/transactions",{templateUrl:"views/transactions.html",controller:"TransactionsCtrl",controllerAs:"vm"}).when("/create/transaction",{templateUrl:"views/transaction-add.html",controller:"TransactionAddCtrl",controllerAs:"vm"}).when("/transaction/:id",{templateUrl:"views/transaction-view.html",controller:"TransactionViewCtrl",controllerAs:"vm"}).when("/transaction/:id/delete",{templateUrl:"views/transaction-delete.html",controller:"TransactionDeleteCtrl",controllerAs:"vm"}).when("/transaction/:id/edit",{templateUrl:"views/transaction-edit.html",controller:"TransactionEditCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}])}(),angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"https://cryptic-fortress-59506.herokuapp.com/"}),angular.module("clientApp").controller("IndexCtrl",["$location",function(a){var b=this;b.isActive=function(b){return b===a.path()}}]),angular.module("clientApp").controller("MainCtrl",["$location",function(a){var b=this;b.isActive=function(b){return b===a.path()}}]),angular.module("clientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("clientApp").controller("TransactionsCtrl",["Transaction",function(a){var b=this;b.transactions=a.getList().$object,b.ViewTransactions=!0}]),function(){"use strict";angular.module("clientApp").factory("TransactionRestangular",["Restangular",function(a){return a.withConfig(function(a){a.setRestangularFields({id:"_id"})})}]).factory("Transaction",["TransactionRestangular",function(a){return a.service("transaction")}])}(),function(){"use strict";angular.module("clientApp").directive("formatDate",function(){return{require:"ngModel",link:function(a,b,c,d){d.$formatters.push(function(a){return a?new Date(a):null})}}})}(),angular.module("clientApp").controller("TransactionAddCtrl",["Transaction","$location",function(a,b){var c=this;c.transaction={},c.transaction.dueDate=Date.now(),c.saveTransaction=function(){a.post(c.transaction).then(function(){b.path("/transactions")})}}]),angular.module("clientApp").controller("TransactionViewCtrl",["$routeParams","Transaction",function(a,b){var c=this;c.viewTransaction=!0,c.transaction=b.one(a.id).get().$object}]),angular.module("clientApp").controller("TransactionDeleteCtrl",["$routeParams","Transaction","$location",function(a,b,c){var d=this;d.transaction=b.one(a.id).get().$object,d.deleteTransaction=function(){d.transaction.remove().then(function(){c.path("/transactions")})},d.back=function(){c.path("/transaction/"+a.id)}}]),angular.module("clientApp").controller("TransactionEditCtrl",["$routeParams","Transaction","$location","$filter","$scope",function(a,b,c,d,e){var f=this;f.transaction={},f.editTransaction=!0,b.one(a.id).get().then(function(b){f.transaction=b,f.saveTransaction=function(){f.transaction.save().then(function(){c.path("/transaction/"+a.id)})}})}]),angular.module("clientApp").run(["$templateCache",function(a){"use strict";a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/transaction-add.html",'<form role="form"> <div class="form-group"> <label for="account" class="control-label">Account</label> <input type="text" ng-model="vm.transaction.account" class="form-control" id="account" placeholder="Enter the account name"> </div> <div class="form-group"> <label for="type" class="control-label">Type</label> <input type="text" ng-model="vm.transaction.type" class="form-control" id="type" placeholder="Enter the account type"> </div> <div class="form-group"> <label for="pay" class="control-label">Pay</label> <input type="text" ng-model="vm.transaction.pay" class="form-control" id="pay" placeholder="Enter the pay amount"> </div> <div class="form-group"> <label for="dueDate" class="control-label">Due Date</label> <input type="date" ng-model="vm.transaction.dueDate" format-date class="form-control" id="dueDate" style="width: auto"> </div> <div class="form-group"> <label for="isPaid" class="control-label">Is Paid</label> <input type="checkbox" ng-model="vm.transaction.isPaid" class="form-control" id="isPaid" placeholder="Enter whether it is paid" style="width: auto"> </div> <input type="submit" class="btn btn-primary" ng-click="vm.saveTransaction()" value="Save"> </form> <br> <a ng-href="/#/transactions">&lt;&lt; Transaction List</a>'),a.put("views/transaction-delete.html",'<form role="form"> <p>Are you sure you wish to delete the transaction for the account {{ vm.account }}?</p> <div class="form-group"> <input type="submit" class="btn btn-danger" ng-click="vm.deleteTransaction()" value="Yes"> <button ng-click="vm.back()" type="button" class="btn btn-default">No</button> </div> </form>'),a.put("views/transaction-edit.html","<ng-include src=\"'views/transaction-nav.html'\"></ng-include> <ng-include src=\"'views/transaction-add.html'\"></ng-include>"),a.put("views/transaction-nav.html",'<ul class="nav nav-tabs"> <li role="presentation" ng-class="{active: vm.viewTransaction}"><a ng-href="/#/transaction/{{ vm.transaction._id }}">View</a></li> <li role="presentation" ng-class="{active: vm.editTransaction}"><a ng-href="/#/transaction/{{ vm.transaction._id }}/edit">Edit</a></li> </ul>'),a.put("views/transaction-view.html",'<ng-include src="\'views/transaction-nav.html\'"></ng-include> <h3><b>Account:</b> {{ vm.transaction.account }}</h3> <p><b>Payment Type:</b> {{vm.transaction.type}}</p> <p><b>Payment Amount:</b> {{vm.transaction.pay | currency}}</p> <p><b>Due Date:</b> {{vm.transaction.dueDate | date:\'M/d/yyyy\'}}</p> <p><b>Paid: <input type="checkbox" ng-model="vm.transaction.isPaid" ng-disabled="true"></b></p> <!--<youtube src="movie.url"></youtube>--> <br> <a ng-href="/#/transactions">&lt;&lt; Transaction List</a>'),a.put("views/transactions.html",'<a class="btn btn-primary" href="/#/create/transaction"><span class="glyphicon glyphicon-plus"></span> Create Transaction</a> <br> <table class="table table-striped"> <thead> <th>Account</th> <th>Type</th> <th>Pay</th> <th>Due Date</th> <th>Is Paid</th> <th>Operations</th> </thead> <tbody> <tr ng-repeat="transaction in vm.transactions"> <td><a ng-href="/#/transaction/{{ transaction._id }}">{{transaction.account}}</a></td> <td>{{transaction.type}}</td> <td>{{transaction.pay | currency}}</td> <td>{{transaction.dueDate | date:\'M/d/yyyy\'}}</td> <td>{{transaction.isPaid}}</td> <!--<td><a ng-href="/#/transaction/{{ transaction._id }}">{{ transaction.title }}</a></td>--> <!--<td>{{ transaction.url }}</td>--> <td> <div class="button-group"> <a ng-href="/#/transaction/{{ transaction._id }}/edit" class="btn btn-default"><span class="glyphicon glyphicon-edit"></span></a> <a ng-href="/#/transaction/{{ transaction._id }}/delete" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span></a> </div> </td> </tr> </tbody> </table>')}]);