const btn = document.querySelector('#start_btn')
const screens = document.querySelectorAll('.screen')
const times = document.querySelector('#time_list')
const timeEl = document.querySelector('#time')
let time = 0 
let score = 0
const board = document.querySelector('#board')
const colors = ['#b6d7a8', '#ff8888', '#ced8ff', '#33ff88','#f44f36', '#2986cc']

btn.addEventListener('click',(event)=>{

    event.preventDefault()
    screens[0].classList.add('up')
})

times.addEventListener('click', (event)=>
{
    if(event.target.classList.contains('time-btn'))
    {
     time = parseInt(event.target.getAttribute('data-time'))
     screens[1].classList.add('up')
     startGame()
    }
})

board.addEventListener('click', (event)=>{
    if(event.target.classList.contains('circle'))
    {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime()
{
    if(time === 0)
    {
        finishGame()
    }
     else 
    {
        let current = --time
        if (current < 10)
        {
            current = `0${current}`
        } 
        setTime(current)
    }
}

function setTime(value)
{
    timeEl.innerHTML = `00:${value}`
}

function finishGame()
{   
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle()
{
    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()
    const size = randomSize(20,35)
    const x = randomSize(0, width-size)
    const y = randomSize(0,height-size)
    const color = getColor()

    circle.style.background = `${color}`
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    
    board.append(circle)
}

function randomSize(min, max)
{
    return Math.round(Math.random() * (max-min) + min)
}

function getColor()
{
    return colors[Math.floor(Math.random(colors) * colors.length)]
}