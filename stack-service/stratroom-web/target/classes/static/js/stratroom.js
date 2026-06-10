var numbers	=	["1","2","3","4","5","6","7","8","9","0"];

/*var formulalistbuilder	=	[
	{"id":"if","desc":"IF(condition,value_if_true,value_if_false) <br> Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc')"},
	{"id":"min","desc":"MIN(e1,e2, ...) <br> Returns the smallest of the given expressions <br>MIN[KPI1, KPI2]"},
	{"id":"max","desc":"MAX(e1,e2, ...) <br> Returns the biggest of the given expressions <br> MAX[KPI1,KPI2]"},
	{"id":"sum","desc":"SUM(e1,e2,…) <br> Returns the sum of the given expressions <br> SUM[KPI1,KPI2]"},
	{"id":"agg","desc":"agg(e1,e2,…) <br> Returns the sum of the given expressions <br> agg[KPI1,KPI2] <br> agg(sum[KPI1,KPI2])"},
	{"id":"avg","desc":"avg(e1,e2,…) <br> Returns the sum of the given expressions <br> avg[KPI1,KPI2]"},
	{"id":"median","desc":"The median formula is {(n + 1) ÷ 2}th, where 'n' is the number of items in the set and 'th' just means the (n)th number. To find the median, first order the numbers from smallest to largest. Then find the middle number"},
	{"id":"count","desc":"count(e1,e2,…) <br> Returns the count of the given expressions <br> count[ACTUAL]+count[RG] = value"}
]

var formulalistperformance	=	[
	{"id":"if","desc":"IF(condition,value_if_true,value_if_false) <br> Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc') IF(ACTUAL=0,0,ACTUAL/TARGET), IF(sum(ACTUAL)=0,0,sum(ACTUAL)/sum(TARGET)) , IF(sum[RG|OG]=0,0,sum[RG|OG]/sum[RG|OG])"},
	{"id":"min","desc":"MIN(e1,e2, ...) <br> Returns the smallest of the given expressions <br>MIN(ACTUAL, TARGET) <br>MIN(agg[RG],agg[OG])"},
	{"id":"max","desc":"MAX(e1,e2, ...) <br> Returns the biggest of the given expressions <br> MAX(ACTUAL, TARGET) <br> MAX(agg[RG],agg[OG])"},
	{"id":"sum","desc":"SUM(e1,e2,…) <br> Returns the sum of the given expressions <br> SUM(ACTUAL) <br> SUM(agg[RG],agg[OG])"},
	{"id":"agg","desc":"agg(e1,e2,…) <br> Returns the sum of the given expressions <br> agg(ACTUAL) <br> agg(sum[RG],sum[OG])"},
	{"id":"avg","desc":"avg(e1,e2,…) <br> Returns the sum of the given expressions <br> avg(ACTUAL) <br> avg[RG] <br> avg(avg[RG],avg[OG])"},
	{"id":"median","desc":"The median formula is {(n + 1) ÷ 2}th, where 'n' is the number of items in the set and 'th' just means the (n)th number. To find the median, first order the numbers from smallest to largest. Then find the middle number"},
	{"id":"count","desc":"count(e1,e2,…) <br> Returns the count of the given expressions <br> count[ACTUAL]+count[RG] = value"}
]*/

var formulalistbuilder	=	[
	{"id":"if","desc":"Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc')"},
	{"id":"min","desc":"Returns the smallest of the given expressions <br>MIN[KPI1, KPI2]"},
	{"id":"max","desc":"Returns the biggest of the given expressions <br> MAX[KPI1,KPI2]"},
	{"id":"sum","desc":"Returns the sum of the given expressions <br> SUM[KPI1,KPI2]"},
	{"id":"agg","desc":"Returns the sum of the given expressions <br> agg[KPI1,KPI2] <br> agg(sum[KPI1,KPI2])"},
	{"id":"avg","desc":"Returns the sum of the given expressions <br> avg[KPI1,KPI2]"},
	{"id":"median","desc":"The median formula is {(n + 1) ÷ 2}th, where 'n' is the number of items in the set and 'th' just means the (n)th number. To find the median, first order the numbers from smallest to largest. Then find the middle number"},
	{"id":"count","desc":"Returns the count of the given expressions <br> count[ACTUAL]+count[RG] = value"}
]

