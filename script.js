var newpomo = "<div id='newpomo'><input type='text' id='pomogoal' class='left'/><button class='right' onclick='start()'>start</button></div>";

$( document ).ready(function () {
  $('#pomo').prepend(newpomo);
});

function start () {
  $('#compomo').prepend("<div class='pom'><span class='pomos left'>"+$('#pomogoal').val()+"</span><span class='pomorates right'><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/></span></div>");
  $('#newpomo').remove();
  pomocount();
};

function pomocount () {
  var time = 1499000;
//  var time = 1000;
  timeLeft = time;
  timer = setInterval(function() {
    if (timeLeft == 0){
      clearInterval(timer);
      var audio = new Audio('http://helios.informatik.uni-kl.de/~c_schrei/old/misc/sounds/ALARM.WAV');
      audio.play();
      pomono();
      pomoplay();
    }
    var secs = timeLeft / 1000;
    var sec = "0"+(secs % 60);
    var min = "0"+(Math.floor(secs / 60));
    $('#timer').html(min.slice(-2)+":"+sec.slice(-2));
    timeLeft -= 1000;
  },1000);
}