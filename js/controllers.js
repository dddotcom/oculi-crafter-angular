angular.module("OculiCrafterControllers", ['OculiCrafterServices'])
.controller('CraftCtrl', ['$scope', '$compile', 'Recipes', 'Stats', 'Facets', '$sce', function($scope, $compile, Recipes, Stats, Facets, $sce){
  $scope.chosenOculi = {
    'oculi-one': {stone: '', facetType: ''},
    'oculi-two': {stone: '', facetType: ''},
    'oculi-three': {stone: '', facetType: ''}
  };
  $scope.resultOculi = {stone: '', facetType: ''};
  $scope.craftMsg = '';
  $scope.statsService = Stats;
  $scope.oculiArray = Object.keys($scope.statsService.getAllStats());
  $scope.facetTypes = Facets.getFacetTypes();

  //dynamic crafting
  $scope.$watch(function(){return JSON.stringify($scope.chosenOculi)}, function(newVal, oldVal){
    if(newVal !== oldVal){
      $scope.craft();
    }
  });

  $scope.removeOculi = function(key){
    $scope.chosenOculi[key].stone = '';
    $scope.chosenOculi[key].facetType = '';
    //remove svg element
    var parent = angular.element( document.querySelector( '#' + key ) );
    parent.children().remove();
  }

  $scope.selectOculi = function(stoneClass, facetType){
    //choose the next oculi
    var parent = $scope.findOpenSlot(stoneClass, facetType);
    $scope.addSvgElement(facetType, stoneClass, parent);
  }

  $scope.findOpenSlot = function(stoneClass, facetType){
    for(var key in $scope.chosenOculi){
      if(!$scope.chosenOculi[key].stone){
        $scope.chosenOculi[key].stone = stoneClass;
        $scope.chosenOculi[key].facetType = facetType;
        return angular.element( document.querySelector( '#' + key ) );
      }
    }
    //else if all are full, just change the first one
    $scope.chosenOculi['oculi-one'].stone = stoneClass;
    $scope.chosenOculi['oculi-one'].facetType = facetType;
    return angular.element( document.querySelector( '#oculi-one' ) );
  }

  $scope.craft = function(){
    $scope.craftMsg = '';
    var resultElement = angular.element( document.querySelector( '#result') );
    var r = Recipes.getResult(Object.values($scope.chosenOculi));
    if (r){
      $scope.craftMsg = $sce.trustAsHtml("<h4>You crafted " + r.facetType + " " + r.stone + "!" + "</h4><br>" + Stats.getStoneStats(r.stone, r.facetType));
      $scope.resultOculi = r;
      $scope.addSvgElement(r.facetType, r.stone, resultElement);
    } else {
      $scope.resultOculi = {stone: '', facetType: ''};
      $scope.craftMsg = "Couldn't craft anything :(";
      resultElement.children().remove();
    }
  }

  $scope.addSvgElement = function(facetType, stone, parentElement){
    parentElement.children().remove();
    var svgElem = angular.element('<svg-icon facet="'+facetType+'" stone="'+ stone+'"></svg-icon>');
    parentElement.append(svgElem);
    $compile(svgElem)($scope);
  }

  $scope.reset = function(){
    $scope.chosenOculi = {
      'oculi-one': {stone: '', facetType: ''},
      'oculi-two': {stone: '', facetType: ''},
      'oculi-three': {stone: '', facetType: ''}
    };
    $scope.resultOculi = {stone: '', facetType: ''};
    $scope.craftMsg = '';
    for(let key in $scope.chosenOculi){
      let parent = angular.element( document.querySelector( '#' + key ) );
      parent.children().remove();
    }
  }

}])
.controller('InventoryCtrl', ['$scope', 'Facets', function($scope, Facets){

  $scope.isOptimized = false;

  $scope.stash = {
    'sapphire': {'rough': 10, 'tumbled': 7, 'faceted': 10, 'brilliant': 10},
    'ruby': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'emerald': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'tourmaline': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'amethyst': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'citrine': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'diamond': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'onyx': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0},
    'spinel': {'rough': 100, 'tumbled': 0, 'faceted': 0, 'brilliant': 0}
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

  $scope.addOculi = function(oculi, facet){
    $scope.stash[oculi][facet]++;
  }

  $scope.removeOculi = function(oculi, facet){
    if($scope.stash[oculi][facet] > 0){
      $scope.stash[oculi][facet]--;
    }
  }

  $scope.resetOculi = function(oculi, facet){
    $scope.stash[oculi][facet] = 0;
  }

  $scope.bulkAddOculi = function(){
    for(stone in $scope.stashForm){
      $scope.stash[stone] += $scope.stashForm[stone];
    }
  }

  $scope.updateStashWithResults = function(){
    //don't let user reset from here if they haven't crafted anything new
    if($scope.isOptimized){
      for(let stone in $scope.results){
        for(let facet in $scope.results[stone]){
            $scope.stash[stone][facet] = $scope.results[stone][facet];
        }
      }
      $scope.resetStash($scope.results);
      $scope.isOptimized = false;
    }
  }

  $scope.resetStash = function(stash){
    Object.keys(stash).forEach(v => stash[v] = {'rough': 0, 'tumbled': 0, 'faceted': 0, 'brilliant': 0});
    // Object.keys($scope.stashForm).forEach(v => $scope.stashForm[v] = 0);
  }

  $scope.selectDropdown = function(type, option){
    if(type === 'facet'){
      //hardcode rough to others
      for(oculiKey in $scope.results){
        let r = Facets.convertFromTo('rough', option, $scope.stash[oculiKey]);
        for(key in r){
          $scope.results[oculiKey][key] = r[key];
        }
        $scope.isOptimized = true;
      }
    }
  }
}])
