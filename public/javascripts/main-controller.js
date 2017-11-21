// Load controller
angular.module('UIApp')

  .controller('MainController', [
    '$scope',
    function ($scope) {
      logic.scope = $scope;

      $scope.initValues = () => {
        $scope.N = 0;
        $scope.M = 0;
        $scope.LA = '';
        $scope.LB = '';
        $scope.show = false;
      };

      $scope.search = () => {
        const n = $scope.N;
        const A = $scope.LA.split(' ').map(i => parseInt(i, 10));
        const m = $scope.M;
        const B = $scope.LB.split(' ').map(i => parseInt(i, 10));

        logic.search(n, A, m, B);
      };

      $scope.initValues();
    }
  ]);
