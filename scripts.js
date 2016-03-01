
var LEVELS = [0, 1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var outerSize = 25;
var canvas = document.getElementById('circle-canvas');

var circle = document.getElementById('circle-bar');
    
var settings = {
    points: circle.getAttribute('data-points'),
    lineWidth: circle.getAttribute('data-width'),
    size: circle.getAttribute('data-size')
}

var detectLevel = function(points){
    level = 0
    for (var i = 1; i < LEVELS.length; i++){
        if (points < LEVELS[i]) return level + 1;
        else level++;
    }
}

var userLevel = detectLevel(settings.points);
if (userLevel < LEVELS.length){
    var nextLevelPoints = LEVELS[userLevel];
    var pointsBetweenLevels = LEVELS[userLevel] - LEVELS[userLevel - 1];
    var progressToNextLevel = pointsBetweenLevels - (nextLevelPoints - settings.points);
    var percentComplete = progressToNextLevel / pointsBetweenLevels;
}
else{
    var percentComplete = 100/100;
}

document.getElementById('userlevel').textContent = userLevel;
document.getElementById('levelcount').textContent = LEVELS.length - 1;
document.getElementById('totalpoints').textContent = settings.points;
document.getElementById('pointsleft').textContent = Math.max(LEVELS[LEVELS.length - 1] - settings.points, 0);

var span = document.createElement('div');
span.className = "progress-text";
span.textContent = 0 + '%';

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
        if (settings.points > 0){
            drawCircle(settings.size, '#FDAE61', settings.lineWidth, (localPercent / 100) * (Math.min(settings.points, 100)/LEVELS[LEVELS.length - 1]));
        }
        drawCircle(settings.size - outerSize, '#fff', settings.lineWidth, 100 / 100);
        if (percentComplete > 0){
            if (settings.points < LEVELS[LEVELS.length - 1]){
                drawCircle(settings.size - outerSize, '#196B94', settings.lineWidth, (localPercent / 100) * percentComplete);
            }
            else{
                drawCircle(settings.size - outerSize + 1, '#FDAE61', settings.lineWidth, (localPercent / 100));
            }
            span.textContent = Math.round((localPercent / 100) * percentComplete * 100) + '%';
        }
        v = -.01 * t*(t/10) + 1;
        localPercent += v;
        t += .01;
    }
    else{
        clearInterval(timer);
        span.textContent = percentComplete * 100 + '%';
    }
}, 10);