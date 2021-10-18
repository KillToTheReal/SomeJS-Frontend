const canvas = document.getElementById("gameCanv")
const canvasCont = canvas.getContext('2d')
const cw = canvas.width
const ch = canvas.height
//Кол-во столкновений с бамперами для ускорения
var collisions = 0
//Вертикальная и горизонтальная скорость шара
var speedX = 1.5
var speedY = 1.5
//Координаты шара
var ballX = cw/2
var ballY = ch/2
//Координаты левого и правого бампера
var bumperY = ch/2
var coordYbump = ch/2
//Счет первого и второго игрока
var leftScore = 0
var rightScore = 0
//Скорость правого бампера
var AIbumperSpeed = 1.45

//Равновероятные 0 или 1
var directionX = Math.floor(Math.random() +0.5)
var directionY = Math.floor(Math.random() +0.5)

window.onload = function(){
    //Перемещение правого бампера относительно мыши
    canvas.addEventListener('mousemove',(e)=>{
        bumperY = e.clientY
        createBumper(bumperY)

    })
    //Отрисовка и перемещение всего 
  let m = setInterval(()=>
    {
        moveEverything()
        drawEverything()
        createBumper(bumperY)
        AIbumper(coordYbump, ballY)
        faster()
        //Условия окончания игры
        if(leftScore >=7 || rightScore >=7)
        {
            clearInterval(m)
            Wingame()
        }
    }, 1000/200)

}



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
    directionX =Math.floor(Math.random() +0.5)
    directionY = Math.floor(Math.random() +0.5)
    console.log(directionX,directionY)
    speedX = Math.random() * 2 + 1
    speedy = Math.random() * 3 + 1
    collisions = 0
    AIbumperSpeed = 1.5
    if(directionX === 0)
    {
        coordYbump = directionY === 0? 400 : 100
    }
}

function moveEverything()
{
    //Если шар находится на X: == Край бампера && центр Шара находится на Y ниже чем верхний край бампера & 
    // & Верх или низ шара находятся выше чем нижний край бампера ::: Коллизия
    if(ballX+7 >= cw-10 && ballY+7>=coordYbump+7 && (ballY < coordYbump+80||ballY+14 < coordYbump+80))
    {
        collisions++
        directionX = 1
    }
    else if(ballX-7 <= 10 && ballY+7>=bumperY-40-7 && (ballY < bumperY-40+80|| ballY+14 < bumperY-40+80))
    {
        directionX = 0
        collisions++
    }
    //Если шар пролетел за бампер
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
    ballY = directionY === 0 ? ballY + speedY : ballY - speedY

    //Отбитие мяча об потолок
    if(ballY >=ch)
        directionY = 1
    else if(ballY<=0)
        directionY = 0

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
