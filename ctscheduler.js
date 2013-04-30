var nameArray;
var curr, next;
var prev = null;
var currentId, initialNum;

window.onload = pageLoad;

function pageLoad() {
	
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
	
	

	$("#randomizingNotification").hide(); //this is visible briefly once the user enters initials, just to tell the user what's happening
    $("#enter_names").click(orderNames); //this is the first thing the user should click: enter names then reorder them
	$("#prev_arrow").click(prevUser); //if user wishes to go back to the previous picker
	$("#next_arrow").click(nextUser); //next picker

	$('.shift').attr('maxlength',3);   //this works if we only want initials
	$('.picker_names_textarea').attr('maxlength',3);   //this works if we only want initials

	$('.shift,.printing,.sweeps').focus( function() {
		//if user presses enter, enter initials into focused box
		$(this).keypress(function(e) {
			if (e.charCode == 13) {
				
				//don't include white space
				e.preventDefault();
				
				$(this).val($('#currentPick').val());
					
				//move to the next person
				$("#next_arrow").click();
					
				//make noise
				$('#the_schedule_div').append('<embed src="mario_jump.mp3" autostart="true" hidden="true" loop="false">');
				
			}
		});
		
		
		$(this).blur( function() {
			//If the shift has been filled, change background color to indicate so
			if( $(this).val().length ==2 || $(this).val().length ==3 ) {
				$(this).css('background-color', '#e8e8e8');
				$(this).parent().css('background-color', '#e8e8e8');
			}
			
			else {
				$(this).css('background-color', 'white');
				$(this).parent().css('background-color', 'white');
			}
		});
	});
}

function orderNames(event) {
    event.preventDefault();

    nameArray = getNames();
    randomizeNames();
}

function getNames() {
    var initialsString = prompt("Please enter initials, separated by a comma (e.g LK,AS,NM)");
    nameArray = initialsString.split(",");
    return nameArray;
}

function randomizeNames() {
    $("#randomizingNotification").css("visibility", "visible");
    var timer = setTimeout(function (){
        randomize(nameArray);
        $("#randomizingNotification").css("visibility", "hidden");
        displayNames();
    }, 1000);
}

function randomize(array) {
    for (var i = 0; i < array.length; i++ ) {
        var randNum = Math.floor(array.length*Math.random()); //random number between 0 and length of array (rounded down
        var temp = array[i];
        array[i] = array[randNum];
        array[randNum] = temp;
    }
}

function displayNames() {
    
	if (next >= nameArray.length) {
		curr == nameArray.length - 1;
		current = nameArray[curr];
		previous = nameArray[prev];

		$("#currentPick").val(current);
		$("#nextPick").val("");
		$("#previousPick").val(previous);
	} 

	else {
		if (prev != null) {
			previous = nameArray[prev];
			$("#previousPick").val(previous);
		} else {
			curr = 0;
			next = 1;
			$("#previousPick").val("");
		}

		current = nameArray[curr];
		next_pick = nameArray[next];
		$("#nextPick").val(next_pick);
		$("#currentPick").val(current);
	}
}

function nextUser(event) {
	event.preventDefault();

	prev = curr;
	curr = next; 
	next++;

	if (next > nameArray.length-1)
		next = 0;

	displayNames();
}

function prevUser() {
	event.preventDefault();

	next = curr;
	curr = prev;
	prev--;

	if (prev < 0)
		prev = nameArray.length-1;

	displayNames();
}
