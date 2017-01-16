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
			date: new Date(), // new Date()
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
			image: 'something.jpg',
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

	var projects = [
		{
			category: "print",
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
			alttext: "United Way HandsOn Suncoast mobile app",
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
		},
		{
			category: 'code',
			link: 'code-proj-4.html',
			thumbnail: '',
			alttext: '',
			title: '',
			description: ''
		}
	];


	linkService.createLink(projects);

	function sections() {
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
		for (var i = 0; i < projects.length; i++) {
			findCate(projects[i]);
		}

		return allProjects;
	}	


	return {
		getSections: sections,
		getAllProjects: function() {
			return projects;
		}
	};
});


app.factory('carrerService', function() {
	var pastCareers = [
		{
			company: 'bizcard xpress',
			timeline_start: 2011,
			timeline_end: 2012,
			title: 'graphics engineer',
			facts: ['number 1.2 Bacon ipsum dolor amet meatball landjaeger jerky, brisket prosciutto rump corned beef pork belly ham burgdoggen bresaola kevin t-bone pancetta.', 'number 2.2 Capicola t-bone cupim flank swine chuck prosciutto turkey shankle pastrami ham turducken.', 'Sirloin frankfurter leberkas, tongue rump beef turducken salami alcatra filet mignon chicken landjaeger.']
		},
		{
			company: 'bside studios',
			timeline_start: 2012,
			timeline_end: 2012,
			title: 'web intern',
			facts: ['number 1.2 Bacon ipsum dolor amet meatball landjaeger jerky, brisket prosciutto rump corned beef pork belly ham burgdoggen bresaola kevin t-bone pancetta.', 'number 2.2 Capicola t-bone cupim flank swine chuck prosciutto turkey shankle pastrami ham turducken.', 'Sirloin frankfurter leberkas, tongue rump beef turducken salami alcatra filet mignon chicken landjaeger.']
		},
		{
			company: 'npsapps',
			timeline_start: 2012,
			timeline_end: 2014,
			title: 'mobile app designer',
			facts: ['number 1 Bacon ipsum dolor amet meatball landjaeger jerky, brisket prosciutto rump corned beef pork belly ham burgdoggen bresaola kevin t-bone pancetta.', 'number 2 Capicola t-bone cupim flank swine chuck prosciutto turkey shankle pastrami ham turducken.', 'Sirloin frankfurter leberkas, tongue rump beef turducken salami alcatra filet mignon chicken landjaeger.']
		}
	];

	var schools = [
		{
			name: 'university of central florida',
			timeline_start: 2005,
			timeline_end: 2008,
			major: 'multimedia'
		},
		{
			name: 'broward college',
			timeline_start: 2010,
			timeline_end: 2012,
			major: 'grahpic design',
			degree: 'graphic technology A.S.'
		},
		{
			name: 'valencia community college',
			timeline_start: 2009,
			timeline_end: 2010,
			major: 'graphic design',
			degree: 'certificate'
		}

	];

	var skills = [
		{
			category: 'operating systems',
			list: ['windows vista /7/ 8/10', 'mac OS X yosemite/el capitan/sierra']
		},
		{
			category: 'programing languages',
			list: [ 'javascript', 'ruby', 'html', 'css']
		},
		{
			category: 'databases',
			list: ['mongodb']
		},
		{
			category: 'graphic design',
			list: ['photoshop', 'illustration', 'indesign', 'pageplus', 'photoplus', 'drawplus']
		},
		{
			category: 'web development',
			list: ['angular', 'rails', 'ajax', 'json', 'jQuery', 'bootstrap', 'APIs', 'sinatra', 'wordpress', 'Drupal', 'git']
		}
	];

	pastCareers.forEach(function(n) {
		var j = n.facts[0];
		n.factOne = j;
	});

	function compare(a,b) {
		if (a.timeline_start < b.timeline_start) {
			return -1;
		}
		if (a.timeline_start > b.timeline_start) {
			return 1;
		}
		return 0;
	}

	return {
		getCareers: function() {
			pastCareers.sort(compare);
			return pastCareers;
		},
		getSchools: function() {
			schools.sort(compare);
			return schools;
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

app.controller('ResumeCtrl', function($scope, carrerService) {
	$scope.careers = carrerService.getCareers();
	$scope.schools = carrerService.getSchools();
	$scope.skills = carrerService.getSkills();
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