var formulalistperformance	=	[
	{"id":"if","desc":"Returns second argument if first argument is true; Returns optional third argument if first argument is false; IF([KPI1, KPI2], 'trueCalc', 'falseCalc') IF(ACTUAL=0,0,ACTUAL/TARGET), IF(sum(ACTUAL)=0,0,sum(ACTUAL)/sum(TARGET)) , IF(sum[RG|OG]=0,0,sum[RG|OG]/sum[RG|OG])"},
	{"id":"min","desc":"Returns the smallest of the given expressions <br>MIN(ACTUAL, TARGET) <br>MIN(agg[RG],agg[OG])"},
	{"id":"max","desc":"Returns the biggest of the given expressions <br> MAX(ACTUAL, TARGET) <br> MAX(agg[RG],agg[OG])"},
	{"id":"sum","desc":"Returns the sum of the given expressions <br> SUM(ACTUAL) <br> SUM(agg[RG],agg[OG])"},
	{"id":"agg","desc":"Returns the sum of the given expressions <br> agg(ACTUAL) <br> agg(sum[RG],sum[OG])"},
	{"id":"avg","desc":"Returns the sum of the given expressions <br> avg(ACTUAL) <br> avg[RG] <br> avg(avg[RG],avg[OG])"},
	{"id":"median","desc":"The median formula is {(n + 1) ÷ 2}th, where 'n' is the number of items in the set and 'th' just means the (n)th number. To find the median, first order the numbers from smallest to largest. Then find the middle number"},
	{"id":"count","desc":"Returns the count of the given expressions <br> count[ACTUAL]+count[RG] = value"}
]

function getformulabuilder(prop){
	var matchcontent	=	"";
	if(prop	==	"" && prop	==	null){
		return matchcontent;
	}
	
	for (var index = 0; index < formulalistbuilder.length; ++index) {
		if(formulalistbuilder[index]['id']	==	prop){
			matchcontent	=	formulalistbuilder[index]['desc'];
			return matchcontent;
			return false;
		}
		
	}
	return matchcontent;
}

function getformulaperformance(prop){
	var matchcontent	=	"";
	if(prop	==	"" && prop	==	null){
		return matchcontent;
	}
	
	for (var index = 0; index < formulalistperformance.length; ++index) {
		if(formulalistperformance[index]['id']	==	prop){
			matchcontent	=	formulalistperformance[index]['desc'];
			return matchcontent;
			return false;
		}
		
	}
	return matchcontent;
}


function hasWhiteSpaceName(firstname,lastname) {
	var fullname	=	"";
	if((firstname	!=	'' && firstname	!=	undefined)	&& (lastname !=	"" && lastname	!=	undefined)){
		var first	=	firstname.substr(0,1);
		var last	=	lastname.substr(0,1);
		fullname	=	first+last;
	}else if(firstname	!=	'' && firstname	!=	undefined){
		var result	=	/\s/g.test(firstname);
		if(result	==	true){
			var positionofspace	=	firstname.indexOf(' ');
			var first	=	firstname.substr(0,1);
			var last	=	firstname.substr(parseInt(positionofspace)+1,1);
			if(last	==	"&" || last	==	' '){
				var positionoflast	=	firstname.lastIndexOf(' ');
				last	=	firstname.substr(parseInt(positionofspace+1)+1,1);
				if(last	==	"&" || last	==	' '){
					last	=	firstname.substr(parseInt(positionoflast)+1,1);
				}
			}
			fullname	=	first+last;
		}else{
			fullname	=	firstname.substring(0,2);
		}
	}
	return fullname;
}


function convertInttoStringAndStringtoInt(stringvalue){
	if(typeof stringvalue	===	"number"){
		stringvalue	=	stringvalue.toString();
	}else if(typeof stringvalue	===	"string"){
		stringvalue	=	parseInt(stringvalue);
	}
	return stringvalue;
}


function dateFormatedtohumanread(date){
	returnformatdate 	=	"";
	if(date !== null && date !== "")
	{
		const dateformat = new Date(date);
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		returnformatdate 	=	dateformat.toLocaleDateString(undefined, options);
	}

	return returnformatdate;
}

function dateFormatedtomonthyear(date){
	returnformatdate 	=	"";
	const dateformat = new Date(date);
	const options = { year: 'numeric', month: 'short'};
	returnformatdate 	=	dateformat.toLocaleDateString(undefined, options);
	return returnformatdate;
}

function dateFormatedtohumanreadwithoutyear(date){
	returnformatdate 	=	"";
	const dateformat = new Date(date);
	const options = {month: 'short', day: 'numeric' };
	returnformatdate 	=	dateformat.toLocaleDateString(undefined, options);
	return returnformatdate;
}

