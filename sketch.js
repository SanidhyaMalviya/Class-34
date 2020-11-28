var ball;
var liveBallPosition;
var database;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    liveBallPosition = database.ref("ball/position");
    liveBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x":ball.x+x,
        "y":ball.y+y
    })
}

function showError(){
    console.log("error in reading database");
}

function readPosition(data){
    var newPosition = data.val();
    ball.x = newPosition.x;
    ball.y = newPosition.y;
}
