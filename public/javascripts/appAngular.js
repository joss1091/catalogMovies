	var app = angular.module("moviesApp",['infinite-scroll']);
	app.controller("moviesCtrl", function($scope,$http){
		var items = [];	
		var page = 1;

		$scope.randomMovies = function(callback){
			$http.get('/api/movies/random-movies')
			.success(function(data,status,header,config){
			if(data instanceof Array)
			{	
				data.map(function(item){
					if(item.Poster == 'N/A')
					{
						item.Poster = "/images/not-found.png";
					}
				})
				$scope.randomMovies = data.splice(1,3);
			} 
			else{
				
				$scope.randomMovies = [data].splice(1,3)

			}
			if(items.length < 3) callback();;

					
		}).error(function(data,status,header,config){
			console.log("Error");
			});
		}
		var callback = $scope.randomMovies();
		$scope.randomMovies(callback);

		$scope.search = function(query)
		{
			if ($scope.query.length > 2){
				items=[]
				$http.get('/api/movies?query='+query)
				.success(function(data,status,header,config){
					$scope.totalResult = data.totalResults;
					items = items.concat(data.Search);
				if(data.Search instanceof Array)
				{
					data.Search.map(function(item){
						if(item.Poster == 'N/A')
						{
							item.Poster = "/images/not-found.png";
						}
					})
					$scope.movies = items;
				} 
				else{
					$scope.movies = items;
				} 	
				console.log($scope.movies)	
			}).error(function(data,status,header,config){
				console.log("Error");
				});
			}
		}

		
		$scope.getMoreData = function () {
			
			if ($scope.movies && ($scope.totalResult/page)> 10 ){
				page++;
				$http.get('/api/movies?query='+$scope.query + "&page="+page)
				.success(function(data,status,header,config){
				items = items.concat(data.Search);
				if(data.Search instanceof Array)
				{
					data.Search.map(function(item){
						if(item.Poster == 'N/A')
						{
							item.Poster = "/images/not-found.png";
						}
					})
					$scope.movies = items
				} 
				else{
					$scope.movies = items;
				} 	
			
				}).error(function(data,status,header,config){
					console.log("Error");
					});
		}
	}
});

	
