const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // tells the program to use the 2d-graphics API
const mousePosLabel = document.getElementById('mousePosLabel');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.globalCompositeOperation = 'destination-over';

let circles = [];

function createCircleObject(x, y, radius) {
    let newCircle = {
        x: x,
        y: y,
        radius: radius,
    }
    circles.push(newCircle);
}

function drawCircles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the whole canvas each iteration

    ctx.fillStyle = 'orange'; // fill color
    ctx.strokeStyle = 'red'; // stroke color
    ctx.lineWidth = 5; // stroke width

    for(let {x, y, radius} of circles) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2); // x, y, radius, start angle, end angle (radians)
        ctx.closePath();
        ctx.fill(); // fill path
        //ctx.stroke(); // outline
    }
}

function animate() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the whole canvas each iteration
    
    requestAnimationFrame(animate);
}

createCircleObject(200, 200, 30);
drawCircles();

canvas.addEventListener("mousedown", (event) => handleClick(event));

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    mousePosLabel.textContent = `x: ${mouseX} y: ${mouseY}`

    for(let circle of circles){
        let {x, y, radius} = circle;
        let d = Math.sqrt((mouseX - x)**2 + (mouseY - y)**2);
        if(d <= radius) {
            console.log('hit circle');
            mousePosLabel.textContent += ' You hit circle!';
            moveCircle(circle);
        }
    }

    console.log(mouseX, mouseY);
}

function moveCircle(circle) {
    circle.x = Math.floor(Math.random() * (window.innerWidth - 2*circle.radius)) + circle.radius;
    circle.y = Math.floor(Math.random() * (window.innerHeight - 2*circle.radius)) + circle.radius;
    drawCircles()
}

// click { target: canvas#canvas1, buttons: 0, clientX: 23, clientY: 172, layerX: 23, layerY: 172 }