function datetimeFormatedtohumanread(date){
	returnformatdate 	=	"";
	var am,pm	=	"";
	
	const dateformat = new Date(date);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	var hours 	= 	"";
	var minutes = 	"";
	if(date.indexOf("am") >= 0){
		am	=	"am";
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
	}
	if(date.indexOf("pm") >= 0){
		pm	=	"pm";
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
	}
	returnformatdate 	=	dateformat.toLocaleDateString(undefined, options);
	if(am !=	""){
		returnformatdate	=	returnformatdate+' '+hours+':'+minutes+am;
	}
	if(pm !=	""){
		returnformatdate	=	returnformatdate+' '+hours+':'+minutes+pm;
	}
	return returnformatdate;
}

function timeFormatedtohumanread(date){
	var returnformatdate 	=	"";
	const dateformat = new Date(date);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	var hours 	= 	"";
	var minutes = 	"";
	if(dateformat	!=	"Invalid Date"){
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;	
		if((hours	!=	undefined && hours	!=	"")  && (minutes	!=	undefined && minutes	!=	"")){
			returnformatdate	=	hours+':'+minutes+ampm;	
		}else{
			returnformatdate	=	"";
		}	
	}
	
	return returnformatdate;
}

function timeFormatedtohumanreadwithampmspace(date){
	var returnformatdate 	=	"";
	const dateformat = new Date(date);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	var hours 	= 	"";
	var minutes = 	"";
	if(dateformat	!=	"Invalid Date"){
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;	
		if((hours	!=	undefined && hours	!=	"")  && (minutes	!=	undefined && minutes	!=	"")){
			returnformatdate	=	hours+':'+minutes+' '+ampm;	
		}else{
			returnformatdate	=	"";
		}	
	}
	
	return returnformatdate;
}

/*function timeFormatedtohumanread(date){
	var returnformatdate 	=	"";
	var am,pm	=	"";
	const dateformat = new Date(date);
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	var hours 	= 	"";
	var minutes = 	"";
	
	if(date.indexOf("am") >= 0){
		am	=	"am";
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
	}
	if(date.indexOf("pm") >= 0){
		pm	=	"pm";
		hours 	= 	dateformat.getHours();
		minutes = 	dateformat.getMinutes();
	}
	
	if(am !=	""){
		if((hours	!=	undefined && hours	!=	"")  && (minutes	!=	undefined && minutes	!=	"")){
			returnformatdate	=	hours+':'+minutes+am;	
		}else{
			returnformatdate	=	"";
		}
	}
	if(pm !=	""){
		if((hours	!=	undefined && hours	!=	"")  && (minutes	!=	undefined && minutes	!=	"")){
			returnformatdate	=	hours+':'+minutes+pm;	
		}else{
			returnformatdate	=	"";
		}
		//returnformatdate	=	(hours	!=	undefined?hours+':'+minutes+pm:"");
	}
	return returnformatdate;
}*/

function formatofAmPm(date) {
	console.log(date)
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var utcd 	= 	new Date(date +" UTC");
	var localtime = utcd.toLocaleString();
	console.log(localtime)
	var d = new Date(localtime);
	var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var month = monthNames[d.getMonth()];
	var dayName=days[d.getDay()];
	var day = d.getDate();
	var year = d.getFullYear();

	var hours = d.getHours();
	var minutes = d.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;

	var formattedTime = month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes + ' ' + ampm + ' ' + dayName;
	return formattedTime;

	
}

function readErrorMsg(msg,status){
	$(".page-loader-wrapper").css("display","none");
	if(msg.status){
		$.notify("Error: Request Could not be Processed",{
							  style: 'error',
							  className: 'graynotify'
							});
	}else if(!jQuery.isEmptyObject(msg.responseText)){
		$.each(JSON.parse(msg.responseText),function(key,value){
			if(key 	==	"exception"){
				$.notify("Error:"+value, {
							  style: 'error',
							  className: 'graynotify'
							});
			}
			if(key 	==	"error"){
				$.notify("Error:"+value, {
							  style: 'error',
							  className: 'graynotify'
							});
			}
		});
		
	}
}

