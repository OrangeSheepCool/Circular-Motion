var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const colorArray = [
    '#3F595A',
    '#C6DDC1',
    '#FECFB1',
    '#F69175',
    '#3F595A'
]

window.addEventListener('mousemove', event => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.radians = Math.random() * Math.PI * 2
        this.velocity = 0.05
        this.distanceFromCenter = randomRange(50, 100)
        this.lastMouse = {x: x, y: y}

    }
    draw(lastPoint) {
        c.beginPath()
        c.strokeStyle = this.color
        c.lineWidth = this.radius
        c.moveTo(lastPoint.x, lastPoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
    }
    update() {
        const lastPoint = { x: this.x, y: this.y }
        this.radians += this.velocity
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.velocity
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.velocity
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter
        this.draw(lastPoint)
    }
}

let circles

function init() {

    circles = []

    for (let i = 0; i < 100; i++) {
        const radius = randomRange(1, 2)
        const color = randomColor(colorArray)
        circles.push(new Circle(canvas.width / 2, canvas.height / 2, radius, color))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255, 255, 255, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    circles.forEach(c => c.update())
}

init()
animate()