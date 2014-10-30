var player1Turn = true;
var player1points = 0;
var player2points = 0;
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var randomLetter = Math.floor(Math.random()*25);
var randomLength = Math.floor(Math.random()*5+3);

$(document).ready(function () {

	$(".prompt").html("You need a word that is " + randomLength + " letters long and starts with " + alphabet[randomLetter]);
	$("#skip").html("Skip ( - " + randomLength + " )");

	checkPlayerTurn();

	$( "#word-input" ).keypress(function( event ) {
	  if ( event.which == 13 ) {
	     checkInput();
	  }
	});

	$("#submit").on('click', function(){
		checkInput();
	});

	$("#skip").on('click', function(){

		if(player1Turn)
			player1points-=randomLength;
		else
			player2points-=randomLength;

		nextTurn();
	});
});

function checkInput () {
	$("#error").html("");
	if($("#word-input").val()[0] != alphabet[randomLetter])
	{
		$("#error").html($("#error").html() + "Sorry, your word needs to start with '" + alphabet[randomLetter] + "'.<br/>");
	}
	if($("#word-input").val().length != randomLength)
	{
		$("#error").html($("#error").html() + "Sorry, your word needs to be " + randomLength + " letters long." + "<br/>");	
	}

	$.getJSON("https://api.pearson.com/v2/dictionaries/entries?headword=" + $("#word-input").val() + "&apikey=8I9Ks98vbrCQgc2dWzXo5jGlfxUClWUf", function (data) {
		if(data.results.length == 0)
		{
			$("#error").html($("#error").html() + "Sorry, your word needs to exist." + "<br/>");
		}
		if($("#error").html() == "")
		{
			if(player1Turn)
				player1points += randomLength;
			else
				player2points += randomLength;
			nextTurn();
		}
	});
}

function nextTurn () {

	player1Turn = !player1Turn;
	checkPlayerTurn();
	randomLetter = Math.floor(Math.random()*25);
	randomLength = Math.floor(Math.random()*5+3);
	$(".prompt").html("You need a word that is " + randomLength + " letters long and starts with " + alphabet[randomLetter]);
	$("#word-input").val("");
}

function checkPlayerTurn () {
	
	if(player1Turn)
	{
		$(".player2").html("Player 2 has " + player2points + " points");
		$(".player1").html("<h1 class='playersturn'>Your Turn.</h1>" + $(".player1").html());
	}
	else
	{
		$(".player1").html("Player 1 has " + player1points + " points");
		$(".player2").html("<h1 class='playersturn'>Your Turn.</h1>" + $(".player2").html());	
	}
}