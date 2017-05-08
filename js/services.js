angular.module('OculiCrafterServices', [])
.factory('Recipes', function(){
  var recipes = {
    'sapphire': [],
    'ruby': [],
    'emerald': [],
    'tourmaline': ['sapphire', 'emerald'],
    'amethyst': ['sapphire', 'ruby'],
    'citrine': ['ruby', 'emerald'],
    'diamond': ['sapphire', 'ruby', 'emerald'],
    'onyx': ['tourmaline', 'amethyst', 'citrine'],
    'spinel': ['diamond', 'onyx'],
    'princess-stone': ['diamond', 'onyx', 'spinel']
  }

  return {
    getResult: function(chosenOculiValues){
      chosenOculiValues = chosenOculiValues.filter(function(n){ return n !== '' });
      for(var key in recipes){
        if(chosenOculiValues.length === 3){
          if(recipes[key].includes(chosenOculiValues[0]) && recipes[key].includes(chosenOculiValues[1]) && recipes[key].includes(chosenOculiValues[2])){
            return key;
          }
        }
        else if (chosenOculiValues.length === 2){
          console.log("crafting with two!");
          if(recipes[key].includes(chosenOculiValues[0]) && recipes[key].includes(chosenOculiValues[1])){
            return key;
          }
        }
        else {
          return '';
        }
      }
    }
  }
});
