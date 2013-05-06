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
				alert(ajax.responseText)
			} else {
				//code to handle error
			}
		}
	}
	ajax.open("GET","currentschedule.php?d="+date,true);
	ajax.send();
}