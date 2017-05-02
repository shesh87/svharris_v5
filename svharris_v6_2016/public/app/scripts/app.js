var app = angular.module("myApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/partials/portfolio.html",
			controller: "PortfolioCtrl"
		})
		.when("/portfolio", {
			templateUrl: "views/partials/portfolio.html",
			controller: "PortfolioCtrl"
		})
		.when("/projects/:id", {
			templateUrl: "views/partials/projecttemp.html",
			controller: "PortfolioCtrl"
		})
		.when("/resume", {
			templateUrl: "views/partials/resume.html",
			controller: "ResumeCtrl"
		})
		.when("/blog", {
			templateUrl: "views/partials/blog.html",
			controller: "BlogCtrl"
		})
		.when("/blog/:id", {
			templateUrl: "views/partials/posttemp.html",
			controller: "BlogCtrl"
		})
		.when("/contact", {
			templateUrl: "views/partials/contact.html",
			controller: "ContactCtrl"
		})
	.otherwise({
		redirectTo: "/portfolio"
	});
}]);


app.factory("navigationService", function() {
	var navlinks = [
		{
			name: "portfolio",
			http: "portfolio"
		},
		// {
		// 	name: "resume",
		// 	http: "resume"
		// },
		// {
		// 	name: "blog",
		// 	http: "blog"
		// },
		{
			name: "contact",
			http: "contact"
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


app.service("apiService", ["$http", function($http) {
	this.getData = function (database, method, callbackFunc) {
		$http({
			method: method,
			url: "/" + database,
			cache: true
		}).success(function(data){
			callbackFunc(data);
		}).error(function(){
			console.log("server call unsuccessful");
		});
	};
}]);

app.service("validationService", ["$http", function($http) {
	this.validate = function(formData, callbackFunc) {
		var contactForm = verification(formData);
		if (contactForm === false) {
			console.log("errors on page");
		} else {
			$http({
				method: "POST",
				url: "/talktome_js",
				dataType: "json",
				params: formData,
				paramSerializer: "$httpParamSerializerJQLike",
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).success(function(status) {
				callbackFunc(status);
			}).error(function(status) {
				callbackFunc(status);
			});
		}
	};
}]);


app.factory("blogService", ["linkService", function(linkService) {
	var posts = [];	

	function shorten(blog) {
		for (var i = 0; i < blog.length; i++) {
			if (blog[i].post.length > 100) {
				var shorten = blog[i].post.substring(0, 100) + "...";
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
}]);


app.factory("projectService", ["linkService", function(linkService) {

	var allCategories = [];
	var allProjects = [];

	function setProjects(array) {
		for (var i=0; i<array.length; i++) {
			allProjects.push(array[i]);
		}
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
		setProjects: function(array) {
			setProjects(array);
		},
		getProjects: function() {
			return allProjects;
		}
	};
}]);



app.factory("careerService", function() {

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
			if (array[i].category === "jobs") {
				jobs.push(array[i]);
			} else if (array[i].category === "skills") {
				skills.push(array[i]);
			} else if (array[i].category === "education") {
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


app.factory("linkService", ["$routeParams", function($routeParams) {
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
		var link = title.replace(/[^\w\s]/g, "").split(" ").join("-").toLowerCase();
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
}]);


//////////////////////////////////////////////////////////////////////////


app.controller("HeaderCtrl", ["$scope", "navigationService", function($scope, navigationService) {
	$scope.navlinks = null;
	$scope.navlinks = navigationService.getLinks();
}]);

app.controller("FooterCtrl", ["$scope", "socialMediaService", function($scope, socialMediaService) {
	$scope.smedias = socialMediaService.getSocial();
}]);

app.controller("PortfolioCtrl", ["$scope", "projectService", "apiService", "linkService", function($scope, projectService, apiService, linkService) {
	var p = projectService.getCategories();
	if (p.length === 0) {
		apiService.getData("project", "GET", function(response) {
			$scope.myProjects = projectService.setCategories(response);
			$scope.projectDetails = linkService.findId(response);
			projectService.setProjects(response);
		});
	} else {
		$scope.myProjects = p;
		$scope.projectDetails = linkService.findId(projectService.getProjects());
	}
}]);


app.controller("BlogCtrl", ["$scope", "blogService", "linkService", "apiService", function($scope, blogService, linkService, apiService) {
	var blg = blogService.getPosts();
	if (blg.length === 0) {
		apiService.getData("blogentries", "GET", function(response) {
			$scope.entries = blogService.getEntries(response);
			$scope.post = linkService.findId(response);
		});
	} else {
		$scope.entries = blg;
		$scope.post = linkService.findId(blg);
	}
}]);


app.controller("ResumeCtrl", ["$scope", "careerService", "apiService", function($scope, careerService, apiService) {
	var r = careerService.checkResume();
	if (r.length === 0) {
		apiService.getData("career", "GET", function(response) {
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
}]);

app.controller("ContactCtrl", ["$scope", "validationService", function($scope, validationService) {
	$("#js-submit").click(function(e) {
		e.preventDefault();
		ver($("#js-contact"), function(data) {
			validationService.validate(data, function(response) {
				if (response.status === 200) {
					console.log(response.status);
					$("#js-contact").html("<p class=\"contact--header contact--header__response\">THANKS FOR WRITING!<br>You will receive a response from me within 24-48 hours.</p>");
				} else {
					console.log(response.status);
				}
			});
		});
	});

	function ver(fields, callbackFunc) {
		var inputs = [];
		$(fields).find("input").each(function() {
			inputs.push($(this));
		});
		var form = {};
		for (var i=0; i<inputs.length; i++) {
			var n = inputs[i].attr("name");
			var v = inputs[i].val();
			form[n] = v;
		}
		callbackFunc(form);
	}
}]);





