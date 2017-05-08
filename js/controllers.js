angular.module("OculiCrafterControllers", [])
.controller('CraftCtrl', ['$scope', '$compile', function($scope, $compile){
  $scope.chosenOculi = {
    'oculi-one': '',
    'oculi-two': '',
    'oculi-three': '',
    'result': ''
  };
  $scope.craftMsg = '';

  $scope.selectOculi = function(stoneClass){
    //choose the next oculi
    var parent = $scope.findOpenSlot(stoneClass);
    // parent = angular.element(parent.querySelector('.oculi'));
    parent.removeAttr('class').addClass('oculi').addClass(stoneClass);
  }

  $scope.findOpenSlot = function(stoneClass){
    for(var key in $scope.chosenOculi){
      if(!$scope.chosenOculi[key]){
        console.log('setting ' + stoneClass + ' for ' + key);
        $scope.chosenOculi[key] = stoneClass;
        return angular.element( document.querySelector( '#' + key ) );
      }
    }
    //else if all are full, just change the first one
    $scope.chosenOculi['oculi-one'] = stoneClass;
    return angular.element( document.querySelector( '#oculi-one' ) );
  }

  $scope.craft = function(){
    $scope.craftMsg = '';
    if($scope.chosenOculi['oculi-one'] && $scope.chosenOculi['oculi-two'] && $scope.chosenOculi['oculi-three']){
      console.log("crafting " + $scope.chosenOculi['oculi-one'] + ' ' + $scope.chosenOculi['oculi-two'] + ' ' + $scope.chosenOculi['oculi-three'] );
      $scope.craftMsg = "crafting " + $scope.chosenOculi['oculi-one'] + ' ' + $scope.chosenOculi['oculi-two'] + ' ' + $scope.chosenOculi['oculi-three'];
    } else {
      console.log("choose 3");
      $scope.craftMsg = "choose 3 oculi";
    }
  }

}])
.controller('InventoryCtrl', ['$scope', function($scope){

}]);
