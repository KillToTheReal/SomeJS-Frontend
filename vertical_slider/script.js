const up = document.querySelector('.up-button')

const down = document.querySelector('.down-button')

const mainslide = document.querySelector('.main-slide')

const sidebar = document.querySelector('.sidebar')

const slidescnt = mainslide.querySelectorAll('div').length

const container = document.querySelector('.container')

let activeslideind = 0

sidebar.style.top = `-${(slidescnt - 1) * 100}vh`

up.addEventListener('click',() =>{
    changeSlide('up')
})

down.addEventListener('click', () =>{
    changeSlide('down')
})

document.addEventListener('keydown',() =>{
    console.log(event)
    if(event.key === 'ArrowUp')
    {
        changeSlide('up')
    }
     else if(event.key === 'ArrowDown')
    {
        changeSlide('down')
    }
})

function changeSlide(dir)
{
    if(dir === 'up')
    {
        activeslideind++
        if(activeslideind === slidescnt)
        {
            activeslideind = 0
        }
    }
        else if (dir === 'down')
        {
            activeslideind--

            if(activeslideind < 0)
            {
                activeslideind = slidescnt - 1
            }
        }
    
    const height = container.clientHeight
    mainslide.style.transform = `translateY(-${activeslideind * height}px)`
    sidebar.style.transform = `translateY(${activeslideind * height}px)`
}
