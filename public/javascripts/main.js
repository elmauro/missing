(function () {
  angular.module('UIApp', ['ui.router'])
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$qProvider',
      function($stateProvider, $urlRouterProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/home');

        $stateProvider

          // HOME STATES AND NESTED VIEWS ========================================
          .state('home', {
            url: '/home',
            templateUrl: 'partials/partial-home.html',
            controller: 'MainController',
            params: { reload: true },
          });
      }
    ]);
}());
