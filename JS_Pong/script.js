const canvas = document.getElementById("gameCanv")
const canvasCont = canvas.getContext('2d')
var collisions = 0
var speedX = 1.5
var speedY = 1.5
var leftX = 0
const cw = canvas.width
const ch = canvas.height
var ballX = cw/2
var ballY = ch/2
var bumperY = ch/2
var coordYbump = ch/2
var leftScore = 0
var rightScore = 0
var IsWinner = false
var AIbumperSpeed = 1.45
window.onload = function(){
    canvas.addEventListener('mousemove',(e)=>{
        bumperY = e.clientY
        createBumper(bumperY)

    })
  let m = setInterval(()=>
    {
        moveEverything()
        drawEverything()
        createBumper(bumperY)
        AIbumper(coordYbump, ballY)
        faster()
        if(leftScore >=7 || rightScore >=7)
        {
            clearInterval(m)
            Wingame()
        }
    }, 1000/200)

}


var directionX = Math.random()
var directionY = Math.random()

function Wingame(){
    var winner = rightScore > leftScore ? 'right' : 'left'
    canvasCont.fillStyle = 'black'
    canvasCont.fillRect(0,0,cw,ch)
    canvasCont.fillStyle = 'white'
    canvasCont.font ='48px Helvetica'
    canvasCont.fillText('Winner is '+winner+' player',cw/2-225,ch/2)
    canvasCont.font = '16px helvetica'
    canvasCont.fillText('To play again, refresh the page(F5)',cw/2-150,ch/2+50)
    canvasCont.fillStyle = 'white'
    canvasCont.fillRect(5,0,10,ch)
    canvasCont.fillRect(cw-15,0,10,ch)
    rightScore = 0
    leftScore = 0
}

function faster()
{
    if(collisions == 5)
    {
        speedX+=0.1
        speedY+=0.1
        AIbumperSpeed +=0.09
        console.log('SpeedX:'+speedX)
        console.log('SpeedY:'+speedY)
        collisions = 0 
    }
}

function createBumper(coordY)
{
    if(coordY <=50)
        coordY = 50

    if(coordY >= 550)
        coordY = 550

    canvasCont.fillStyle = 'white'
    canvasCont.fillRect(5,coordY-40,10,80)
}

function AIbumper(coordY, ballY)
{
    if(coordYbump <=10)
    coordYbump = 10

    if(coordYbump >= 519)
    coordYbump = 519

    coordYbump = coordYbump<= ballY-7 ? coordYbump+=AIbumperSpeed  : coordYbump-=AIbumperSpeed 
    canvasCont.fillStyle = 'white'
    canvasCont.fillRect(cw-15,coordYbump,10,80)
}

function restart()
{
    ballX = cw/2
    ballY = ch/2
    console.log(Math.random() * 4 + 1)
    directionX = Math.random() * 4 + 1
    directionY = Math.random() * 4 + 1
    speedX = 1.5
    speedy = 1.5
    collisions = 0
    AIbumperSpeed = 1.5
}

function moveEverything()
{

    if(ballX+7 >= cw-10 && ballY+7>=coordYbump-7 && (ballY < coordYbump-40+80||ballY+14 < coordYbump-40+80)){

        collisions++
        directionX = 1
    }
    else if(ballX-7 <= 10 && ballY+7>=bumperY-40-7 && (ballY < bumperY-40+80|| ballY+14 < bumperY-40+80))
    {
        directionX = 0
        collisions++
    }
    
    if(ballX<=0)
    {
        restart()
        rightScore++
    } 
    else if(ballX >=cw-5)
    {
        restart()
        leftScore++
    }

    ballX = directionX === 0 ? ballX + speedX : ballX - speedX

    if(ballY >=ch)
        directionY = 1
    
     else if(ballY<=0)
        directionY = 0

    ballY = directionY === 0 ? ballY + speedY : ballY - speedY
}


function drawEverything()
{
    var punkt_height = 2
    canvasCont.fillStyle = 'black'
    //Канвас
    canvasCont.fillRect(0,0,cw,ch)
    //Пунктир посередине экрана
    for(punkt_height; punkt_height<ch;punkt_height = punkt_height+30)
    {
        canvasCont.fillStyle='white'
        canvasCont.fillRect(cw/2-2,punkt_height,2,15)
    }

    canvasCont.fillStyle = 'white'
    canvasCont.font = '19px helvetica'
    //Счета игроков и мяч.
    canvasCont.fillText(leftScore,cw/4,ch/10,100) 
    canvasCont.fillText(rightScore,cw-cw/4,ch/10,100)
    canvasCont.fillRect(ballX-7,ballY-7,15,15)
}

