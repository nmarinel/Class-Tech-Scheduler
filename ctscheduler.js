var nameArray;
var currIndex, nextIndex;
var prevIndex = null;
var currentId, initialNum;


window.onload = pageLoad;

function pageLoad() {
	
	/*********************
	*DISPLAY CURRENT DATE*
	*********************/
	
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	var day_int = currentDate.getDay();
	
	var day_of_week;
	if (day_int == 0) day_of_week = 'Sunday';
	else if (day_int == 1) day_of_week = 'Monday';
	else if (day_int == 2) day_of_week = 'Tuesday';
	else if (day_int == 3) day_of_week = 'Wednesday';
	else if (day_int == 4) day_of_week = 'Thursday';
	else if (day_int == 5) day_of_week = 'Friday';
	else if (day_int == 6) day_of_week = 'Saturday';
	
	$('#date_display').html("<b>" + day + "/" + month + "/" + year + "</b>");
	$('#' + day_of_week).css('background-color','yellow');
	
	
	/********************
	*INITIALIZE CONTROLS*
	*********************/
	$("#randomizingNotification").hide(); //this is visible briefly once the user enters initials, just to tell the user what's happening
    $("#enter_names").click(orderNames); //this is the first thing the user should click: enter names then reorder them
	$("#prev_arrow").click(prevUser); //if clicked, move to previous turn
	$("#next_arrow").click(nextUser); //if clicked, move to next turn
	$("#deleteButton").click(deleteUser);//if clicked, delete user

	$('.shift').attr('maxlength',3);   //this works if we only want initials
	$('.picker_names_textarea').attr('maxlength',3);   //this works if we only want initials
	
	$('textarea').bind('keypress', function(e) {
   		if(e.keyCode==13) {
   			e.preventDefault();
			$(this).val($('#currentPick').val());
				
			//move to the nextIndexperson
			$("#next_arrow").click();
			
			//make noise
			//$('#the_schedule_div').append('<embed src="mario_jump.mp3" autostart="true" hidden="true" loop="false">');
 		}
 	}).bind('blur', function() {
		//If the shift has been filled, change background color to indicate so
		if( $(this).val().length ==2 || $(this).val().length ==3 ) {
			$(this).css('background-color', '#e8e8e8');
			$(this).parent().css('background-color', '#e8e8e8');
		}
			
		//if it's empty, keep it white
		else {
			$(this).css('background-color', 'white');
			$(this).parent().css('background-color', 'white');
		}
	});
}

//SHOW TABLE TO ENTER NAMES
function orderNames(event) {
    
	$('#tableOfNames').css('visibility', 'visible');
    $('#tableOfNames').css('z-index', '3');
    
	$("#submitNames").click(submitNames);
	$("#add_row").click(addRow);
}

//CREATE ARRAY OF NAMES AND RANDOMIZE THEM
function submitNames(event) {

	var arrayOfNames = new Array();
	
	$('.name').each( function() {
		if($(this).val() != "") 
			arrayOfNames.push( $(this).val() );
	});
	
	nameArray = arrayOfNames;
	
	$('#tableOfNames').css('visibility', 'hidden');
    $('#tableOfNames').css('z-index', '-2');
    
	randomizeNames();
}

//SHOW RANDOMIZING DIV, RANDOMIZE NAMES, THEN DISPLAY IN PICK ORDER
function randomizeNames() {
    $("#randomizingNotification").css("visibility", "visible");
    var timer = setTimeout(function (){
        randomize(nameArray);
        $("#randomizingNotification").css("visibility", "hidden");
        displayOrder();
    }, 1000);
}

//RANDOMIZE NAMES
function randomize(array) {
    for (var i = 0; i < array.length; i++ ) {
        var randNum = Math.floor(array.length*Math.random()); //random number between 0 and length of array (rounded down
        var temp = array[i];
        array[i] = array[randNum];
        array[randNum] = temp;
    }
}

//SHOW NAMES IN PICK ORDER
function displayOrder() {
    //if more than one user left...
    if (nameArray.length > 1) {
		
		//if names have just been entered
		if (prevIndex == null) {
			prevIndex= -1;
			currIndex= 0;
			nextIndex = 1;
			$("#previousPick").val("");
			$("#nextPick").val("Next: " + nameArray[nextIndex]);
			$("#currentPick").val(nameArray[currIndex]);
		} 
	
		//if two users left, 
		else if (nameArray.length == 2) {
			$("#nextPick").val("Next: " + nameArray[prevIndex]);
			$("#previousPick").val("Prev: " + nameArray[prevIndex]);
			$("#currentPick").val(nameArray[currIndex]);
		}	
	
		else {
			$("#previousPick").val("Prev: " + nameArray[prevIndex]);
			$("#nextPick").val("Next: " + nameArray[nextIndex]);
			$("#currentPick").val(nameArray[currIndex]);
		}
	}
	
	//if one user left
    else {
    	$("#currentPick").val(nameArray);
    	$("#nextPick").val("");
    	$("#previousPick").val("");
    }
    
	//reflect current user in delete button
	$('#deleteButton').html( "Delete " + $('#currentPick').val().toUpperCase() );
} 


//MOVE TO THE nextIndexPICKER 
function nextUser(event) {
	event.preventDefault();

	prevIndex++;
	currIndex++; 
	nextIndex++;

	//if at the end of the order, loop around
	if (nextIndex >= nameArray.length)
		nextIndex = 0;
	
	if (currIndex >= nameArray.length)
		currIndex = 0;
	
	if (prevIndex >= nameArray.length)
		prevIndex = 0;

	displayOrder();
}

//MOVE TO THE PREVIOUS PICKER
function prevUser() {
	event.preventDefault();

	nextIndex--;
	currIndex--;
	prevIndex--;

	
	if (prevIndex < 0) 
		prevIndex = nameArray.length-1;
	
	if (currIndex < 0)
		currIndex = nameArray.length-1;
	
	if (nextIndex < 0)
		nextIndex = nameArray.length-1;

	displayOrder();
}

//DELETE PICKER WHEN THEY HAVE CHOSEN ALL DESIRED SHIFTS
function deleteUser() {

	//remove value at current index
    nameArray.splice(currIndex,1);
    
	if (nextIndex >= nameArray.length) {
		currIndex = nameArray.length-1;
		nextIndex = 0;
		prevIndex = currIndex-1;
	}
		 
	if (currIndex >= nameArray.length || prevIndex >= nameArray.length) {
		prevIndex = nameArray.length-1;
		currIndex = 0;
		nextIndex = 1;
	}
    
    displayOrder();	
}


/*
*
*FOR ENTERNAMES TABLE
*
*/


function addRow() {
	var table = document.getElementById('namesTable');
	var newRow = table.insertRow(table.rows.length);
	
	initialNum = table.rows.length; 
	createRowElements(newRow);
}

//PUT INITIAL NUMBER AND TEXTAREA INTO TABLE
function createRowElements(row) {
	
	var cell1 = row.insertCell(0);
	cell1.className = "initialNumber";
	cell1.innerHTML = initialNum;
	initialNum++;
	
	var cell2 = row.insertCell(1);
	cell2.className = "enterInitials";
	createTextArea(cell2);
	
}
	
//CREATE TEXTAREA IN CELL
function createTextArea(cell) {
	
	var cell_textarea = document.createElement("textarea");
	cell_textarea.setAttribute("maxlength", 3);
	cell_textarea.className = "name";
	cell_textarea.name = "name";
	cell_textarea.cols = "2";
	cell_textarea.rows = "1";
	cell.appendChild(cell_textarea);
}

