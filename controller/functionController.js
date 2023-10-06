$(function (){

    //for save DOM objects to variables
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speedSpan = $('#speed');
    var btnRestart = $('#btnRestart');


    //for get decissions
    var containerWidth = parseInt(container.width());
    var containerHeight = parseInt(container.height());
    var poleInitialPosition = parseInt(pole.css('right'));
    var poleInitialHeight = parseInt(pole.css('height'));
    var birdLeft = parseInt(bird.css('left'));
    var birdheight = parseInt(bird.height());
    var speed = 10;


    var goUp = false;
    var scoreUpdated = false;
    var gameOver = false;


    var theGame = setInterval(function (){

        if (collision(bird , pole_1) || collision(bird , pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > containerHeight - birdheight ){

            stopTheGame();

        }else {

            var poleCurrentPostition = parseInt(pole.css('right'));

            //update the score in score board when the bird have passed the poles successfully
            if (poleCurrentPostition > containerWidth - birdLeft){
                if (scoreUpdated === false){
                    score.text(parseInt(score.text())+1);
                    scoreUpdated = true;
                }
            }

            //for check whether the poles went out of the container
            if (poleCurrentPostition > containerWidth){
                var newHeight = parseInt(Math.random() * 100);

                //for change the poles' height
                pole_1.css('height' , poleInitialHeight + newHeight);
                pole_2.css('height' , poleInitialHeight - newHeight);

                //for increase speed
                speed = speed + 1;
                speedSpan.text(speed);

                scoreUpdated = false;

                poleCurrentPostition = poleInitialPosition;
            }

            //for move the poles
            pole.css('right' , poleCurrentPostition + speed);

            if (goUp === false){
                goDown();
            }

        }
    }, 40);

    $(document).on('keydown' , function (e){

        var key = e.keyCode;

        if (key === 32 && goUp === false && gameOver === false){
            goUp = setInterval(up , 50);
        }

    });

    $(document).on('keyup' , function (e){

        var key = e.keyCode;

        if (key === 32){
            clearInterval(goUp);
            goUp = false;
        }

    });

    function up(){
        bird.css('top' , parseInt(bird.css('top'))-10);
    }

    function goDown(){
        bird.css('top' , parseInt(bird.css('top')) + 5);
    }

    function stopTheGame (){
        clearInterval(theGame);
        gameOver = true;
        btnRestart.slideDown();
    }

    btnRestart.click(function (){
        location.reload();
    });

    function collision($div1,$div2){
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)return false;
        return true;
    }
});