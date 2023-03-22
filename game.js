var buttoncolours=["red","blue","green","yellow"];
var gamepattern=[];
var userclickpattern=[];
var level=0,started=false;

function nextsequence()
{
    level++;
    $("#level-title").html("LeveL "+level);
    userclickpattern=[];
    var a=Math.floor(Math.random()*4);
    var randomchosencolour = buttoncolours[a];
    gamepattern.push(randomchosencolour);
    $("#"+randomchosencolour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchosencolour);
    
}

$(".btn").click(function (){
    var userchosencolour=$(this).attr("id");
    userclickpattern.push(userchosencolour);
    playsound(userchosencolour);
    animatepress(userchosencolour);
    checkanswer(userclickpattern.length-1);
});

function playsound(s)
{
    var audio = new Audio("sounds/" + s + ".mp3");
    audio.play(); 
}
function animatepress(ani)
{
    $("#"+ani).addClass("pressed");
    setTimeout(function() {
        $("#"+ani).removeClass('pressed');
    }, 100);   
}

$(document).on("keypress",function(){
    if(started===false)
    {
        nextsequence();
        started=true;
    }
});

function startover()
{
    level=0;
    gamepattern=[];
    started=false;
}
function checkanswer(currentlevel)
{
    if(userclickpattern[currentlevel]==gamepattern[currentlevel])
    {   
        if(userclickpattern.length===gamepattern.length)
        {
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over! Press any Key to Restart");
        startover();
    }
}
