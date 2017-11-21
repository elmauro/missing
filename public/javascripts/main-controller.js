// Load controller
angular.module('UIApp')

  .controller('MainController', [
    '$scope',
    function ($scope) {
      logic.scope = $scope;

      $scope.initValues = function(){
        $scope.N = 0;
        $scope.M = 0;
        $scope.LA = '';
        $scope.LB = '';
        $scope.show = false;
      };

      $scope.search = function(){
        let n = $scope.N;
        let A = $scope.LA.split(' ').map(i => parseInt(i));
        let m = $scope.M;
        let B = $scope.LB.split(' ').map(i => parseInt(i));

        logic.search(n, A, m, B);
      };

      $scope.initValues();
    }
  ]);