function intergerHumanFormat(nStr){
	if(nStr	==	"" || nStr	==	undefined){
		return "";
	}
	 
	if(nStr	==	-1 || nStr !=	-0){
		nStr += ''; 
		var x = nStr.split('.');
		 var x1 = x[0];
		 var x2 = x.length > 1 ? '.' + x[1] : '';
		 var rgx = /(\d+)(\d{3})/;
		 while (rgx.test(x1)) {
		  x1 = x1.replace(rgx, '$1' + ',' + '$2');
	 }
	 return x1 + x2;
	 }else{
		return nStr;
	}
	 
}


function capitalizeFLetter(input) { 
	if(typeof(input)	==	"string"){
		return input.charAt(0).toUpperCase() +input.slice(1);	
	}else{
		return input;
	}	
}

function uppercaseWord(str) {
	str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
	    return letter.toUpperCase();
	}); 
}

/*function splitnumbercharacter(input) { 
	var output	=	[];
	if(input !=	undefined && input !=	"" && isNaN(input)){
		input				=	input.replace(/\s/g,"");
		output['number']	=	input.replace(/[^0-9]+/g, "");
		var letter			=	input.replace(/[!0-9]+/g, "");
		output['letter']	=	letter;
		if(letter.length == 1){
			output['firstletter']	=	(letter == input.substring(0,1)?letter:"");
			output['lastletter']	=	(letter == input.slice(-1)?letter:"");
		}else{
			output['firstletter']	=	(letter !=	undefined && letter !=	"" && isNaN(letter)?letter.substring(0,1):"");
			output['lastletter']	=	(letter !=	undefined && letter !=	"" && isNaN(letter)?letter.slice(-1):"");
		}
		
	}else{
		var startingposition	=	"";
		if(typeof(input)	===	"string"){
			startingposition=	input.charAt(0);
		}
		
		if(startingposition	==	"-" || startingposition	==	"+"){
			input		=	input.substring(1);
		}
		
		if(Number.isInteger(input)){
			output['number']	=	input;
			output['firstletter']	=	(startingposition !=	""?startingposition:"");
			output['letter']	=	"";
			output['lastletter']	=	"";
		}else{
			output['number']	=	input;
			var checkfisrtstring	=	(startingposition !=	""?startingposition:"");
			var checklaststring		=	"";
			if(typeof(input) == "string"){
				checkfisrtstring	=	(startingposition !=	""?startingposition:input.substring(0,1));
				checklaststring		=	input.slice(-1);
			}else{
				checkfisrtstring	=	(startingposition !=	""?startingposition:"");
				checklaststring		=	"";
			}
			
			output['firstletter']	=	($.inArray(checkfisrtstring,numbers) == -1?checkfisrtstring:"");
			output['letter']	=	"";
			output['lastletter']	=	($.inArray(checklaststring,numbers) == -1?checklaststring:"");
		}
	}
	return output;
}*/

