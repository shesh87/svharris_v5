var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/portfolio', {
			templateUrl: '/portfolio',
			controller: 'PortfolioCtrl'
		})
		.when('/projects/:id', {
			templateUrl: '/projects/:id',
			controller: 'ProjectCtrl'
		})
		.when('/resume', {
			templateUrl: '/resume',
			controller: 'ResumeCtrl'
		})
		.when('/blog', {
			templateUrl: '/blog',
			controller: 'BlogCtrl'
		})
		.when('/blog/:id', {
			templateUrl: '/blog/:id',
			controller: 'BlogCtrl'
		})
		.when('/contact', {
			templateUrl: '/contact',
			controller: 'ContactCtrl'
		})
	.otherwise({
		redirectTo: '/portfolio'
	});
});

app.factory('blogService', function(linkService) {
	var blogEntries = [
		{
			date: new Date('Thu Jan 3 2016'), // new Date()
			title: 'Don\'t Forget Sinatra',
			image: 'sinatra.jpg',
			post: 'Recently have only been coding and producing projects in Rails so I could get a feel for the framework. However, the other day I wanted to try writing a simple app in Sinatra and that\'s when I realized I had FORGETTEN Sinatra!'
		},
		{
			date: new Date('Thu Apr 3 2016'),
			title: 'Bacon ipsum',
			image: 'bacon.jpg',
			post: 'Bacon ipsum dolor amet shank tenderloin drumstick, corned beef pork chop biltong filet mignon.'
		},
		{
			date: new Date('Thu Mar 23 2016'),
			title: 'U.S.A. only $3.99',
			image: '',
			post: 'Bacon ipsum dolor amet shank tenderloin drumstick, corned beef pork chop chuck fatback landjaeger pig sausage pastrami tail venison biltong filet mignon. Cupim pig jowl chicken. Kevin hamburger biltong strip steak fatback jerky meatloaf, kielbasa bacon ham hock pork.'
		}
	];

	linkService.createLink(blogEntries);

	function shorten() {
		for (var i = 0; i < blogEntries.length; i++) {
			if (blogEntries[i].post.length > 100) {
				var shorten = blogEntries[i].post.substring(0, 100) + '...';
				blogEntries[i].shortenedPost = shorten;
			}
		}
		return blogEntries;
	}

	return {
		getEntriesShort: shorten,
		getEntries: function() {
			return blogEntries;
		}
	};
});



app.factory('navigationService', function() {
	var navlinks = [
		{
			name: 'portfolio',
			http: 'portfolio'
		},
		{
			name: 'resume',
			http: 'resume'
		},
		{
			name: 'blog',
			http: 'blog'
		},
		{
			name: 'contact',
			http: 'contact'
		}
	];

	return {
		getLinks: function() {
			return navlinks;
		}
	};
});


app.factory("socialMediaService", function() {
	var socialmedia = [
		{
			name: "github",
			http: "github.com/shesh87"
		},
		{
			name: "linkedin",
			http: "www.linkedin.com/pub/sheonna-von-harris/5a/9a6/76b"
		},
		{
			name: "twitter",
			http: "twitter.com/shevonharris"
		},
		{
			name: "facebook",
			http: "www.facebook.com/Sheonnavonharris"
		},
		{
			name: "pinterest",
			http: "www.pinterest.com/svonharris/"
		}
	];

	return {
		getSocial: function() {
			return socialmedia;
		}
	};
});


app.factory("projectService", function(linkService) {

	// var projects = [];


	// linkService.createLink(projects);

	var allProjects = [];
	function addObj(obj, index) {
		allProjects[index].contents.push(obj);
	}
	function createObj(obj, name) {
		var newObj = {
			category: name,
			contents: [obj]
		};
		allProjects.push(newObj);
	}
	function findCate(obj) {
		if (allProjects.length === 0) {
			createObj(obj, obj.category);
		} else {
			var objCount = 0;
			for (var i = 0; i < allProjects.length; i++) {
				if (obj.category === allProjects[i].category) { // web.intoam === web.kingtut
					objCount += 1;
					var index = i;
				}
			}
			if (objCount === 0) {
				createObj(obj, obj.category);
			} else {
				addObj(obj, index);
			}
		}
	}

	function sections(projects) {
		for (var i = 0; i < projects.length; i++) {
			findCate(projects[i]);
		}
		return allProjects;
	}	


	return {
		getAllProjects: function(array) {
			linkService.createLink(array);
			return sections(array);
		}
	};
});


app.service('apiService', function($http) {

	this.getData = function (database, callbackFunc) {
		$http({
			method: 'GET',
			url: '/' + database
		}).success(function(data){
			// With the data successfully returned, call our callback
			callbackFunc(data);
		}).error(function(){
			console.log("server call unsuccessful");
		});
	};
});


app.factory('carrerService', function() {

	var skills = [];
	var education = [];
	var jobs = [];

	function compare(a,b) {
		if (a.timeline_start < b.timeline_start) {
			return -1;
		}
		if (a.timeline_start > b.timeline_start) {
			return 1;
		}
		return 0;
	}

	function getResume (array) {
		for (var i =0; i < array.length; i ++) {
			if (array[i].category === 'jobs') {
				jobs.push(array[i]);
			} else if (array[i].category === 'skills') {
				skills.push(array[i]);
			} else if (array[i].category === 'education') {
				education.push(array[i]);
			}
		}
	}

	

	return {
		getJobs: function(array) {
			getResume(array);
			jobs.sort(compare);
			return jobs;
		},
		getSchools: function() {
			education.sort(compare);
			return education;
		},
		getSkills: function() {
			return skills;
		}
	};
});


app.factory('linkService', function($routeParams) {
	function pageId(array) {
		var currentId = $routeParams.id;
		for (var i = 0; i < array.length; i++) {
			if (array[i].link === currentId) {
				return array[i];
			}
		}
	}

	function linkGenerator(elm, index, array) {
		var title = array[index].title;
		var link = title.replace(/[^\w\s]/g, '').split(' ').join('-').toLowerCase();
		array[index].link = link;
	}

	return {
		findId: function(array) {
			return pageId(array);
		},
		createLink: function(array) {
			array.forEach(linkGenerator);
		}
	};
});


//////////////////////////////////////////////////////////////////////////



app.controller('PortfolioCtrl', function($scope, projectService) {
	$scope.allProjects = projectService.getSections();
});


app.controller('ProjectCtrl', function($scope, projectService, linkService) {
	var projID = projectService.getAllProjects();
	$scope.projectDetails = linkService.findId(projID);
});


app.controller('HeaderCtrl', function($scope, navigationService) {
	$scope.navlinks = null;
	$scope.navlinks = navigationService.getLinks();
});


app.controller('FooterCtrl', function($scope, socialMediaService) {
	$scope.smedias = socialMediaService.getSocial();
});

app.controller('BlogCtrl', function($scope, blogService, linkService) {
	$scope.entries = blogService.getEntriesShort();
	var p = blogService.getEntries();
	$scope.post = linkService.findId(p);
});

app.controller('ResumeCtrl', function($scope, carrerService, apiService) {
	apiService.getData('career', function(response) {
		$scope.careers = carrerService.getJobs(response);
		$scope.schools = carrerService.getSchools();
		$scope.skills = carrerService.getSkills();
	});
	// $scope.getRating = function(rate) {
	// 	var indexArray = [];
	// 	for (var i=0; i < rate; i++) {
	// 		indexArray.push('num' + i);
	// 	}
	// 	return indexArray;
	// };
});

app.controller('ContactCtrl', function($scope, socialMediaService) {
	$scope.smedias = socialMediaService.getSocial();
});

