window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

var lines = [];
var linePitches = [];
var lineOffsets = [];
var lineDirections = [];
var lineTimers = [];

canvas.style.position = "absolute";
canvas.style.left = document.body.clientWidth / 2 - 250 + "px";
canvas.style.top = window.innerHeight / 2 - 250 + "px";

for (var i = 0; i < 30; i++) {
    lines[i] = i / 10;
    lineOffsets[i] = Math.random();
    linePitches[i] = Math.random();
    lineTimers[i] = Math.random();
    lineDirections[i] = {
        x: Math.random(),
        y: Math.random()
    };
}

function tick() {
    canvas.style.position = "absolute";
canvas.style.left = document.body.clientWidth / 2 - 250 + "px";
canvas.style.top = window.innerHeight / 2 - 250 + "px";
    var beforeLinesCanvas = document.createElement("canvas");
    beforeLinesCanvas.width = c.width;
    beforeLinesCanvas.height = c.height;
    var beforeLinesCanvasCtx = beforeLinesCanvas.getContext("2d");
    var afterLinesCanvas = document.createElement("canvas");
    afterLinesCanvas.width = c.width;
    afterLinesCanvas.height = c.height;
    var afterLinesCanvasCtx = afterLinesCanvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    
    ctx.beginPath();
    ctx.strokeStyle = "rgba(213, 49, 119,0.7)";
    ctx.arc(250, 250, 245, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.stroke();


    ctx.lineCap = "round";
    for (var i = 0; i < lines.length; i++) {

        var sinOffset = Math.sin(2 * Math.PI * lineOffsets[i]) / 2;
        var pitchM = Math.sin(2 * Math.PI * linePitches[i]);
        var renderOn = ctx;
        if (linePitches[i] < 0.5) {
            renderOn = afterLinesCanvasCtx;
        }
        renderOn.lineCap = "round";
        var grd = renderOn.createRadialGradient(250, 250, Math.abs(130 * pitchM), 250, 250, Math.abs(300 * pitchM));
        grd.addColorStop(0, "#02f");
        grd.addColorStop(1, "white");
        renderOn.strokeStyle = grd;
        var end = {
            x: 250 + Math.cos(2 * Math.PI * lines[i]) * 245 * pitchM,
            y: 250 + Math.sin(2 * Math.PI * lines[i]) * 245 * pitchM
        };
        renderOn.beginPath();
        renderOn.lineWidth = 5;
        renderOn.moveTo(250 + Math.cos(2 * Math.PI * lines[i]) * 45 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i]) * 45 * pitchM);
        renderOn.quadraticCurveTo(250 + Math.cos(2 * Math.PI * lines[i] + sinOffset / 2) * 200 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i] + sinOffset / 2) * 200 * pitchM, 250 + Math.cos(2 * Math.PI * lines[i]) * 245 * pitchM, 250 + Math.sin(2 * Math.PI * lines[i]) * 245 * pitchM);
        renderOn.stroke();
        createcirlce(renderOn, end.x, end.y, 5, 1, 15, "rgba(0,0,0,0)");
        lineDirections[i].x = Math.min(Math.max(lineDirections[i].x, 0), 1);
        lineDirections[i].y = Math.min(Math.max(lineDirections[i].y, 0), 1);
        lines[i] += (lineDirections[i].x - 0.5) * 0.003;
        lines[i] = lines[i] % 1;

        linePitches[i] += (lineDirections[i].y - 0.5) * 0.003;
        linePitches[i] = linePitches[i] % 1;
        lineOffsets[i] += (Math.random() - 0.5) * 0.1;
        lineOffsets[i] = lineOffsets[i] % 1;
        lines[i] = lines[i] % 1;
        lineDirections[i].x += Math.random() / 10 - 0.05;
        lineDirections[i].y += Math.random() / 10 - 0.05;
    }
    createcirlce(ctx,250,250,45,30,55,"white");
    ctx.drawImage(afterLinesCanvas, 0, 0);
}
(function animloop() {
    requestAnimFrame(animloop);
    tick();
})();
function createcirlce(canva, x, y, size, gradient1, gradient2, ecolor) {
    canva.beginPath();
    canva.lineWidth = 10;
    var grd = ctx.createRadialGradient(x, y, gradient1, x, y, gradient2);
    grd.addColorStop(0, "rgb(213, 49, 119)");
    grd.addColorStop(1, ecolor);
    canva.arc(x, y, size, 0, 2 * Math.PI);
    canva.fillStyle = grd;
    canva.fill();
}