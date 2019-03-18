
/**Grid Operation 
 * which will execute the grid box function : displayGrid() and then on the second click this will execute the function croppedImage() which will crop the image
 */
document.getElementById("mybtn").addEventListener("click", displayGrid);

let clickCount = 1;

// This function is used to display the grid box when the crop button is clicked 
function displayGrid() {
  document.getElementById("crop-box-display").style.display = "block";
  document.getElementById("mybtn").style.backgroundColor = "lightgrey";
  document.getElementById("mybtn").style.borderColor = "white";
  document.getElementById("mybtn").style.opacity = ".7";
  document.getElementById("image").style.border = "2px solid white";
  document.getElementById("image").style.opacity = ".5";

  clickCount++;
  //if the count is 2 then the croppedImage function will get executed
  if(clickCount==2){
    document.getElementById("mybtn").addEventListener("click", croppedImage);
  } 
}

"use strict";

// Minimum resizable area
let minWidth = 60;
let minHeight = 60;
  
// Thresholds
let FULLSCREEN_MARGINS = -10;
let MARGINS = 4;
  
// End of what's configurable.
let clicked = null;
let onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;
  
let rightScreenEdge, bottomScreenEdge;
let b, x, y;  
let redraw = false;
  
let crop = document.getElementById('crop-box-display');
  
// Adding eventListeners for Mouse events
crop.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMove);
document.addEventListener('mouseup', onUp);
  
// Adding eventListeners for Touch events 
crop.addEventListener('touchstart', onTouchDown);
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);
  
/**
 * This event occurs when the user touch the screen over an element
 * @param {object} e 
 */
function onTouchDown(e) {
  onDown(e.touches[0]);
  e.preventDefault(); // it is called so that no other addition mouse event could be dispatched
}
  
/**
 * The event occurs when a finger is dragged across the screen
 * @param {object} e 
 */
function onTouchMove(e) {
  onMove(e.touches[0]);   
}

/**
 * The event occurs when a finger is removed from a touch screen
 * @param {object} e 
 */
function onTouchEnd(e) {
  if (e.touches.length ==0) onUp(e.changedTouches[0]);
}
  
/**
 * The event occurs when the user presses a mouse button over an element
 * @param {object} e 
 */
function onMouseDown(e) {
  onDown(e);
  e.preventDefault(); // it is called so that no other addition mouse event could be dispatched
}
  
/**
 * the event occurs when the user interact with an element by touch/mouse
 * @param {object} e 
 */
function onDown(e) {
  calc(e); // calling the fucntion calc and passed the event e
  
  let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
  
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
  }; // events when clicked
}

//this function is used for moving the element
function canMove() {
  return x > 0 && x < b.width && y > 0 && y < b.height;
}
  
/**
 * This function is used to calculate the co-ordinates of the element by getting the user client boundary values
 * @param {object} e 
 */
function calc(e) {
  b = crop.getBoundingClientRect(); //returns the size of an element and its position relative to the viewport.
  x = e.clientX - b.left;
  y = e.clientY - b.top;
  
  onTopEdge = y < MARGINS;
  onLeftEdge = x < MARGINS;
  onRightEdge = x >= b.width - MARGINS;
  onBottomEdge = y >= b.height - MARGINS;
  
  rightScreenEdge = window.innerWidth - MARGINS;
  bottomScreenEdge = window.innerHeight - MARGINS;
}
  
let e;

/**
 * this function is used for ongoing movements of an element
 * @param {object} ee 
 */
function onMove(ee) {
  calc(ee);  
  e = ee;
  redraw = true;
}
  
/**
 * This function is used to animate the resising of the grid box when operated from different portions of the box
 * @returns : user client coordinates
 */
function animate() { 
  requestAnimationFrame(animate); // to tell the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. 
  if (!redraw) return;
  redraw = false;
  
  if (clicked && clicked.isResizing) {
  
    if (clicked.onRightEdge) crop.style.width = Math.max(x, minWidth) + 'px'; // resizing for the rightedge of the grid box
    if (clicked.onBottomEdge) crop.style.height = Math.max(y, minHeight) + 'px'; // resizing for the bottomEdge of the grid box
  
    if (clicked.onLeftEdge) {
      let currentWidth = Math.max(clicked.cx - e.clientX  + clicked.w, minWidth); // The Math.max() function returns the largest of zero or more numbers.
      if (currentWidth > minWidth) {
        crop.style.width = currentWidth + 'px';
        crop.style.left = e.clientX + 'px'; 
      }
    } // resizing for the leftEdge of the grid box
  
    if (clicked.onTopEdge) {
      let currentHeight = Math.max(clicked.cy - e.clientY  + clicked.h, minHeight); // The Math.max() function returns the largest of zero or more numbers.
      if (currentHeight > minHeight) {
        crop.style.height = currentHeight + 'px';
        crop.style.top = e.clientY + 'px';  
      }
    } // resizing for the topEdge of the grid box
    return;
  }
  
  if (clicked && clicked.isMoving) {
    // for moving the grid box
    crop.style.top = (e.clientY - clicked.y) + 'px';
    crop.style.left = (e.clientX - clicked.x) + 'px';
  
    return;
  }

  // This code executes when mouse moves without clicking
  // style cursor
  if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
    crop.style.cursor = 'nwse-resize';
  } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
    crop.style.cursor = 'nesw-resize';
  } else if (onRightEdge || onLeftEdge) {
    crop.style.cursor = 'ew-resize';
  } else if (onBottomEdge || onTopEdge) {
    crop.style.cursor = 'ns-resize';
  } else if (canMove()) {
    crop.style.cursor = 'move';
  } else {
    crop.style.cursor = 'default';
  }
}
  
animate();
  
/**
 * this function calls the clac function and set the clicked as null
 * @param {object} e 
 */
function onUp(e) {
  calc(e);
  clicked = null; 
}

/**
 * This function will be executed when the crop button is clicked for econd time, which will crop the specific portion of the whole image with respect to the grid box 
 */
function croppedImage() {
  // hidding the main image
  document.getElementById("image").style.visibility ="hidden";
  
  // changing the border of the lines to none
  document.getElementById("grid-box").style.outline = "none";
  document.getElementById("grid-line1").style.border = "none";
  document.getElementById("grid-line2").style.border = "none";
  
  // changing the opacity of the center point and other boundary points of the grid box
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
  
  //disabling the mouse pointer events so that clicking, moving and resizing will not work
  document.getElementById("crop-box-display").style.pointerEvents = "none";

  // changing the style of the crop button when clicked second time
  document.getElementById("mybtn").style = "none";
}

/**
 * Adding the event listener for the window when it is unloaded, this will remove all other event listener 
 * The EventTarget method addEventListener() sets up a function that will be called whenever the specified event is delivered to the target.
 * The EventTarget.removeEventListener() method removes from the EventTarget an event listener previously registered with EventTarget.addEventListener().
 */
window.addEventListener('unload', function(event) {
  document.getElementById("mybtn").removeEventListener("click", displayGrid);
  document.getElementById("mybtn").removeEventListener("click", croppedImage);

  // Mouse Events
  crop.removeEventListener('mousedown', onMouseDown);
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseup', onUp);
    
  // Touch Events
  crop.removeEventListener('touchstart', onTouchDown);
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
});