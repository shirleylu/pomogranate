var timer, timeLeft;

var newpomo = "<div id='newpomo'><input type='text' id='pomogoal' class='left'/><button class='right' onclick='start()'>start</button></div>";

var sucs = ["<img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/>","<img class='seed' src='media/seed1.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/>","<img class='seed' src='media/seed1.png'/><img class='seed' src='media/seed2.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/>","<img class='seed' src='media/seed1.png'/><img class='seed' src='media/seed2.png'/><img class='seed' src='media/seed3.png'/><img class='seed' src='media/seed0.png'/><img class='seed' src='media/seed0.png'/>","<img class='seed' src='media/seed1.png'/><img class='seed' src='media/seed2.png'/><img class='seed' src='media/seed3.png'/><img class='seed' src='media/seed4.png'/><img class='seed' src='media/seed0.png'/>","<img class='seed' src='media/seed1.png'/><img class='seed' src='media/seed2.png'/><img class='seed' src='media/seed3.png'/><img class='seed' src='media/seed4.png'/><img class='seed' src='media/seed5.png'/>","<img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/>"];

$( document ).ready(function () {
  $('#pomo').prepend(newpomo);
  pastpomos();
});

https://docs.google.com/spreadsheets/d/1r0nyLmJY0jPFpIUleat0abatUnkEtO8gPV4pOqcCP_A/pubhtml

function pastpomos () {
$.getJSON("https://spreadsheets.google.com/feeds/list/1r0nyLmJY0jPFpIUleat0abatUnkEtO8gPV4pOqcCP_A/default/public/values?alt=json", function(data) {
  //first row "title" column
  var entries = data.feed.entry;
  var l = entries.length;
  for (var i = 10; i>0; i--) {
    var ht = "<div class='pom'><span class='pomos left'>"+entries[l-i].gsx$goal.$t+"</span><span class= 'pomorates right'>"+sucs[entries[l-i].gsx$poms.$t]+"</span>";
    $('#compomo').prepend(ht);
  }
});
}

function start () {
  $('#compomo').prepend("<div class='pom'><span class='pomos left'>"+$('#pomogoal').val()+"</span><span class='pomorates right'><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/><img class='seed' src='media/badseed.png'/></span></div>");
  $('#newpomo').remove();
  pomocount();
  $('#done').show();
};

function pomorate() {
  $($('.pomorates')[0]).html("<span id='seed1' onClick='pomonom(1)'><img class='seed' src='media/seed0.png'/></span><span id='seed2' onClick='pomonom(2)'><img class='seed' src='media/seed0.png'/></span><span id='seed3' onClick='pomonom(3)'><img class='seed' src='media/seed0.png'/></span><span id='seed4' onClick='pomonom(4)'><img class='seed' src='media/seed0.png'/></span><span id='seed5' onClick='pomonom(5)'><img class='seed' src='media/seed0.png'/></span><span class='seeded' hidden>0</span>");
}

function pomocount () {
  var time = 1500000;
//  var time = 1000;
  timeLeft = time;
  timer = setInterval(function() {
    if (timeLeft == 0){
      clearInterval(timer);
      var audio = new Audio('http://helios.informatik.uni-kl.de/~c_schrei/old/misc/sounds/ALARM.WAV');
      audio.play();
      pomorate();
      pomodone();
      $('#donenow').hide();
    }
    var secs = timeLeft / 1000;
    var sec = "0"+(secs % 60);
    var min = "0"+(Math.floor(secs / 60));
    $('#timer').html(min.slice(-2)+":"+sec.slice(-2));
    timeLeft -= 1000;
  },1000);
}

function pomodone () {
  var time = 300000;
  timeLeft += time;
  timer = setInterval(function() {
    if (timeLeft == 0){
      clearInterval(timer);
      var audio = new Audio('http://helios.informatik.uni-kl.de/~c_schrei/old/misc/sounds/ALARM.WAV');
      audio.play();
      $('#timer').html("25:00");
      $('#pomo').prepend(newpomo);
      var goal = $($('.pomos')[0]).html();
      var poms = $($('.seeded')[0]).html();
      var googleForm = $(window).jqGoogleForms({"formKey": "1csP-bIvcOMZg4zZxVfJ10_awrKeKFKH7KOXQSIksx7g"});
      googleForm.sendFormData({
        "entry.696179186": goal,
        "entry.1110768892": poms
      });
      $($('.pomorates')[0]).html(sucs[poms]);
      
    }
    var secs = timeLeft / 1000;
    var sec = "0"+(secs % 60);
    var min = "0"+(Math.floor(secs / 60));
    $('#timer').html(min.slice(-2)+":"+sec.slice(-2));
    timeLeft -= 1000;
  },1000);
}

function pomonom (which) {
  $($('.seeded')[0]).html(which);
  for (var i =1; i<=5; i++) {
    if(i<=which) {
      var tag="#seed"+i;
      $(tag).html("<img class='seed' src='media/seed"+i+".png' />");
    } else{
      var tag="#seed"+i;
      $(tag).html("<img class='seed' src='media/seed0.png' />");
    }
  }
}