function splitnumbercharacter(input) { 
	var output	=	[];
	if(input	==	"" || input	==	undefined){
		output['firstletter']	=	"";
		output['letter']	=	"";
		output['lastletter']	=	"";
		output['number']	=	"";
		return 	output;
	}
	
	if(input !=	undefined && input !=	"" && isNaN(input)){
		if(typeof(input)	===	"number"){
			input			=	convertInttoStringAndStringtoInt(input);	
		}
		var checklaststring		=	"";
		var startingposition	=	"";
		checklaststring		=	input.slice(-1);
		if(typeof(input)	===	"string"){
			startingposition=	input.charAt(0);
			startingposition		=	($.inArray(startingposition,numbers) == -1?startingposition:"");
		}
		
		if(startingposition	==	"-" || startingposition	==	"+"){
			input		=	input.substring(1);
		}
		input				=	input.replace(/\s/g,"");
		var letter			=	"";
		input				=	input.replace(/[^0-9.]+/g, "");
		letter				=	input.replace(/[!0-9.]+/g, "");
		checklaststring		=	($.inArray(checklaststring,numbers) == -1?checklaststring:"");
		if(!Number.isInteger(input)){
			output['number']	=	input;
			output['firstletter']	=	(startingposition !=	""?startingposition:"");
			output['letter']	=	"";
			output['lastletter']	=	checklaststring;
		}else{
			output['number']	=	input;
			var checkfisrtstring	=	(startingposition !=	""?startingposition:"");
			if(typeof(input) == "string"){
				checkfisrtstring	=	(startingposition !=	""?startingposition:input.substring(0,1));
				checklaststring		=	input.slice(-1);
			}else{
				checkfisrtstring	=	(startingposition !=	""?startingposition:"");
				checklaststring		=	"";
			}
			
			output['firstletter']	=	($.inArray(checkfisrtstring,numbers) == -1?checkfisrtstring:"");
			output['letter']	=	"";
			output['lastletter']	=	($.inArray(checklaststring,numbers) == -1?checklaststring:"");
		}
		
	}else if(input !=	undefined && input !=	"" && isNaN(input) == false){
		if(typeof(input)	===	"number"){
			input			=	convertInttoStringAndStringtoInt(input);	
		}
		input				=	input.replace(/\s/g,"");
		var letter			=	"";
		output['number']=	input.replace(/[^0-9.]+/g, "");
		letter			=	input.replace(/[!0-9.]+/g, "");
		
		output['letter']	=	letter;
		if(letter.length == 1){
			output['firstletter']	=	(letter == input.substring(0,1)?letter:"");
			output['lastletter']	=	(letter == input.slice(-1)?letter:"");
		}else{
			output['firstletter']	=	(letter !=	undefined && letter !=	"" && isNaN(letter)?letter.substring(0,1):"");
			output['lastletter']	=	(letter !=	undefined && letter !=	"" && isNaN(letter)?letter.slice(-1):"");
		}
		
	}else{
		if(input !=	undefined && input !=	''){	
			if(typeof(input)	===	"number"){
				input			=	convertInttoStringAndStringtoInt(input);	
			}
			var checklaststring		=	"";
			var startingposition	=	"";
			checklaststring		=	input.slice(-1);
			if(typeof(input)	===	"string"){
				startingposition=	input.charAt(0);
				startingposition		=	($.inArray(startingposition,numbers) == -1?startingposition:"");
			}
			
			if(startingposition	==	"-" || startingposition	==	"+"){
				input		=	input.substring(1);
			}
			input				=	input.replace(/\s/g,"");
			var letter			=	"";
			input				=	input.replace(/[^0-9.]+/g, "");
			letter				=	input.replace(/[!0-9.]+/g, "");
			checklaststring		=	($.inArray(checklaststring,numbers) == -1?checklaststring:"");
			if(!Number.isInteger(input)){
				output['number']	=	input;
				output['firstletter']	=	(startingposition !=	""?startingposition:"");
				output['letter']	=	"";
				output['lastletter']	=	checklaststring;
			}else{
				output['number']	=	input;
				var checkfisrtstring	=	(startingposition !=	""?startingposition:"");
				if(typeof(input) == "string"){
					checkfisrtstring	=	(startingposition !=	""?startingposition:input.substring(0,1));
					checklaststring		=	input.slice(-1);
				}else{
					checkfisrtstring	=	(startingposition !=	""?startingposition:"");
					checklaststring		=	"";
				}
				
				output['firstletter']	=	($.inArray(checkfisrtstring,numbers) == -1?checkfisrtstring:"");
				output['letter']	=	"";
				output['lastletter']	=	($.inArray(checklaststring,numbers) == -1?checklaststring:"");
			}
		}else{
			output['firstletter']	=	"";
			output['letter']	=	"";
			output['lastletter']	=	"";
			output['number']	=	"";
		}
	}
	return output;
}

function setInputFilter(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

function specialcharsconvertToNumberFormat(numberStr) {
	var numberformat	=	[];
	numberformat["currency"]	=	"";
	numberformat["number"]		=	"";
	
	if(numberStr	!=	'' && numberStr	!=	undefined){
		var checkSpecialStr	=	"";
		if(isNaN(numberStr) == true){
			numberStr	=	numberStr.replace(/\s/g,"");
			numberStr	=	numberStr.replace(/,/g,"");
			checkSpecialStr	=	numberStr.charAt(0);
		}
		
		if(checkSpecialStr !=	"" && checkSpecialStr !=	undefined && isNaN(checkSpecialStr)){
			numberStr	=	numberStr.substring(1,numberStr.length);
			numberformat["currency"]	=	checkSpecialStr;
			numberformat["number"]		=	numberStr;
		}else{
			numberformat["number"]		=	numberStr;
		}
	}else{
		numberformat["number"]			=	(numberStr	==	undefined?"":numberStr);
	}
	
	numberformat["currencynumber"]		=	intergerHumanFormat(numberformat["number"]);	
	return numberformat;
}


function formatNumber(n) {
  // format number 1000000 to 1,234,567
	if(n==null){
		return "";
	}
  	return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function replaceexceptNumber(n) {
	  // format number 1000000 to 1,234,567
	return n.replace(/[^0-9.,]/g, "");
}

function capitalizefisrt(input){
	if(input != "" && input != undefined){
		if(typeof input	===	"string"){
			input		=	input.charAt(0).toUpperCase() +input.slice(1);
		}
	}
	return input;
} 



function restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || (x == 37 || x == 189 || x == 190 || x == 45 || x == 46))
    	return true;
    else
    	return false;
}

