/**grid box operation */

document.getElementById("mybtn").addEventListener("click", displayGrid);

var clickCount = 1;

function displayGrid(event) {
  document.getElementById("crop-box-display").style.display = "block";
  document.getElementById("mybtn").style.backgroundColor = "white";
    document.getElementById("mybtn").style.borderColor = "red";
    document.getElementById("mybtn").style.opacity = ".5";
    document.getElementById("image").style.border = "2px solid white";
    document.getElementById("image").style.opacity = ".5";

    clickCount++;

    if(clickCount==2){
      
      document.getElementById("mybtn").addEventListener("click", croppedImage);
    } 
}

  "use strict";

  // Minimum resizable area
  var minWidth = 60;
  var minHeight = 40;
  
  // Thresholds
  var FULLSCREEN_MARGINS = -10;
  var MARGINS = 4;
  
  // End of what's configurable.
  var clicked = null;
  var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;
  
  var rightScreenEdge, bottomScreenEdge;
  
  var preSnapped;
  
  var b, x, y;
  
  var redraw = false;
  
  var pane = document.getElementById('crop-box-display');
  // var ghostpane = document.getElementById('ghostpane');
  
  function setBounds(element, x, y, w, h) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.width = w + 'px';
    element.style.height = h + 'px';
  }
  
  function hintHide() {
    setBounds(b.left, b.top, b.width, b.height);
  }
  
  // Mouse events
  pane.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  
  // Touch events 
  pane.addEventListener('touchstart', onTouchDown);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
  
  function onTouchDown(e) {
    onDown(e.touches[0]);
    e.preventDefault();
  }
  
  function onTouchMove(e) {
    onMove(e.touches[0]);   
  }
  
  function onTouchEnd(e) {
    if (e.touches.length ==0) onUp(e.changedTouches[0]);
  }
  
  function onMouseDown(e) {
    onDown(e);
    e.preventDefault();
  }
  
  function onDown(e) {
    calc(e);
  
    var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
  
    clicked = {
      x: x,
      y: y,
      cx: e.clientX,
      cy: e.clientY,
      w: b.width,
      h: b.height,
      isResizing: isResizing,
      isMoving: !isResizing && canMove(),
      onTopEdge: onTopEdge,
      onLeftEdge: onLeftEdge,
      onRightEdge: onRightEdge,
      onBottomEdge: onBottomEdge
    };
  }
  
  function canMove() {
    return x > 0 && x < b.width && y > 0 && y < b.height;
  }
  
  function calc(e) {
    b = pane.getBoundingClientRect();
    x = e.clientX - b.left;
    y = e.clientY - b.top;
  
    onTopEdge = y < MARGINS;
    onLeftEdge = x < MARGINS;
    onRightEdge = x >= b.width - MARGINS;
    onBottomEdge = y >= b.height - MARGINS;
  
    rightScreenEdge = window.innerWidth - MARGINS;
    bottomScreenEdge = window.innerHeight - MARGINS;
  }
  
  var e;
  
  function onMove(ee) {
    calc(ee);
  
    e = ee;
  
    redraw = true;
  
  }
  
  function animate() {
  
    requestAnimationFrame(animate);
  
    if (!redraw) return;
  
    redraw = false;
  
    if (clicked && clicked.isResizing) {
  
      if (clicked.onRightEdge) pane.style.width = Math.max(x, minWidth) + 'px';
      if (clicked.onBottomEdge) pane.style.height = Math.max(y, minHeight) + 'px';
  
      if (clicked.onLeftEdge) {
        var currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth);
        if (currentWidth > minWidth) {
          pane.style.width = currentWidth + 'px';
          pane.style.left = e.clientX + 'px'; 
        }
      }
  
      if (clicked.onTopEdge) {
        var currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight);
        if (currentHeight > minHeight) {
          pane.style.height = currentHeight + 'px';
          pane.style.top = e.clientY + 'px';  
        }
      }
  
      hintHide();
  
      return;
    }
  
    if (clicked && clicked.isMoving) {
      // moving
      pane.style.top = (e.clientY - clicked.y) + 'px';
       pane.style.left = (e.clientX - clicked.x) + 'px';
  
      return;
    }
  
    // This code executes when mouse moves without clicking
  
    // style cursor
    if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
      pane.style.cursor = 'nwse-resize';
    } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
      pane.style.cursor = 'nesw-resize';
    } else if (onRightEdge || onLeftEdge) {
      pane.style.cursor = 'ew-resize';
    } else if (onBottomEdge || onTopEdge) {
      pane.style.cursor = 'ns-resize';
    } else if (canMove()) {
      pane.style.cursor = 'move';
    } else {
      pane.style.cursor = 'default';
    }
  }
  
  animate();
  
  function onUp(e) {
    calc(e);
  
    clicked = null; 
    
}


// document.getElementById("mybtn").addEventListener("click", croppedImage);
function croppedImage() {
 
  document.getElementById("image").style.visibility ="hidden";
  document.getElementById("grid-box").style.outline = "none";
  document.getElementById("grid-line1").style.border = "none";
  document.getElementById("grid-line2").style.border = "none";
 
  document.getElementById("center").style.opacity = "0";
  document.getElementById("point1").style.opacity = "0";
  document.getElementById("point1").style.opacity = "0";
  document.getElementById("point2").style.opacity = "0";
  document.getElementById("point3").style.opacity = "0";
  document.getElementById("point4").style.opacity = "0";
  document.getElementById("point5").style.opacity = "0";
  document.getElementById("point6").style.opacity = "0";
  document.getElementById("point7").style.opacity = "0";
  document.getElementById("point8").style.opacity = "0";
  document.getElementById("point9").style.opacity = "0";
  document.getElementById("point10").style.opacity = "0";
  document.getElementById("point11").style.opacity = "0";
  document.getElementById("point12").style.opacity = "0";
  
  document.getElementById("crop-box-display").style.pointerEvents = "none";
  document.getElementById("mybtn").style = "none";


 
}