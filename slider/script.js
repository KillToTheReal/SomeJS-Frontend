const slides = document.querySelectorAll('.myslider')

for (const slide of slides)
{
    slide.addEventListener('click',() =>{
        clearActiveClasses()
        slide.classList.add('active')
    })
}

function clearActiveClasses() {
    slides.forEach( (slide)=>{
        slide.classList.remove('active')
    })
}
