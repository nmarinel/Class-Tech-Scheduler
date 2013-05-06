window.onload = pageLoad;

function pageLoad() {
	/*********************
	*POPULATE WEEKOF DROPDOWN*
	*********************/
	
	var mondays = new Array();
	var select = document.getElementById("weekof_dropdown");
	var firstMonday = new Date();
	var d; // a nice date in the form yyyy-mm-dd (for mySQL)
	firstMonday.setFullYear(2013, 0, 7);
	
	for (var i = 0; i < 52; i++) {
		mondays[i] = new Date();
		mondays[i].setMonth(firstMonday.getMonth());
		mondays[i].setDate(firstMonday.getDate()+(i*7));
		d = mondays[i].getFullYear() + "-" + (mondays[i].getMonth() + 1) + "-" + mondays[i].getDate();
		select.options.add(new Option(mondays[i].toDateString(), d));
	};
	
}

function getShiftIDs(){
    var shiftNodes = document.getElementsByTagName("textarea"); //returns a nodelist of textareas
    var shiftIDs = new Array();
    for (var i = 0; i < shiftNodes.length; i++) {
        shiftIDs[i] = shiftNodes.item(i).id;
    };
    return shiftIDs;
}

function updateShifts(){
	var ajax = new XMLHttpRequest();
	var s = document.getElementById("weekof_dropdown");
	var date = s.options[s.selectedIndex].value;//the monday of the week to be queried
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200){
				//alert(ajax.responseText);
				fillInShifts(JSON.parse(ajax.responseText));
			} else {
				//code to handle error
			}
		}
	}
	ajax.open("GET","currentschedule.php?d="+date,true);
	ajax.send();
}

function fillInShifts(data){
    var shiftNodes = document.getElementsByTagName("textarea"); //returns a nodelist of textareas
    var id, ta;

    for (var i = 0; i < data.length; i++) {
    	if (data[i].time != "desk")
    		id = getIdFromDate(data[i].s_date, data[i].time);
    	ta = document.getElementById(id);
    	ta.value = data[i].name;
    };
}

function getIdFromDate(date, time){
	var id;
	var darray = date.split("-"); // {yyyy}{mm}{dd}
	var tarray = time.split(":");
	var jsDate = new Date();
	jsDate.setFullYear(darray[0]);
	jsDate.setMonth(darray[1] - 1);
	jsDate.setDate(darray[2]);

	var day_int = jsDate.getDay();
	var d;
	if (day_int == 0) d = 'sun';
	else if (day_int == 1) d = 'm';
	else if (day_int == 2) d = 't';
	else if (day_int == 3) d = 'w';
	else if (day_int == 4) d = 'r';
	else if (day_int == 5) d = 'f';
	else if (day_int == 6) d = 'sat';
	else alert("well, shit.  Invalid day.");

	var t = tarray[0] + tarray[1];
	// check for duplicate morning shifts (not acually what this is doing.  TODO)
	if (t == '0700')
		t='0700-1';

	id = d + "-" + t;
	return id;
}