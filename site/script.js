// These are global variables so you don't have to pass everything around
var height = 800;
var width = 1000;
var density = 25;
var c = document.getElementById("field");
var ctx = c.getContext("2d");
var changeDensity = document.getElementById("changeSize");
var grid = [];

// draw the grid
function drawField(ctx, width, height, density) {
    let locGrid = [[]];
    clearField(0, 0, width, height);

    for (let i=1; i < width; i++) {
        if(i % density == 0){
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
            locGrid.push([]);
        }
    }

    // The first column has to be added manually
    for (let n=0; n < width/density; n++) {
        locGrid[0].push(false);
    }

    for (let i=1; i < height; i++) {

        // Check width of one box
        if (i % density == 0){
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();

            // Append every field to the array
            for (let n=0; n < width/density; n++) {
                locGrid[i / density].push(false);
            }
        }
    }
    return locGrid;
}

function draw() {
    ctx.beginPath();
    for (let i=0; i < grid.length; i++) {
        for (let n=0; n < grid[i].length; n++) {

            // Get x and y as pixel coordinates in canvas
            let x = n*density;
            let y = i*density;
            
            if (grid[i][n]) {
                ctx.strokeStyle = "black";
                ctx.fillRect(x, y, x+density, y+density);
            } else {
    
                // The field gets wiped 
                // The additions and substractions are there so only the black box get's cleaned and not the grid
                clearField(x+1, y+1, density-2, density-2);
            }
        }
    }
    ctx.stroke();
}

// Turn a box black or white and change its state
function checkBox(x, y) {
    let pos = getGridPos(x, y);
    let state = grid[pos.y][pos.x];

    grid[pos.y][pos.x] = !state;
    draw();
}

// Clear a certain part or the field
function clearField(x, y, width, height) {
    ctx.clearRect(x, y, width, height);
}

// Get a pixel position translated in the grid position
function getGridPos(x, y) {
    return {
        x: x/density,
        y: y/density
    };
}

// Get the current position of the mouse inside the grid
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Call on mouseclick
function mouseDown(evt) {
    let mp = getMousePos(c, evt);
    mp.x = mp.x - (mp.x % density);
    mp.y = mp.y - (mp.y % density);
    checkBox(mp.x, mp.y, density, density);
}

function checkCells() {
    for (let i=0; i < grid.length; i++) {
        for (let n=0; n < grid[i].length; n++) {
            let neighbours = 0;
            let state = grid[i][n];

            // False = 0 and True = 1h
            // Add all neighbours to 'neighbours'

            // If 'n' is not at the left border
            if (n != 0) neighbours += grid[i][n-1];

            // If n is not at the right border
            if (n != grid[i].length - 1) neighbours += grid[i][n+1];

            // If 'i' is not at the top
            if (i != 0) {
                neighbours += grid[i-1][n+1] + grid[i-1][n-1] + grid[i-1][n];
            }

            // If 'i' is not at the bottom
            if (i != grid.length - 1) {
                neighbours += grid[i+1][n+1] + grid[i+1][n-1] + grid[i+1][n];
            }
            
            // If the Cell has less than 2 or more than 3 neighbours, it dies
            if ((neighbours < 2 || neighbours > 3) && state) {
                grid[i][n] = false;
            } else if (neighbours === 3 && !state) {
                grid[i][n] = true;
            }
        }
    }
}

function next() {
    let count = 1
    for (let i=0; i < count; i++) {
        checkCells();
        draw();
    }
}

function main() {
    grid = drawField(ctx, width, height, density);
    c.addEventListener("mousedown", mouseDown, false);
}

main();