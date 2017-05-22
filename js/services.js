angular.module('OculiCrafterServices', [])
.factory('Recipes', ["Facets",function(Facets){
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
      let facetsMatch = true;
      let temp = chosenOculiValues.map(function(oculi){
        if(oculi.stone === ''){
          return Object.assign({}, oculi, {stone : "blank"});
        }
        return oculi;
      });
      let f = temp[0].facetType;

      // if they are all the same, go up a level
      if( temp[0].stone !== 'blank' && (temp[0].stone === temp[1].stone && temp[0].stone === temp[2].stone) ){
        return Facets.getNextFacet(f) ? {stone: temp[0].stone, facetType: Facets.getNextFacet(f)} : null;
      }

      for(var key in recipes){
        let arr = recipes[key].slice();

        if(arr.includes(temp[0].stone)){
          let tempFacet = temp[0].facetType;
          var index = arr.indexOf(temp[0].stone);
          arr.splice(index, 1);
          if(arr.includes(temp[1].stone) && (temp[1].facetType === "" || temp[1].facetType === tempFacet) ){
            index = arr.indexOf(temp[1].stone);
            arr.splice(index, 1);
            if(arr.includes(temp[2].stone) && (temp[2].facetType === "" || temp[2].facetType === tempFacet)){
              //princess stone logic
              return (key === "princess-stone" && f !== "brilliant") ? null : {stone: key, facetType: f};
            }
          }
        }
      }
      return null;
    }
  }
}])
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
    getStoneStats: function(stone, facetType){
      var attack = stats[stone].attack[facetType];
      var defense = stats[stone].defense[facetType];
      var timeline = stats[stone].timeline[facetType];
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
    },
    getNextFacet: function(currentFacet){
      let order = this.getFacetTypes();
      let currentIndex = order.indexOf(currentFacet);
      if(currentIndex === order.length-1){
        return '';
      }
      return order[currentIndex + 1];
    }
  }
})
.directive('svgIcon', ["$compile", function($compile) {
    function link(scope, element, attrs) {
      function path(facet, stone) {
        if(facet === "rough"){
          return '<svg version="1.1" class="oculi ' + stone + '" viewBox="0.0 0.0 462.9448818897638 533.6036745406824" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="p.0"><path d="m0 0l462.9449 0l0 533.6037l-462.9449 0l0 -533.6037z" clip-rule="nonzero"></path></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l462.9449 0l0 533.6037l-462.9449 0z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m358.1706 0l-325.2782 103.5538l-31.67454 277.76642l120.608925 151.06558l272.89236 -79.18634l67.00525 -214.41731z" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m358.1706 0l-325.2782 103.5538l-31.67454 277.76642l120.608925 151.06558l272.89236 -79.18634l67.00525 -214.41731z" fill-rule="evenodd"></path><path fill="#cfe2f3" d="m356.95276 1.2204725l-143.7559 300.9134" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m356.95276 1.2204725l-143.7559 300.9134" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m0 380.10236l214.4147 -79.188965l-90.15224 229.03674" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m0 380.10236l214.4147 -79.188965l-90.15224 229.03674" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m147.40945 196.14174l-49.94751 59.695526" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m147.40945 196.14174l-49.94751 59.695526" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m345.9895 155.93964l34.11023 75.53281" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m345.9895 155.93964l34.11023 75.53281" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m314.31235 422.74277l-63.34909 23.147003" fill-rule="evenodd"></path><path stroke="#efefef" stroke-width="3.0" stroke-linejoin="round" stroke-linecap="butt" d="m314.31235 422.74277l-63.34909 23.147003" fill-rule="evenodd"></path></g></svg>'
        } else if (facet === "tumbled"){
          return '<svg version="1.1" class="oculi '+stone+'" viewBox="0.0 0.0 462.9448818897638 533.6036745406824" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="p.0"><path d="m0 0l462.9449 0l0 533.6037l-462.9449 0l0 -533.6037z" clip-rule="nonzero"></path></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l462.9449 0l0 533.6037l-462.9449 0z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m245.43979 0.0065459316l162.03363 85.67427l6.5209656 282.16055l-149.92996 165.75806l-215.11353 -237.46255z" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m245.43979 0.0065459316l162.03363 85.67427l6.5209656 282.16055l-149.92996 165.75806l-215.11353 -237.46255z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m246.37558 0.0052425195l-20.488129 271.9204l37.249237 260.742" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m246.37558 0.0052425195l-20.488129 271.9204l37.249237 260.742" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m225.88745 270.99414l178.79733 -184.38263" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m225.88745 270.99414l178.79733 -184.38263" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m227.75099 270.99744l183.4522 96.84747" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m227.75099 270.99744l183.4522 96.84747" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m226.81783 269.1365l-175.07294 27.003876" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m226.81783 269.1365l-175.07294 27.003876" fill-rule="evenodd"></path></g></svg>'
        } else if(facet === "faceted") {
          return '<svg version="1.1" class="oculi '+stone+'" viewBox="0.0 0.0 462.9448818897638 533.6036745406824" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="p.0"><path d="m0 0l462.9449 0l0 533.6037l-462.9449 0l0 -533.6037z" clip-rule="nonzero"></path></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l462.9449 0l0 533.6037l-462.9449 0z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m337.38046 9.120735l-279.77213 105.47146l-58.837986 132.11383l145.43358 275.3284l317.51813 -200.94592z" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m337.38046 9.120735l-279.77213 105.47146l-58.837986 132.11383l145.43358 275.3284l317.51813 -200.94592z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m278.346 117.90026l-176.24783 58.749275l-5.5417404 92.00543l95.32875 129.68979l186.22353 -104.196655z" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m278.346 117.90026l-176.24783 58.749275l-5.5417404 92.00543l95.32875 129.68979l186.22353 -104.196655z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m278.4908 118.91863l59.96588 -109.77165" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m278.4908 118.91863l59.96588 -109.77165" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m101.637794 178.88452l-41.671917 -65.04987" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m101.637794 178.88452l-41.671917 -65.04987" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m96.55643 267.30972l-94.52493 -20.328094" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m96.55643 267.30972l-94.52493 -20.328094" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m193.11285 397.40683l-47.769028 123.99997" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m193.11285 397.40683l-47.769028 123.99997" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m379.11285 294.7533l84.35959 25.409424" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m379.11285 294.7533l84.35959 25.409424" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m131.11285 201.2441l25.412079 56.918625" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m131.11285 201.2441l25.412079 56.918625" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m222.58792 93.50656l-40.653534 8.131233l-31.509186 19.31234" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m222.58792 93.50656l-40.653534 8.131233l-31.509186 19.31234" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m108.75328 342.5223l34.556427 57.934387" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m108.75328 342.5223l34.556427 57.934387" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m388.25986 327.27823l-38.62207 35.572174" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m388.25986 327.27823l-38.62207 35.572174" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m214.4567 448.22833l-13.212601 7.1128845" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m214.4567 448.22833l-13.212601 7.1128845" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m364.88452 102.656166l-2.0341187 -13.215218" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m364.88452 102.656166l-2.0341187 -13.215218" fill-rule="evenodd"></path></g></svg>'
        } else {
          return '<svg version="1.1" class="oculi '+stone+'" viewBox="0.0 0.0 462.9448818897638 533.6036745406824" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><clipPath id="p.0"><path d="m0 0l462.9449 0l0 533.6037l-462.9449 0l0 -533.6037z" clip-rule="nonzero"></path></clipPath><g clip-path="url(#p.0)"><path fill="#000000" fill-opacity="0.0" d="m0 0l462.9449 0l0 533.6037l-462.9449 0z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m240.10191 36.7979l131.15358 41.96665l97.578094 77.641975l-216.14085 308.47073l-253.91058 -231.87733l40.920807 -109.11763z" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m240.10191 36.7979l131.15358 41.96665l97.578094 77.641975l-216.14085 308.47073l-253.91058 -231.87733l40.920807 -109.11763z" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m366.91602 76.22835l-122.98163 46.755905l-199.2126 1.0157471" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m366.91602 76.22835l-122.98163 46.755905l-199.2126 1.0157471" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m242.91895 121.96588l-72.165665 102.2383" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m242.91895 121.96588l-72.165665 102.2383" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m243.93439 122.98425l82.32324 68.41507" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m243.93439 122.98425l82.32324 68.41507" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m170.75328 223.60503l-170.75328 7.1154785" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m170.75328 223.60503l-170.75328 7.1154785" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m327.27823 190.06561l139.24408 -32.524933" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m327.27823 190.06561l139.24408 -32.524933" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m321.17847 191.08136l-146.35957 33.54068" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m321.17847 191.08136l-146.35957 33.54068" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m173.80315 226.65355l77.244095 236.8189" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m173.80315 226.65355l77.244095 236.8189" fill-rule="evenodd"></path><path fill="#000000" fill-opacity="0.0" d="m324.22833 192.0971l-71.14697 269.34384" fill-rule="evenodd"></path><path stroke="#ffffff" stroke-width="2.0" stroke-linejoin="round" stroke-linecap="butt" d="m324.22833 192.0971l-71.14697 269.34384" fill-rule="evenodd"></path></g></svg>'
        }
      }

      function renderSVG() {
        element.html( path(attrs.facet, attrs.stone) );
      }

      renderSVG();
    }

    return {
      link: link,
      restrict: 'E'
    };
}]);
