
function errorClass(element) {
	$(element).parent().addClass("error");
}

function correctClass(element) {
	$(element).parent().removeClass("error");
	var n = $(".js-input").hasClass("error");
	if (!n) {
		$("#js-submit").removeClass("disabled");
	}
}


function verification(form) {
	var correctInputs = [];
	$.each(form, function( ind, val ) {
		var n = ind;
		var v = val;
		switch(n) {
		case "phone":
			var pn = phoneNumber(v);
			message(pn,"phone","Must have 10 digits",n,v);    
			break;
		
		case "fname":
			var fn = birthName(v);
			message(fn,"firstname","Alphabetical characters only",n,v); 
			break;
		
		case "lname":
			var ln = birthName(v);
			message(ln,"lastname","Alphabetical characters only",n,v);
			break;
		
		case "name":
			var fln = fullName(v);
			message(fln,"name","Alphabetical characters only",n,v);
			break;
		
		case "email":
			var eaddy = emailAddres(v);
			message(eaddy,"email","Email is incorrect",n,v);
			break;

		default:
			return false;
		}
	});

	function message(patternval,field,text,name,value) {
		if (patternval === false) {
			correctInputs.push("false");
			errorMsg(field, text);
		} else {
			successMsg(field, "");
		}
	}
	console.log(correctInputs);
	if (correctInputs.indexOf("false") === -1) {
		return true;
	} else {
		console.log("errors");
		return false;
	}
}



function errorMsg(field, msg) {
	$("#" + field).next(".js-errormsg").html(msg);
	errorClass(field);
}
function successMsg(field, msg) {
	$("#" + field).next(".js-errormsg").html(msg);
	correctClass(field);
}

function phoneNumber(phone) {
	if (phone === null || phone === "") {
		return undefined;
	} else {
		var regex = /^\d{10}$/;
		if (regex.test(phone) === false) {
			return false;
		} else {
			return true;
		}
	}
}
function emailAddres(email) {
	var regex = /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/;
	if (regex.test(email) === false) {
		return false;
	} else {
		return true;
	}
}
function birthName(name) {
	var regex = /[\d\W]/;
	if (regex.test(name)) {
		return false;
	} else {
		return true;
	}
}
function fullName(name) {
	var regex = /[\d\s{2,}]/;
	if (regex.test(name)) {
		return false;
	} else {
		return true;
	}
}

