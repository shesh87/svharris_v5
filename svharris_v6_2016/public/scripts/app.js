var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/portfolio', {
			templateUrl: '/portfolio',
			controller: 'PortfolioCtrl'
		})
		.when('/projects/:id', {
			templateUrl: '/projects/:id',
			controller: 'PortfolioCtrl'
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


app.service('apiService', function($http) {

	this.getData = function (database, callbackFunc) {
		$http({
			method: 'GET',
			url: '/' + database,
			cache: true
		}).success(function(data){
			callbackFunc(data);
		}).error(function(){
			// console.log("server call unsuccessful");
		});
	};
});


app.factory('blogService', function(linkService) {
	var posts = [];	

	function shorten(blog) {
		for (var i = 0; i < blog.length; i++) {
			if (blog[i].post.length > 100) {
				var shorten = blog[i].post.substring(0, 100) + '...';
				blog[i].shortenedPost = shorten;
				posts.push(blog[i]);
			} else {
				blog[i].shortenedPost = blog[i].post;
				posts.push(blog[i]);
			}
		}
		posts.sort(compare);
		return posts;
	}

	function compare(a,b) {
		if (a.date< b.date) {
			return -1;
		}
		if (a.date > b.date) {
			return 1;
		}
		return 0;
	}


	return {
		getEntries: function(array) {
			linkService.createLink(array);
			return shorten(array);
		},
		getPosts: function() {
			return posts;
		}
	};
});


app.factory("projectService", function(linkService) {

	var allCategories = [];
	var allProjects = [];

	function setProjects(array, callbackFunc) {
		for (var i=0; i<array.length; i++) {
			allProjects.push(array[i]);
		}
		callbackFunc(allProjects);
	}

	function addObj(obj, index) {
		allCategories[index].contents.push(obj);
	}
	function createObj(obj, name) {
		var newObj = {
			category: name,
			contents: [obj]
		};
		allCategories.push(newObj);
	}
	function findCat(obj) {
		if (allCategories.length === 0) {
			createObj(obj, obj.category);
		} else {
			var objCount = 0;
			for (var i = 0; i < allCategories.length; i++) {
				if (obj.category === allCategories[i].category) { // web.intoam === web.kingtut
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
			findCat(projects[i]);
		}
		return allCategories;
	}	


	return {
		setCategories: function(array) {
			linkService.createLink(array);
			return sections(array);
		},
		getCategories: function() {
			return allCategories;
		},
		setProjects: function(array, callbackFunc) {
			setProjects(array, callbackFunc);
		},
		getProjects: function() {
			return allProjects;
		}
	};
});



app.factory('careerService', function() {

	var resume = [];
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
			resume.push(array[i]);
		}
	}

	function checkResume () {
		return resume;
	}

	

	return {
		checkResume: function() {
			return checkResume();
		},
		setJobs: function(array) {
			getResume(array);
			jobs.sort(compare);
			return jobs;
		},
		getJobs: function() {
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


app.controller('HeaderCtrl', function($scope, navigationService) {
	$scope.navlinks = null;
	$scope.navlinks = navigationService.getLinks();
});

app.controller('FooterCtrl', function($scope, socialMediaService) {
	$scope.smedias = socialMediaService.getSocial();
});

app.controller('PortfolioCtrl', function($scope, projectService, apiService, linkService) {
	var p = projectService.getCategories();
	if (p.length === 0) {
		apiService.getData('project', function(response) {
			$scope.allProjects = projectService.setCategories(response);
			$scope.projectDetails = linkService.findId(response);
			projectService.setProjects(response);
		});
	} else {
		$scope.allProjects = p;
		$scope.projectDetails = linkService.findId(projectService.getProjects());
	}
});


app.controller('BlogCtrl', function($scope, blogService, linkService, apiService) {
	var blg = blogService.getPosts();
	if (blg.length === 0) {
		apiService.getData('blogentries', function(response) {
			$scope.entries = blogService.getEntries(response);
			$scope.post = linkService.findId(response);
		});
	} else {
		$scope.entries = blg;
		$scope.post = linkService.findId(blg);
	}
});


app.controller('ResumeCtrl', function($scope, careerService, apiService) {
	var r = careerService.checkResume();
	if (r.length === 0) {
		apiService.getData('career', function(response) {
			$scope.careers = careerService.setJobs(response);
			$scope.schools = careerService.getSchools();
			$scope.skills = careerService.getSkills();
		});
	} else {
		$scope.careers = careerService.getJobs(r);
		$scope.schools = careerService.getSchools();
		$scope.skills = careerService.getSkills();
	}

	

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

