var height = 800;
var width = 1000;
var density = 25;
var c = document.getElementById("field");

function drawField(ctx, width, height, density) {
    let grid = []

    for (let i=1; i < width; i++) {
        if(i % density == 0){
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
            grid.push([]);
        }
    }

    // The first column has to be added manually
    for (let n=0; n < width/density; n++) {
        grid[0].push(false);
    }

    for (let i=1; i < height; i++) {

        // Check width of one box
        if (i % density == 0){
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();

            // Append every field to the array
            for (let n=0; n < width/density; n++) {
                grid[i / density].push(false);
            }
        }
    }
    return grid
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mouseMove(event) {
    let mp = getMousePos(c, event);
    
}

function main() {
    let ctx = c.getContext("2d");
    let grid = drawField(ctx, width, height, density);

    c.addEventListener("mousemove", mouseMove, false);
}

main()