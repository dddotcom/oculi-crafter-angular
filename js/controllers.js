angular.module("OculiCrafterControllers", ['OculiCrafterServices'])
.controller('CraftCtrl', ['$scope', '$compile', 'Recipes', 'Stats', function($scope, $compile, Recipes, Stats){
  $scope.chosenOculi = {
    'oculi-one': '',
    'oculi-two': '',
    'oculi-three': '',
  };
  $scope.resultOculi = '';
  $scope.craftMsg = '';
  // $scope.stats = Stats.getStats();
  $scope.statsService = Stats;

  //dynamic crafting
  $scope.$watchCollection('chosenOculi', function(newVal, oldVal){
    if(newVal !== oldVal){
      console.log("crafting");
      $scope.craft();
    }
  });

  $scope.removeOculi = function(key){
    $scope.chosenOculi[key] = '';
    $scope.craft();
  }

  $scope.selectOculi = function(stoneClass){
    //choose the next oculi
    var parent = $scope.findOpenSlot(stoneClass);
    parent.removeAttr('class').addClass('oculi').addClass(stoneClass);
  }

  $scope.findOpenSlot = function(stoneClass){
    for(var key in $scope.chosenOculi){
      if(!$scope.chosenOculi[key]){
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
    var r = Recipes.getResult(Object.values($scope.chosenOculi));
    console.log("crafted:", r);
    if (r){
      $scope.craftMsg = "You crafted " + r + "!" + "\r\n" + Stats.getStoneStats(r);
      $scope.resultOculi = r;
      var resultElement = angular.element( document.querySelector( '#result') );
      resultElement.removeAttr('class').addClass('oculi').addClass(r);
    } else {
      $scope.resultOculi = null;
      $scope.craftMsg = "Couldn't craft anything :(";
    }
  }

  $scope.reset = function(){
    $scope.chosenOculi = {
      'oculi-one': '',
      'oculi-two': '',
      'oculi-three': '',
    };
    $scope.resultOculi = null;
    $scope.craftMsg = '';
  }

}])
.controller('InventoryCtrl', ['$scope', function($scope){
  $scope.stash = {
    'sapphire': 0,
    'ruby': 0,
    'emerald': 0,
    'tourmaline': 0,
    'amethyst': 0,
    'citrine': 0,
    'diamond': 0,
    'onyx': 0,
    'spinel': 0
  }

  $scope.stashForm = {
    'sapphire': 0,
    'ruby': 0,
    'emerald': 0,
    'tourmaline': 0,
    'amethyst': 0,
    'citrine': 0,
    'diamond': 0,
    'onyx': 0,
    'spinel': 0
  };

  $scope.addOculi = function(oculi){
    $scope.stash[oculi]++;
  }

  $scope.bulkAddOculi = function(){
    for(stone in $scope.stashForm){
      $scope.stash[stone] += $scope.stashForm[stone];
    }
  }

  $scope.resetStash = function(){
    Object.keys($scope.stash).forEach(v => $scope.stash[v] = 0);
    Object.keys($scope.stashForm).forEach(v => $scope.stashForm[v] = 0);
  }
}]);
