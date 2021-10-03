const board = document.querySelector('#board')
const colors = ['#f44f36','#fdd2f5','#896289','#2986cc','#b6d7a8','#fabb88']
const SQR_NUM = 740

for(let i = 0; i < SQR_NUM; i++)
{
    const sqr = document.createElement('div')

    sqr.classList.add('square')

    sqr.addEventListener('mouseover', () => setColor(sqr))

    sqr.addEventListener('mouseleave', () => removeColor(sqr))

    board.append(sqr)
}

function setColor(element){
    const color = randColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element){
    element.style.background = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function randColor()
{
    return colors[Math.floor(Math.random(colors) * colors.length)]
}