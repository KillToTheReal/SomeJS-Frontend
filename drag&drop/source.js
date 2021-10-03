const item = document.querySelector('.item')

const holders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart',drag_begin)
item.addEventListener('dragend', drag_end)

holders.forEach(holder => {
    holder.addEventListener('dragover',dragover)
    holder.addEventListener('dragenter',dragenter)
    holder.addEventListener('dragleave',dragleave)
    holder.addEventListener('drop',drop)
});

function drag_begin(event)
{
    this.classList.add("hold")
    setTimeout(() => 
        this.classList.add("hide"), 0)
}

function drag_end(event)
{
    this.classList.remove('hold', 'hide')
}

function dragover(event) {
    event.preventDefault()
}

function dragenter(event) {
    this.classList.add('hovered')
}

function dragleave(event){
    this.classList.remove('hovered')
}

function drop(event){
    this.classList.remove('hovered')
    this.append(item)
}