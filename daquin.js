window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    // Daquin variables
    var img;
    var board = []; // contains rows * cols pieces
    var rows = 4; 
    var cols = 4;
    var h; // height of a piece
    var w; // width of a piece

    // Cheats
    var showNumbers = false;
    var showSolution = false;
    var numbersButton = document.getElementById("numbers");
    numbersButton.onclick = toggleNumbers;
    var solutionButton = document.getElementById("solution");
    solutionButton.onclick = toggleSolution;

    function toggleNumbers() { showNumbers = !showNumbers; }
    function toggleSolution() { showSolution = !showSolution; }

    function shuffleArray(arr) {
        arr.sort(() => Math.random() - 0.5);
    }

    function isNeighbor(x1, y1, x2, y2) {
        // Neither same row nor column
        if(x1 !== x2 && y1 !== y2) {
            return false;
        }
        // One piece away
        if(Math.abs(x1-x2)==1 || Math.abs(y1-y2)==1) { 
            return true; 
        }
        // Same row or col but too far
        return false;
    }

    function swap(i, j, arr) {
        var temp = arr[i];
        arr[i] = arr [j];
        arr[j] = temp;
    }

    function move(x, y, arr) {
        // find the blank spot
        var blank;
        for(var k=0; k<board.length; k++) {
            if(board[k].id==-1) blank=k;
        }
        var blankCol = blank % cols;
        var blankRow = Math.floor(blank / rows);

        if (isNeighbor(x, y, blankCol, blankRow)) {
            swap(blank, y*rows+x, arr);
        }
    }

    // Initialize the game
    function init() {
        // Get a random 400x400 image from unsplash.com
        img = new Image();
        img.src = "https://source.unsplash.com/400x400/";

        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        h = canvas.height / rows;
        w = canvas.width / cols;
        // cut the image into pieces
        for(var i=0; i<rows; i++) {
            for(var j=0; j<cols; j++) {
                // each piece has its coordinates instead of small images from source image
                board[i*rows+j] = {id: i*rows+j, x: j*w, y: i*h};
            }
        }
        // Remove last piece to create space to move pieces
        board.pop();
        board.push({id:-1});

        shuffleArray(board);

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

        for(var i=0; i<rows; i++) {
            for(var j=0; j<cols; j++) {
                var index = i*rows+j;
                var x = j*w;
                var y = i*h;
                if(!showSolution) {
                    if(board[index].id>-1) {
                        context.drawImage(img, board[index].x, board[index].y, w, h, x, y, w-1, h-1);
                        
                        if(showNumbers) {
                            context.fillStyle = "#505050"
                            context.fillRect(x, y, 20, 20);
                            context.fillStyle = "#FFFFFF";
                            context.fillText(board[index].id, x+5, y+12);
                        }
                    }
                } else {
                    if(i!==rows-1 || j!==cols-1) {
                        context.drawImage(img, x, y, w, h, x, y, w-1, h-1);
                    }
                }
            }
        }
    }

    // Mouse event handlers
    function onMouseMove(e) {}
    function onMouseDown(e) {
        if(!showSolution) {
            var tile = getMousePos(canvas, e);
            move(tile.x, tile.y, board);
        }
    }
    function onMouseUp(e) {}
    function onMouseOut(e) {}

    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.floor(((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width)/w),
            y: Math.floor(((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)/h)
        };
    }

    // Call init to start the game
    init();
}