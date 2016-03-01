
var LEVELS = [0, 1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var canvas = document.getElementById('circle-canvas');

if (canvas){

var circle = document.getElementById('circle-bar');
    
var settings = {
    largepercent: circle.getAttribute('data-large-percent'),
    smallpercent: circle.getAttribute('data-percent'),
    lineWidth: circle.getAttribute('data-width'),
    size: circle.getAttribute('data-size')
}

var span = document.createElement('div');
span.className = "progress-text";
span.textContent = 1 + '%';

var ctx = canvas.getContext('2d');
canvas.width = canvas.height = settings.size;

circle.appendChild(span);
circle.appendChild(canvas);

ctx.translate(settings.size/2, settings.size/2);
ctx.rotate((-1 / 2) * Math.PI);

var drawCircle = function(size, color, lineWidth, percent){
  var radius = (size - lineWidth) / 2;
  percent = Math.min(Math.max(0, percent || 1), 1);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
  ctx.strokeStyle = color;
  ctx.lineCap = 'square';
  ctx.lineWidth = lineWidth;
  ctx.imageSmoothingEnabled = false;
  ctx.stroke();
}

localPercent = 1;
t = 0
timer = setInterval(function(){
    if (localPercent < 100){
        drawCircle(settings.size, '#FDAE61', settings.lineWidth, (localPercent / 100) * (settings.largepercent/100));
        drawCircle(settings.size - 25, '#fff', settings.lineWidth, 100 / 100);
        drawCircle(settings.size - 25, '#196B94', settings.lineWidth, (localPercent / 100) * (settings.smallpercent / 100));
        v = -.01 * t*(t/10) + 1;
        localPercent += v;
        t += .01;
        span.textContent = Math.round((settings.smallpercent / 100) * localPercent * settings.smallpercent/100) + '%';
    }
    else{
        clearInterval(timer);
        span.textContent = settings.smallpercent + '%';
    }
}, 10);
}
else{

var canvas = document.getElementById('square-canvas');
var square = document.getElementById('square-bar');
square.style.marginTop = 0;
    
var settings = {
    largepercent: square.getAttribute('data-large-percent'),
    smallpercent: square.getAttribute('data-percent'),
    lineWidth: square.getAttribute('data-width'),
    levelPoints: square.getAttribute('data-levelpoints')
}

var ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = document.getElementById('user-profile').clientHeight;
    
ctx.translate(canvas.width/2, canvas.height);

var drawRect = function(offsetX, height, color, lineWidth, percent){
    percent = Math.min(Math.max(0, percent || 1), 1);
    ctx.beginPath();
    ctx.rect((lineWidth * -1) - offsetX, height * percent * -1, lineWidth, height * percent);
    ctx.fillStyle = color;
    ctx.fill();
}
    
localPercent = 1;
t = 0
prog = document.getElementById("progress");
timer = setInterval(function(){
    if (localPercent < 100){
        drawRect(50, canvas.height * .9, '#FDAE61', settings.lineWidth, (localPercent / 100) * (settings.largepercent/100));
        drawRect(45, canvas.height * .9, '#fff', settings.lineWidth, 100/100);
        drawRect(45, canvas.height * .9, '#196B94', settings.lineWidth, (localPercent / 100) * (settings.smallpercent / 100));
        v = -.01 * t*(t/10) + 1;
        localPercent += v;
        t += .01;
        prog.innerHTML = Math.round((localPercent/100) * settings.levelPoints * (settings.smallpercent / 100));
    }
    else{
        clearInterval(timer);
        prog.innerHTML = Math.round((localPercent/100) * settings.levelPoints * (settings.smallpercent / 100));
    }
}, 9);

}