function allowDecimal(event) {
	if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
}

function allownumbers(evt) {
	 var charCode = (evt.which) ? evt.which : evt.keyCode;
     var keyChar = String.fromCharCode(charCode);
     var regex = /^([-](?=\.?\d))?(\d+)?(\.\d+)?$/;
    return regex.test(keyChar);
}

function formatCurrency(input,typeofinput, blur) {
	if(typeofinput !=	undefined && typeofinput !=	""){
		  var currencyinput	=	["~","`","\\",'"',";",":",".","!","/","<",">","?","@","#","^","&","*","(",")","=","_",
			  "{","[","]","}","|","+",
			  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","s","t","u","v","w","x",
			  "y","z","A","B","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X",
			  "Y","Z"];
		  // get input value
		  if(typeofinput	==	"value"){
			  var input_val = input.val();
		  }else if(typeofinput	==	"text"){
			  var input_val = input.text();
		  }else if(typeofinput	==	"html"){
			  var input_val = input.html();
		  }else{
			  var input_val = "";
		  }
		  
		  
		  if(isNaN(input_val) == true){
			  input_val	=	input_val.replace(/\s/g,"");
		  }
		  
		  // don't validate empty input
		  if (input_val === "") { return; }
	
		  if(input_val.length >= 20){
			  input_val	=	input_val.substring(0,20);
		  }
		  // original length
		  var original_len = input_val.length;
	
		  // initial caret position 
		  var caret_pos = input.prop("selectionStart");
		  
		  // if found double or double dot remove
		  if (input_val.indexOf(",,") >= 0) {
				var checktwomorecomma 	=	input_val.indexOf(",,");
				input_val	=	input_val.substring(0,checktwomorecomma+1);
		  }
		  
		  if (input_val.indexOf("..") >= 0) {
				var checktwomorecomma 	=	input_val.indexOf("..");
				input_val	=	input_val.substring(0,checktwomorecomma+1);
		  }
		  
		  if (input_val.indexOf("%%") >= 0) {
				var checktwomorecomma 	=	input_val.indexOf("%%");
				input_val	=	input_val.substring(0,checktwomorecomma+1);
		  }
		  
		  if (input_val.indexOf(",.") >= 0) {
				var checktwomorecomma 	=	input_val.indexOf(",.");
				var startingletter		=	input_val.substring(0,checktwomorecomma);
				var lastletter			=	input_val.substring(checktwomorecomma+1);
				input_val				=	startingletter+lastletter;
		  }

		  //find replace
		  if(input_val.length > 0){
			  for(var i=0;i<=input_val.length;i++){
				  if($.inArray(input_val[i],currencyinput) !==	-1){
					  input_val	=	input_val.replace("/"+input_val[i]+"/g","");
				  }
			  }
		  }  
		  
		  var startingposition	=	input_val.charAt(0);
		  // check for decimal
		  if (input_val.indexOf(".") >= 0 && input_val.indexOf("%") == -1) {
		    // being entered
		    var decimal_pos = input_val.indexOf(".");
		    // split number by decimal point
		    var left_side = input_val.substring(0, decimal_pos);
		    var right_side = input_val.substring(decimal_pos);
		    var left_sideposition	=	left_side.charAt(0);
		    
		    if(isNaN(left_sideposition)){
				if($.inArray(left_sideposition,currencyinput) ==	-1){
					left_side = left_sideposition+replaceexceptNumber(left_side.substring(1));
				}else{
					left_side = replaceexceptNumber(left_side);
				}
			}else{
			    left_side = replaceexceptNumber(left_side);
			}
		    
		    // validate right side
		    right_side = formatNumber(right_side);
		    
		    // Limit decimal to only 2 digits
		    right_side = right_side.substring(0, 2);
	
		    // join number by .
		    input_val = left_side + "." + right_side;
	
		  }else if ((input_val.endsWith("%") == true || input_val.startsWith("%") == true || input_val.indexOf("%") >= 0 ) && input_val.indexOf(".") == -1) {
			  var lastchar	=	"";
			  var remainingchar	=	"";
			  var startwidthper	=	input_val.startsWith("%");
			  var endswidthper	=	input_val.endsWith("%");
			  var startwithother	=	input_val.slice(0,1);
			  var findlastindexofper	=	input_val.lastIndexOf("%");  
			  //check if currency with %
			  var currencywithper	=	input_val.slice(1,2);
			  var currencywithval	=	false;
			  var currencywithvalper	=	false;
			  
			  if(findlastindexofper !=	-1 && startwidthper ==	false && currencywithper	!=	"%")
			  {
				  var left_side = 	input_val.substring(0, findlastindexofper+1);
				  input_val		=	left_side;
			  }
			  
			  if(currencywithper	==	"%" && $.inArray(startingposition,currencyinput) ==	-1){
				  lastchar	=	input_val.slice(-1);
				  currencywithval	=	true;
				  remainingchar	=	input_val.slice(2);
				  input_val 	= 	startingposition+currencywithper+replaceexceptNumber(remainingchar);
			  }
			  
			  if(endswidthper		==	true && $.inArray(startwithother,currencyinput) ==	-1 && currencywithper	!=	"%"){
				  lastchar		=	input_val.slice(-1);
				  currencywithvalper	=	true;
				  remainingchar	=	input_val.slice(1,input_val.length-1);
				  input_val 	= 	startingposition+replaceexceptNumber(remainingchar)+lastchar;
			  }
			  
			  if(endswidthper		==	true && $.inArray(startwithother,currencyinput) ==	-1 && currencywithper	==	"%"){
				  lastchar		=	input_val.slice(-1);
				  currencywithvalper	=	true;
				  remainingchar	=	input_val.slice(2,input_val.length-1);
				  input_val 	= 	startingposition+currencywithper+replaceexceptNumber(remainingchar);
			  }
			  
			  if(endswidthper	==	true && startwidthper !=	true && currencywithval ==	false && currencywithvalper ==	false){
				  lastchar	=	input_val.slice(-1);
				  remainingchar	=	input_val.slice(0,input_val.length-1)
				  input_val 	= 	replaceexceptNumber(remainingchar)+lastchar;
			  }else if(startwidthper	==	true && currencywithval ==	false){
				  remainingchar	=	input_val.slice(1);
				  input_val 	= 	startingposition+replaceexceptNumber(remainingchar);
			  }
		
		  }else if (input_val.startsWith("%") == true && input_val.indexOf(".") >= 0) {			
			  var decimal_pos = input_val.indexOf(".");
		      var left_side = input_val.substring(0, decimal_pos);
			  var right_side = input_val.substring(decimal_pos);
		      var left_sideposition	=	left_side.charAt(0);
		    
		      if(isNaN(left_sideposition)){
				if($.inArray(left_sideposition,currencyinput) ==	-1){
					left_side = left_sideposition+replaceexceptNumber(left_side.substring(1));
				}else{
					left_side = replaceexceptNumber(left_side);
				}
			  }else{
			    left_side = replaceexceptNumber(left_side);
			  }
		      right_side = formatNumber(right_side);
		      right_side = right_side.substring(0, 2);
		      input_val = left_side + "." + right_side;
		
		  } else {
			//($.inArray(checkfisrtstring,numbers) == -1?checkfisrtstring:"");
			
			if(isNaN(startingposition)){
				if($.inArray(startingposition,currencyinput) ==	-1){
					input_val = startingposition+replaceexceptNumber(input_val.substring(1));
				}else{
					input_val = replaceexceptNumber(input_val);
				}
			}else{
				input_val = replaceexceptNumber(input_val);
			}
		  }
		  
		  if(typeofinput	==	"value"){
			  input.val(input_val);
		  }else if(typeofinput	==	"text"){
			  input.text(input_val);
		  }else if(typeofinput	==	"html"){
			  input.html(input_val);
		  }else{
			  input.val("");
		  }
	
		  // put caret back in the right position
		  var updated_len = input_val.length;
		  caret_pos = updated_len - original_len + caret_pos;
		  if(typeofinput	==	"value"){
			  input[0].setSelectionRange(caret_pos, caret_pos);
		  }
		  
		}
	}

