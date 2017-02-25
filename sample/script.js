var data=[
	{name:'Oscar Wilde', description:'To live is the rarest thing in the world. Most people exist, that is all.'}
	,{name:'Narcotics Anonymous', description:'Insanity is doing the same thing, over and over again, but expecting different results.'}
	,{name:'Ralph Waldo Emerson', description:"Finish each day and be done with it. You have done what you could. Some blunders and absurdities no doubt crept in; forget them as soon as you can. Tomorrow is a new day. You shall begin it serenely and with too high a spirit to be encumbered with your old nonsense."}
	,{name:'André Gide, Autumn Leaves', description:"It is better to be hated for what you are than to be loved for what you are not."}
	,{name:'Jeeva', description:"Quote is on the way."}
	,{name:'Mark Twain', description:"Good friends, good books, and a sleepy conscience: this is the ideal life."}
	,{name:'Allen Saunders', description:"Life is what happens to us while we are making other plans."}
	,{name:'Douglas Adams, The Long Dark Tea-Time of the Soul', description:'I may not have gone where I intended to go, but I think I have ended up where I needed to be.'}
	,{name:'Markus Zusak, I Am the Messenger', description:"Sometimes people are beautiful. Not in looks. Not in what they say. Just in what they are."}
	,{name:'George Bernard Shaw', description:"Life isn't about finding yourself. Life is about creating yourself."}
	,{name:'Albert Einstein', description:"Life is like riding a bicycle. To keep your balance, you must keep moving."}
	,{name:'Bill Watterson, The Complete Calvin and Hobbes', description:"Reality continues to ruin my life."}
	,{name:'J.K. Rowling, Harry Potter and the Deathly Hallows', description:"Dumbledore watched her fly away, and as her silvery glow faded he turned back to Snape, and his eyes were full of tears."}
	];

angular.module('demo',['ngRoute','jjBootstrapRowSplitter'])
.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
  $routeProvider
  .when("/", {
        templateUrl : "_home.html",
		controller: 'demoController'
    })
   .when('/BoostrapRows', {
    templateUrl: '_bootstrapRows.html',
    controller: 'boostrapRowsController',
    resolve: {
      delay: function($q, $timeout) {
       
      }
    }
  })
  .when('/SplittedBoostrapRows', {
    templateUrl: '_splittedBootstrapRows.html',
    controller: 'splittedBoostrapRowsController'
  });

})
.controller('boostrapRowsController',['$scope',function($scope){
	//assign values
	$scope.item1=angular.copy(data);
}])
.controller('splittedBoostrapRowsController',['$scope',function($scope){
	// assign values
	var vm=this;
	
	vm.sharedValues={$parentScope:vm};
	vm.arraySplit={
		templateUrl:'_template.html?v='+(new Date()).getTime(),
		options:{
				calculateOnResize: true,
                initializeValue: function () {
                    return angular.copy(data);
                },
                firstSplitSizes: {
                    lg: 3
                },
                mediaSizes: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4
                }
		},
		events:{
			
		}
	}
	
	vm.splitItems=splitItems;
	
	function splitItems(){
		debugger
		vm.arraySplit.events.splitArray();	
	}
	
	return vm;
}])
.controller('demoController',['$scope',function($scope){
	// assign values
	//$scope.item1=angular.copy(data);
}]).run(function($templateCache) {
  //$templateCache.put('templateId.html', 'This is the content of the template');
});