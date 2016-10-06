var app = angular.module("myApp", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/portfolio', {
			templateUrl: '/portfolio.html',
			controller: "PortfolioCtrl"
		})
		.when('/projects/:id', {
			templateUrl: '/projects/:id',
			controller: "ProjectCtrl"
		})
		.when('/resume', {
			templateUrl: '/resume'
		})
		.when('/contact', {
			templateUrl: '/contact'
		})
	.otherwise({
		redirectTo: '/portfolio'
	});
});


app.factory("projectService", function() {

	var projects = [
		{
			category: "print",
			link: "faboccasions.html",
			thumbnail: "fab-tb.jpg",
			alttext: "Fabulous Occasions Branding",
			description: "Braning campaign for a event planning business.",
			title: "Fabulous Occasions Branding",
			company: "Fabulous Occasions, Inc.",
			status: "College Student Project",
			objective: "A one color design brochure project for a fictitious company turned into a full blown logo design and branding campaign for my mom's event planning aspirations.",
			year: "2010",
			tools: "InDesign, Photoshop, Illustrator, sketching",
			photos: [{name: "fab-1.jpg", alttext: "Fabulous Occasions images"}, {name: "fab-1.jpg", alttext: "Fabulous Occasions images"}, {name: "fab-2.jpg", alttext: "Fabulous Occasions images"}, {name: "fab-3.jpg", alttext: "Fabulous Occasions images"}, {name: "fab-4.jpg", alttext: "Fabulous Occasions images"}, {name: "fab-5.jpg", alttext: "Fabulous Occasions images"}]
		},
		{
			category: "web",
			link: "web-proj-1.html",
			thumbnail: "kingtut-tb.png",
			alttext: "King Tut website",
			title: "King Tut",
			description: "A website redesign of an Orlando hookah design.",
			company: "King Tut Hookah Lounge Orlando",
			status: "College Student Project",
			objective: "Choose a company website that was in need of a redesign. I've been a patrian of King Tut's and really enjoy the atmosphere they provide. My process was to design a website that had a middle eastern vibe that was modern and showcased their main product, hookahs.",
			year: "2011",
			tools: "Javascript, jQuery, Dreamweaver, HTML, CSS, Photoshop, Illustrator"
		},
		{
			category: "web",
			link: "web-proj-2.html",
			thumbnail: "intoam-tb1.jpg",
			alttext: "Into The AM website",
			title: "Into The AM",
			description: "An EDM merchandise and recording artist company."
		},
		{
			category: "web",
			link: "web-proj-3.html",
			thumbnail: "npsbank-tb.jpg",
			alttext: "NPSBANK website",
			title: "NPSBANK",
			description: "Small business credit card processor."
		},
		{
			category: "mobile",
			link: "mobile-proj-1.html",
			thumbnail: "handson-tb.jpg",
			alttext: "United Way HandsOn Suncast mobile app",
			title: "HandsOn",
			description: "Non Profit United Way division in Tampa, FL."
		},
		{
			category: "mobile",
			link: "mobile-proj-2.html",
			thumbnail: "spazio-tb.jpg",
			alttext: "Spazio Italian Restaurant mobile app",
			title: "Spazio",
			description: "Restaurant on Fort Lauderdale Beach."
		},
		{
			category: "mobile",
			link: "mobile-proj-3.html",
			thumbnail: "goldclub-tb.jpg",
			alttext: "Gold Club adult club mobile app",
			title: "Gold Club",
			description: "Adult entertainment venue in San Francisco, CA."
		},
		{
			category: "mobile",
			link: "mobile-proj-4.html",
			thumbnail: "rocresto-tb.jpg",
			alttext: "ROC Resto Lounge mobile app",
			title: "ROC Resto",
			description: "Eat, drink, shop and dance all in one place."
		}
	];

	var print = [];
	var web = [];
	var mobile = [];

	for (var i = 0; i < projects.length; i++) {
		if (projects[i].category === "print") {
			print.push(projects[i]);
		} else if (projects[i].category === "web") {
			web.push(projects[i]);
		} else if (projects[i].category === "mobile") {
			mobile.push(projects[i]);
		}
	}

	function findProject(project) { 
	    return project.link === currentId;
	}

	return {
		getPrint: function() {
			return print;
		},
		getWeb: function() {
			return web;
		},
		getMobile: function() {
			return mobile;
		},
		getProjects: function() {
			return projects;
		}
	}
});


app.controller('PortfolioCtrl', function($scope, projectService) {
	$scope.prints = projectService.getPrint();
	$scope.webs = projectService.getWeb();
	$scope.mobiles = projectService.getMobile();
});


app.controller('ProjectCtrl', function($scope, projectService, $routeParams) {
	var currentId = $routeParams.id;

	function findProject(project) { 
	    return project.link === currentId;
	}
	var projid = projectService.getProjects();
	$scope.projectDetails = projid.find(findProject);

	$scope.imgs = $scope.projectDetails.photos;
});






