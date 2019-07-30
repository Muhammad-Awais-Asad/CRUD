var app = angular.module("app", ['ngRoute']);
var isLoggedIn = false;

app.config(function($routeProvider) {
  $routeProvider
	.when("/", {
	    templateUrl : "home.html",
	    controller: HomeCtrl,
	})
	.when("/books-list", {
	    templateUrl : "booksList.htm",
	    controller: BookListCtrl,
	   
	})
	.when("/books-add", {
	    templateUrl : "booksAdd.html",
	    controller: booksAddCtrl,
	    
	})
	.when("/books-edit/:id", {
	    templateUrl : "bookEdit.html",
	    controller: booksEditCtrl,
	    
	})
	.when("/books-view/:id", {
	    templateUrl : "bookView.html",
	    controller: booksViewCtrl,
	   
	})
	.when("/users-list", {
	    templateUrl : "usersList.html",
	    controller: UserListCtrl,
	    
	})
	.when("/users-add", {
	    templateUrl : "usersAdd.html",
	    controller: UsersAddCtrl,
	    
	})
	.when("/users-edit/:id", {
	    templateUrl : "userEdit.html",
	    controller: UserEditCtrl,
	    
	})
	.when("/users-view/:id", {
	    templateUrl : "userView.html",
	    controller: UserViewCtrl,
	    
	})
	.otherwise({redirectTo: "/"});
});

app.controller('AppCtrl', AppCtrl);

function AppCtrl ($scope, $http, $location) {
	
};

function BookListCtrl($scope, $http, $location) {
	
	$http.get("http://localhost:1337/api/books")
	  .then(function(response) {
	   $scope.booksList = response.data;
	});


	$scope.remove = function (id) {
		$http.delete("http://localhost:1337/api/book/"+id, id)
            .then(function (data, status, headers, config) {
                    if (data.data.success){
                    	$http.get("http://localhost:1337/api/books").then(function(response) {
							$scope.booksList = response.data;
							return $scope.alert = true;
						});
                    }
                })
                .catch(function(data, status, header, config){
                    // $scope.result = "Data: " + status;
        });
    };

    $scope.edit = function (id) {

    	$location.path( "/books-edit/" + id );
	} 

	$scope.view = function (id) {

    	$location.path( "/books-view/" + id );
	} 

}

function booksAddCtrl($scope, $http, $location){

	  	$scope.submit = function() {

	  		console.log($scope.book);

            $http.post("http://localhost:1337/api/book", $scope.book)
            	.then(function (response) {
   					  $location.path("/books-list");
   					  alert("Data inserted successfully");
       			});
        }
}


function booksEditCtrl($scope, $http, $location, $routeParams){

 	console.log($routeParams.id);

        $http.get("http://localhost:1337/api/book/"+$routeParams.id).then(function(response) {
		   $scope.book = response.data;
		   console.log($scope.book);
		})

		$scope.update = function ()
		{
			console.log($scope.book);

            $http.put("http://localhost:1337/api/book", $scope.book)
            	.then(function (response) {
   					  $location.path("/books-list");
       			});
		}
	  	
}

function booksViewCtrl($scope, $http, $location, $routeParams){

 	console.log($routeParams.id);

        $http.get("http://localhost:1337/api/book/"+$routeParams.id).then(function(response) {
		   $scope.book = response.data;
		   console.log($scope.book);
		})
}

function HomeCtrl ($scope, $location, $http){
	$scope.login = function() {
		console.log($scope.user);
		$http.post("http://localhost:1337/auth/user", $scope.user).then(function(response, data) {
			if (response.data.success === true) {
				isLoggedIn = true;
				$location.path("/users-list");
			} else {
				return $scope.alert = true;
			}
			
		})
		
	}
}



//code for users

function UserListCtrl($scope, $http, $location) {
	
	$http.get("http://localhost:1337/api/users")
	  .then(function(response) {
	   $scope.user = response.data;
	});

	$scope.remove = function (id) {
		$http.delete("http://localhost:1337/api/user/"+id, id)
            .then(function (data, status, headers, config) {
                    if (data.data.success){
                    	$http.get("http://localhost:1337/api/users").then(function(response) {
							$scope.user = response.data;
							return $scope.alert = true;
						});
                    }
                })
                .catch(function(data, status, header, config){
                    // $scope.result = "Data: " + status;
        });
    };

    $scope.edit = function (id) {

    	$location.path( "/users-edit/" + id );
	}

	$scope.view = function (id) {

    	$location.path( "/users-view/" + id );
	}
}

function UsersAddCtrl($scope, $http, $location){

	  	$scope.submit = function() {

	  		console.log($scope.user);

            $http.post("http://localhost:1337/api/user", $scope.user)
            	.then(function (response) {
   					  $location.path("/users-list");
   					  alert("Data inserted successfully");
       			});

        }
}


function UserEditCtrl($scope, $http, $location, $routeParams){

 	console.log($routeParams.id);

        $http.get("http://localhost:1337/api/user/"+$routeParams.id).then(function(response) {
		   $scope.user = response.data;
		   console.log($scope.user);
		})

		$scope.update = function ()
		{
			console.log($scope.user);

            $http.put("http://localhost:1337/api/user", $scope.user)
            	.then(function (response) {
   					  $location.path("/users-list");
       			});
		}
	  	
}

function UserViewCtrl($scope, $http, $location, $routeParams){

 	console.log($routeParams.id);

        $http.get("http://localhost:1337/api/user/"+$routeParams.id).then(function(response) {
		   $scope.user = response.data;
		   console.log($scope.user);
		})
}
