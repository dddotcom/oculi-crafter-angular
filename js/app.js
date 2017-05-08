var app = angular.module('OculiCrafterAngular', ['ui.router', 'OculiCrafterControllers'])
.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('craft', {
    url:'/',
    templateUrl:'./views/craft.html',
    controller: 'CraftCtrl'
  })
  .state('inventory', {
    url:'/inventory',
    templateUrl:'./views/inventory.html',
    controller: 'InventoryCtrl'
  });
}]);
