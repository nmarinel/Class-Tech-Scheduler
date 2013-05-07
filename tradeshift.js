window.onload = pageLoad;

function pageLoad() {
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	var day_int = currentDate.getDay();
	
	addInitialsToSchedule();

	$('#todays_date_display').html("<b>" + day + "/" + month + "/" + year + "</b>");
	
	$('#add_row').click(addRow);
	$('#submit').click(addInitialsToSchedule); //we'll work on it?
}

function addRow() {
	var table = document.getElementById('tradeshift_table');
	var newRow = table.insertRow(table.rows.length);
	
	createRowElements(newRow);
}

function createRowElements(row) {
	var cell1 = row.insertCell(0);
	createCell(cell1, 'name');
	
	var cell2 = row.insertCell(1);
	createCell(cell2, 'date');
	
	var cell3 = row.insertCell(2);
	createCell(cell3, 'time');
	
	var cell4 = row.insertCell(3);
	createCell(cell4, 'covering');
}
	
function createCell(cell, column) {
	var cell_textarea = document.createElement("textarea");
	
	cell_textarea.className = column;
	cell_textarea.name = column;
	
	if (column == "name")
		cell_textarea.setAttribute("maxlength", 3);
	else if (column == "date")
		cell_textarea.setAttribute("maxlength", 8);
	else if (column == "time")
		cell_textarea.setAttribute("maxlength", 16);
	else if (column == "covering")
		cell_textarea.setAttribute("maxlength", 3);
	
	cell_textarea.cols = "2";
	cell_textarea.rows = "1";
	
	cell.appendChild(cell_textarea);
}



/*IF we can link the schedule to a calendar*/
function addInitialsToSchedule() {
	getCoverShifts();
}
	
function getCoverShifts() {
	var table = document.getElementById('tradeshift_table');
	
	var names = document.getElementsByName('name');
	var dates = document.getElementsByName('date');
	var times = document.getElementsByName('time');
	var covered_person = document.getElementsByName('covering');

	//get info for current shits up for garbs
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200){
				//alert(ajax.responseText);
				populateTable(JSON.parse(ajax.responseText));
			} else {
				//code to handle error
			}
		}
	}
	ajax.open("GET","openshifts.php",true);
	ajax.send();
	
	// What is this?
	for (var i = 0; i<dates.length; i++) {
		var newDateArray = dates[i].split("/");
		var mm = newDateArray[0];
		var dd = newDateArray[1];
		var yy = newDateArray[2];
		
		var coverDate = new Date(yy,mm,dd);
		var coverTime = times[i]; //we would need regex if this were to work
		findShiftInSchedule(coverDate, coverTime);
	}
		
}
function populateTable(data){
	var names = document.getElementsByName('name');
	var dates = document.getElementsByName('date');
	var times = document.getElementsByName('time');

    for (var i = 0; i < data.length; i++) {
		names[i].value = data[i].name;	
		dates[i].value = data[i].date;	
		times[i].value = data[i].time;	
	}
}
function findShiftInSchedule(date, time) {
	
}

/*
var months = new Array("January", "February", "March", "April", "May", "June", "Junly", "August", "September", "October", "November", "December");
var days_in_months = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
*/
