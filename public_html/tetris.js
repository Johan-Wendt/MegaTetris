"use strict";

var context = document.getElementById('canvasId').getContext("2d");
var fps = 30;
var blockSize = 5;
var thePiece;
var startPositionX = 100;
var startPositionY = 100;
var gameSpeed = 2;
var currentTurn = 1;
var strokeSize = 2;
var left = 0;
var up = 1;
var right = 2;
var down = 3;
window.onload = windowReady;


function windowReady() {
    
    var aShape = [true, true, true, false, true, false, false, false, false];
    thePiece = new piece(aShape);
    context.lineWidth = strokeSize;
    
    setInterval(act, 1000 / fps);
    
    
    window.addEventListener("keydown", this.check, false);
}

function check(e) {
    var code = e.keyCode;
    console.log(code);
    
    switch (code) {
        case 37: move(left); break; 
        case 38: flipPieceRight(); break; 
        case 39: move(right); break;  
        case 40: ; break; 
    }
}

function act() {
    showPiece();
    movePiece();
    updateTurn();
}

class piece {
    //Shape is an array that resimbles a 3*3 block.
    constructor(shape) {
        this._color = null;
        this._shape = shape;
        this._positionX = startPositionX;
        this._positionY = startPositionY;
    }
    get positionX() {
        return this._positionX; 
    }
    set positionX(positionX) { 
        this._positionX = positionX; 
    }
    get positionY() {
        return this._positionY; 
    }
    set positionY(positionY) { 
        this._positionY = positionY; 
    }
    get shape() {
        return this._shape; 
    }
    set shape(shape) { 
        this._shape = shape; 
    }
}

function showPiece() {
    var shape = thePiece.shape
    for (let m = 0; m < shape.length; m++) {
       if(shape[m]) {
          // console.log(m);
           showRect(thePiece.positionX, thePiece.positionY, m);
       }
    }
}
function showRect(xPos, yPos, disp) {
    var xDisp;
    var yDisp;
    if(disp <= 2) {
        xDisp = disp;
        yDisp = 0;
    }
    else if(disp <= 5) {
        xDisp = disp -3;
        yDisp = 1;
    }
    else if(disp <= 8) {
        xDisp = disp -6;
        yDisp = 2;
    }
    context.strokeRect(xPos + xDisp * blockSize, yPos + yDisp * blockSize, blockSize, blockSize);
}

function movePiece() {
    if(currentTurn % gameSpeed == 0) {
        move(down);
    }
}

function move(direction) {
    if(direction == left) {
        clearPiece();
        thePiece.positionX = thePiece.positionX - blockSize;
    }
    if(direction == up) {
        clearPiece();
        thePiece.positionY = thePiece.positionY - blockSize;
    }
    if(direction == right) {
        clearPiece();
        thePiece.positionX = thePiece.positionX + blockSize;
    }
    if(direction == down) {
        clearPiece();
        thePiece.positionY = thePiece.positionY + blockSize;
    }
}

function clearPiece() {
    var shape = thePiece.shape
    for (let m = 0; m < shape.length; m++) {
       if(shape[m]) {
           clearRect(thePiece.positionX, thePiece.positionY, m);
       }
    }
}

function clearRect(xPos, yPos, disp) {
    var xDisp;
    var yDisp;
    if(disp <= 2) {
        xDisp = disp;
        yDisp = 0;
    }
    else if(disp <= 5) {
        xDisp = disp -3;
        yDisp = 1;
    }
    else if(disp <= 8) {
        xDisp = disp -6;
        yDisp = 2;
    }
    context.clearRect(xPos + xDisp * blockSize - strokeSize / 2, yPos + yDisp * blockSize - strokeSize / 2, blockSize + strokeSize, blockSize + strokeSize);
}

function flipPieceRight() {
    clearPiece();
    var flippedPiece = [];
    var shape = thePiece.shape;
    for (let n = 0; n < shape.length; n++) {
        flippedPiece[n] = false;
    }
    for (let m = 0; m < shape.length; m++) {
        console.log("m = " + m);
        console.log("trans = " + transposedRight(m));
       if(shape[m]) {
           flippedPiece[transposedRight(m)] = true;
       }
    }
    thePiece.shape = flippedPiece;
}

function transposedRight(value) {
    var xDisp = calcXDisp(value);
    var yDisp = calcYDisp(value);
    var yFlipped = flipYDisp(yDisp);
    return (value + xDisp) * 3 + yFlipped;
}

function updateTurn() {
    currentTurn ++;
}

function calcYDisp(val) {
    if(val < 3) {
        return 0;
    }
    else if(val < 6) {
        return 1;
    }
    else {
        return 2;
    }
}
function calcXDisp(val) {
    if(val < 3) {
        return 0;
    }
    else if(val < 6) {
        return -3;
    }
    else {
        return -6;
    }
}
function flipYDisp(yDisp) {
    if(yDisp == 0) {
        return 2;
    }
    if(yDisp == 1) {
        return 1;
    }
    if(yDisp == 2) {
        return 0;
    }
}
