function compare(a, b) {
	const idA = a.id.split('-')[0].toUpperCase();
	const idB = b.id.split('-')[0].toUpperCase();
  
	let comparison = 0;
	if (idA > idB) {
	  comparison = 1;
	} else if (idA < idB) {
	  comparison = -1;
	}
	return comparison;
}

var sortedData=data.sort(compare);
/*
var mainDiv=document.getElementById("main");

for(i in sortedData) {
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id", sortedData[i].id);
	var newImg=document.createElement("img");
	newImg.setAttribute("src", sortedData[i].images.small);
	newImg.setAttribute("alt", sortedData[i].id+sortedData[i].name);
	newImg.setAttribute("title", sortedData[i].id+" : "+sortedData[i].name);
	newDiv.appendChild(newImg);
	mainDiv.appendChild(newDiv);
}
*/

// The function gets called when the window is fully loaded
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    // Initialize the game
    function init() {
        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        // Enter main loop
        main(0);
    }

    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);

        // Update and render the game
        update(tframe);
        render();
    }

    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;

        // Update the fps counter
        updateFps(dt);
    }

    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);

            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }

        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }

    // Render the game
    function render() {
        // Draw the frame
        drawFrame();
    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);

				// Draw a Pokecard for example
				var i = 0;
			  var img = new Image();
				img.src = sortedData[i].images.small;
				img.alt = sortedData[i].id+sortedData[i].name;
				img.title = sortedData[i].id+" : "+sortedData[i].name;
				context.drawImage(img,0,0);
    }

    // Mouse event handlers
    function onMouseMove(e) {}
    function onMouseDown(e) {}
    function onMouseUp(e) {}
    function onMouseOut(e) {}

    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }

    // Call init to start the game
    init();
};
