angular.module('OculiCrafterServices', [])
.factory('Recipes', function(){
  const recipes = {
    'tourmaline': ['sapphire', 'emerald', 'blank'],
    'amethyst': ['sapphire', 'ruby', 'blank'],
    'citrine': ['ruby', 'emerald', 'blank'],
    'diamond': ['sapphire', 'ruby', 'emerald'],
    'onyx': ['tourmaline', 'amethyst', 'citrine'],
    'spinel': ['diamond', 'onyx', 'blank'],
    'princess-stone': ['diamond', 'onyx', 'spinel']
  };

  return {
    getResult: function(chosenOculiValues){
      let temp = chosenOculiValues.map(function(oculi){
        if(oculi.stone === ''){
          return Object.assign({}, oculi, {stone : "blank"});
        }
        return oculi;
      });

      for(var key in recipes){
        let arr = recipes[key].slice();
        if(arr.includes(temp[0].stone)){
          var index = arr.indexOf(temp[0].stone);
          arr.splice(index, 1);
          if(arr.includes(temp[1].stone)){
            index = arr.indexOf(temp[1].stone);
            arr.splice(index, 1);
            if(arr.includes(temp[2].stone)){
              return key;
            }
          }
        }
      }
      return '';
    }
  }
})
.factory('Stats', function(){
  const stats = {
    'sapphire': { attack: {
      rough: 'Water',
      tumbled: '+8% Dmg', //plus Water
      faceted: '+12%Dmg',
      brilliant: '+16%Dmg'
    }, defense: {
      rough: 'Water Resistance +8%',
      tumbled: 'Water Resistance +14%',
      faceted: 'Water Resistance +18%',
      brilliant: 'Water Resistance +24%'
    }, timeline: {
      rough: '+5% chance evade attack while casting',
      tumbled: '+10% chance evade attack while casting',
      faceted: '+15% chance evade attack while casting',
      brilliant: '+20% chance evade attack while casting'
    } },
    'ruby': { attack: {
      rough: 'Fire',
      tumbled: '+8% Dmg', //plus Water
      faceted: '+12%Dmg',
      brilliant: '+16%Dmg'
    }, defense: {
      rough: 'Fire Resistance +8%',
      tumbled: 'Fire Resistance +14%',
      faceted: 'Fire Resistance +18%',
      brilliant: 'Fire Resistance +24%'
    }, timeline: {
      rough: '+4% HP',
      tumbled: '+8% HP',
      faceted: '+12% HP',
      brilliant: '+16% HP'
    } },
    'emerald': { attack: {
      rough: 'Lightning',
      tumbled: '+8% Dmg', //plus Water
      faceted: '+12%Dmg',
      brilliant: '+16%Dmg'
    }, defense: {
      rough: 'Earth Resistance +8%',
      tumbled: 'Earth Resistance +14%',
      faceted: 'Earth Resistance +18%',
      brilliant: 'Earth Resistance +24%'
    }, timeline: {
      rough: '+2 Max MP',
      tumbled: '+4 Max MP',
      faceted: '+6 Max MP',
      brilliant: '+8 Max MP'
    } },
    'tourmaline': { attack: {
      rough: 'Paralyze Chance',
      tumbled: '10% for 3 sec', //what does this mean?
      faceted: '15% for 6 sec',
      brilliant: '20% for 9 sec'
    }, defense: {
      rough: 'Magic Damage Resistance +5%',
      tumbled: 'Magic Damage Resistance +10%',
      faceted: 'Magic Damage Resistance +15%',
      brilliant: 'Magic Damage Resistance +20%'
    }, timeline: {
      rough: '+2 Magic',
      tumbled: '+4 Magic',
      faceted: '+6 Magic',
      brilliant: '+8 Magic'
    } },
    'amethyst': { attack: {
      rough: '+20% Dmg when HP < 20%',
      tumbled: '+30% Dmg when HP < 20%',
      faceted: '+40% Dmg when HP < 20%',
      brilliant: '+50% Dmg when HP < 20%'
    }, defense: {
      rough: 'Physical Damage Resistance +5%',
      tumbled: 'Physical Damage Resistance +10%',
      faceted: 'Physical Damage Resistance +15%',
      brilliant: 'Physical Damage Resistance +20%'
    }, timeline: {
      rough: '+20% Magic Dmg when HP < 20%',
      tumbled: '+30% Magic Dmg when HP < 20%',
      faceted: '+40% Magic Dmg when HP < 20%',
      brilliant: '+50% Magic Dmg when HP < 20%'
    } },
    'citrine': { attack: {
      rough: 'Light',
      tumbled: '+8% Dmg', //plus Water
      faceted: '+12%Dmg',
      brilliant: '+16%Dmg'
    }, defense: {
      rough: 'Dodge chance when defending 5&1', //what does this mean?
      tumbled: 'Dodge chance when defending 10&1',
      faceted: 'Dodge chance when defending 15&1',
      brilliant: 'Dodge chance when defending 20&1'
    }, timeline: {
      rough: 'Increases interrupt effect +5%',
      tumbled: 'Increases interrupt effect +10%',
      faceted: 'Increases interrupt effect +15%',
      brilliant: 'Increases interrupt effect +20%'
    } },
    'diamond': { attack: {
      rough: 'Speed Increase',
      tumbled: '2x Speed',
      faceted: '3x Speed',
      brilliant: '4x Speed'
    }, defense: {
      rough: '+5% Exp. Points',
      tumbled: '+10% Exp. Points',
      faceted: '+15% Exp. Points',
      brilliant: '+20% Exp. Points'
    }, timeline: {
      rough: 'Casting speed +3%',
      tumbled: 'Casting speed +6%',
      faceted: 'Casting speed +9%',
      brilliant: 'Casting speed +12%'
    } },
    'onyx': { attack: {
      rough: '+10% Magic Dmg',
      tumbled: '+15% Magic Dmg',
      faceted: '+20% Magic Dmg',
      brilliant: '+25% Magic Dmg'
    }, defense: {
      rough: 'All Dmg Resistance +20% when HP < 20%',
      tumbled: 'All Dmg Resistance +30% when HP < 20%',
      faceted: 'All Dmg Resistance +40% when HP < 20%',
      brilliant: 'All Dmg Resistance +50% when HP < 20%'
    }, timeline: {
      rough: '+20% Dodge Chance when casting when HP < 20%',
      tumbled: '+30% Dodge Chance when casting when HP < 20%',
      faceted: '+40% Dodge Chance when casting when HP < 20%',
      brilliant: '+50% Dodge Chance when casting when HP < 20%'
    } },
    'spinel': { attack: {
      rough: '+15% Dmg',
      tumbled: '+20% Dmg',
      faceted: '+25% Dmg',
      brilliant: '+30% Dmg'
    }, defense: {
      rough: '+10% Speed after interruption for 1 turn',
      tumbled: '+20% Speed after interruption for 1 turn',
      faceted: '+30% Speed after interruption for 1 turn',
      brilliant: '+40% Speed after interruption for 1 turn'
    }, timeline: {
      rough: 'Begin turn 5% forward on timeline',
      tumbled: 'Begin turn 10% forward on timeline',
      faceted: 'Begin turn 20% forward on timeline',
      brilliant: 'Begin turn 30% forward on timeline'
    } },
    'princess-stone': { attack: {
      rough: 'N/A',
      tumbled: 'N/A',
      faceted: 'N/A',
      brilliant: '+40% Physical Damage'
    }, defense: {
      rough: 'N/A',
      tumbled: 'N/A',
      faceted: 'N/A',
      brilliant:'Physical and Magical Resistance + 25%'
    }, timeline: {
      rough: 'N/A',
      tumbled: 'N/A',
      faceted: 'N/A',
      brilliant: '+35% Magic Damage'
    } }
  }

  return {
    getAllStats: function(){
      return stats;
    },
    getStoneStats: function(stone){
      var attack = stats[stone].attack.rough;
      var defense = stats[stone].defense.rough;
      var timeline = stats[stone].timeline.rough;
      return "Attack: " + attack + "\r\nDefense: " + defense + "\n" + "Timeline: " + timeline;
    }
  }
})
.factory('Facets', function(){

  const facetMap = {
    rough: {
      tumbled: 3,
      faceted: 9,
      brilliant: 27
    },
    tumbled: {
      tumbled: undefined,
      faceted: 3,
      brilliant: 9
    },
    faceted: {
      tumbled: undefined,
      faceted: undefined,
      brilliant: 3
    }
  };

  return {
    getFacetTypes: function(){
      return ['rough', 'tumbled', 'faceted', 'brilliant'];
    },
    convertFromTo: function(fromFacet, toFacet, numOculi){
      let results = {
        rough: 0,
        tumbled: 0,
        faceted: 0,
        brilliant: 0
      }

      results[toFacet] = facetMap[fromFacet][toFacet] ? Math.floor(numOculi/facetMap[fromFacet][toFacet]) : 0;
      results.rough = numOculi%facetMap[fromFacet][toFacet];
      return results;
    }
  }
})