/*function formatCurrency(input,typeofinput, blur) {
	  // appends $ to value, validates decimal side
	  // and puts cursor back in right position.
	if(typeofinput !=	undefined && typeofinput !=	""){
		  var currencyinput	=	["$","€","₹","-"];
		  // get input value
		  if(typeofinput	==	"value"){
			  var input_val = input.val();
		  }else if(typeofinput	==	"text"){
			  var input_val = input.text();
		  }else if(typeofinput	==	"html"){
			  var input_val = input.html();
		  }else{
			  var input_val = "";
		  }
		  
		  
		  if(isNaN(input_val) == true){
			  input_val	=	input_val.replace(/\s/g,"");
		  }
		  
		  
		  // don't validate empty input
		  if (input_val === "") { return; }
	
		  if(input_val.length >= 20){
			  input_val	=	input_val.substring(0,20);
		  }
		  // original length
		  var original_len = input_val.length;
	
		  // initial caret position 
		  var caret_pos = input.prop("selectionStart");
		  
		  var startingposition	=	input_val.charAt(0);
		  // check for decimal
		  if (input_val.indexOf(".") >= 0 && input_val.indexOf("%") == -1) {
	
		    // get position of first decimal
		    // this prevents multiple decimals from
		    // being entered
		    var decimal_pos = input_val.indexOf(".");
	
		    // split number by decimal point
		    var left_side = input_val.substring(0, decimal_pos);
		    var right_side = input_val.substring(decimal_pos);
		    var left_sideposition	=	left_side.charAt(0);
		    
		    if(isNaN(left_sideposition)){
				if($.inArray(left_sideposition,currencyinput) !==	-1){
					left_side = left_sideposition+formatNumber(left_side.substring(1));
				}else{
					left_side = formatNumber(left_side);
				}
			}else{
			    left_side = formatNumber(left_side);
			}
		    
		    // add commas to left side of number
	
		    // validate right side
		    right_side = formatNumber(right_side);
		    
		    // On blur make sure 2 numbers after decimal
		    //if (blur === "blur") {
		      //right_side += "00";
		    //}
		    
		    // Limit decimal to only 2 digits
		    right_side = right_side.substring(0, 2);
	
		    // join number by .
		    input_val = left_side + "." + right_side;
	
		  }else if (isNaN(input_val) && input_val.endsWith("%") == true) {
			  var lastchar	=	input_val.slice(-1);
			  var remainingchar	=	input_val.slice(1,input_val.length-1);
			  
				if($.inArray(startingposition,currencyinput) !==	-1){
					input_val = startingposition+formatNumber(remainingchar)+lastchar;
				}else{
					input_val = formatNumber(remainingchar)+lastchar;
				}
				
		
			  } else {
				  console.log(input_val);
		    // no decimal entered
		    // add commas to number
		    // remove all non-digits
			
			if(isNaN(startingposition)){
				if($.inArray(startingposition,currencyinput) !==	-1){
					input_val = startingposition+formatNumber(input_val.substring(1));
				}else{
					input_val = formatNumber(input_val);
				}
			}else{
				input_val = formatNumber(input_val);
			}  
			
		    //input_val = formatNumber(input_val);
		    //input_val = "$" + input_val;
		    
		    // final formatting
		    //if (blur === "blur") {
		      //input_val += ".00";
		    //}
		  }
		  
		  if(typeofinput	==	"value"){
			  input.val(input_val);
		  }else if(typeofinput	==	"text"){
			  input.text(input_val);
		  }else if(typeofinput	==	"html"){
			  input.html(input_val);
		  }else{
			  input.val("");
		  }
	
		  // put caret back in the right position
		  var updated_len = input_val.length;
		  caret_pos = updated_len - original_len + caret_pos;
		  if(typeofinput	==	"value"){
			  input[0].setSelectionRange(caret_pos, caret_pos);
		  }
		  
		}
	}*/


String.prototype.replaceallstring = function() {
   return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_");
}

function checkPositiveorNegative(input){
	if(input !=	undefined && typeof(input) ==	"string" && input.indexOf("-") !=	-1){
		return 1;
	}else if(input !=	undefined && typeof(input) ==	"number" && (Math.sign(input) == "-1" || Math.sign(input) == "-0")){
		return 1;
	}
	return 0;
}

function alignModal(){
    var modalDialog = $(this).find(".modal-dialog");
    modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
}

function convertmoneytonumber(value){
	if(value	==	undefined && value	==	""){
		return "";
	}
	var numberformat 	=	(typeof value === "number"?convertInttoStringAndStringtoInt(value):value);
    var number = 	Number(numberformat.replace(/[^0-9.-]+/g,""));
    return number;
}