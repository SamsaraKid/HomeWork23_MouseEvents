let animal = document.getElementsByClassName('animal')
let food = document.getElementsByClassName('food')

const coords = [
    {px0: 0, py0: 0, px: 0, py: 0},
    {px0: 0, py0: 0, px: 0, py: 0},
    {px0: 0, py0: 0, px: 0, py: 0}
]

const foodIDs = [1,2,0]

food[0].ondragstart = start
food[0].ondragend = end
food[1].ondragstart = start
food[1].ondragend = end
food[2].ondragstart = start
food[2].ondragend = end

function start(event){
    let id = Number(this.id)
    coords[id].px = event.pageX
    coords[id].py = event.pageY
}

function end(event){
    let id = Number(this.id)
    let x = event.pageX
    let y = event.pageY

    this.style.left = (x - coords[id].px + coords[id].px0) + 'px'
    this.style.top = (y - coords[id].py + coords[id].py0) + 'px'

    coords[id].px0 += x - coords[id].px
    coords[id].py0 += y - coords[id].py

    coords[id].px = x
    coords[id].py = y

    checkForEaten(id)
}

function checkForEaten(id){
    let animalCenterX = animal[id].offsetLeft + 75
    let animalCenterY = animal[id].offsetTop + 75

    let foodCenterX = food[foodIDs[id]].offsetLeft + 75
    let foodCenterY = food[foodIDs[id]].offsetTop + 75

    // расстояние между центрами окружностей d = корень(a^2 + b^2)
    let centersDistance = Math.pow(Math.pow(Math.abs(foodCenterX - animalCenterX), 2) + Math.pow(Math.abs(foodCenterY - animalCenterY), 2), 0.5)
    if (centersDistance < 150){
        food[foodIDs[id]].setAttribute('hidden','true')
    }
}