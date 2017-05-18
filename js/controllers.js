angular.module("OculiCrafterControllers", ['OculiCrafterServices'])
.controller('CraftCtrl', ['$scope', '$compile', 'Recipes', 'Stats', function($scope, $compile, Recipes, Stats){
  $scope.chosenOculi = {
    'oculi-one': '',
    'oculi-two': '',
    'oculi-three': '',
  };
  $scope.resultOculi = '';
  $scope.craftMsg = '';
  $scope.statsService = Stats;
  $scope.oculiArray = Object.keys($scope.statsService.getAllStats());

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

  $scope.results = {
    'sapphire': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'ruby': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'emerald': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'tourmaline': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'amethyst': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'citrine': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'diamond': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'onyx': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'spinel': {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0}
  }

  $scope.addOculi = function(oculi){
    $scope.stash[oculi]++;
  }

  $scope.removeOculi = function(oculi){
    if($scope.stash[oculi] > 0){
      $scope.stash[oculi]--;
    }
  }

  $scope.resetOculi = function(oculi){
    $scope.stash[oculi] = 0;
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

  $scope.selectDropdown = function(selection){
    console.log(selection);
  }
}]);
