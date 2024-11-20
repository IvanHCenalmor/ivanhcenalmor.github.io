// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function writeH(arr, mid_x, mid_y, letter_pixel_width){
  // Create H
  // Create right |
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  // Create middle -
  for (let i = -1*(letter_pixel_width); i < 2*(letter_pixel_width); i++) {
    for (let j = 0*(letter_pixel_width); j < 1*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  // Create left |
  for (let i = 2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  return arr
}

function writeI(arr, mid_x, mid_y, letter_pixel_width){
  // Create top -
  for (let i = -2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = 2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create middle |
  for (let i = 0*(letter_pixel_width); i < 1*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < 2*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create bottom -
  for (let i = -2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < -1*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  return arr
}

function writeL(arr, mid_x, mid_y, letter_pixel_width){
  // Create right |
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create bottom -
  for (let i = -2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = 2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  return arr
}

function writeK(arr, mid_x, mid_y, letter_pixel_width){
  // Create right |
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create middle -
  for (let i = 0*(letter_pixel_width); i < 2*(letter_pixel_width); i++) {
    for (let j = 0*(letter_pixel_width); j < 1*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  // Create left part
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = 2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  for (let i = -1*(letter_pixel_width); i < 0*(letter_pixel_width); i++) {
    for (let j = 1*(letter_pixel_width); j < 2*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < -1*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  for (let i = -1*(letter_pixel_width); i < 0*(letter_pixel_width); i++) {
    for (let j = -1*(letter_pixel_width); j < 0*(letter_pixel_width); j++) {
      arr[mid_x-i][mid_y+j] = 400
    }
  }
  return arr
}

function writeC(arr, mid_x, mid_y, letter_pixel_width){
  // Create bottom -
  for (let i = -1*(letter_pixel_width); i < 2*(letter_pixel_width); i++) {
    for (let j = 2*(letter_pixel_width); j < 3*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create right |
  for (let i = -2*(letter_pixel_width); i < -1*(letter_pixel_width); i++) {
    for (let j = -1*(letter_pixel_width); j < 2*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create top -
  for (let i = -1*(letter_pixel_width); i < 2*(letter_pixel_width); i++) {
    for (let j = -2*(letter_pixel_width); j < -1*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  // Create left ¦
  for (let i = 2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = -1*(letter_pixel_width); j < 0*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  for (let i = 2*(letter_pixel_width); i < 3*(letter_pixel_width); i++) {
    for (let j = 1*(letter_pixel_width); j < 2*(letter_pixel_width); j++) {
      arr[mid_x+i][mid_y+j] = 400
    }
  }
  return arr
}


function writeName(arr, cols, rows, pixel_width) {
  mid_col = ceil(cols/2)
  mid_row = ceil(rows/2)
  
  letter_pixel_width = 10/pixel_width
  
  min_word_x = pixel_width * (mid_col - 14*(letter_pixel_width));
  max_word_x = pixel_width * (mid_col + 14*(letter_pixel_width));
  min_word_y = pixel_width * (mid_row - 2*(letter_pixel_width)); 
  max_word_y = pixel_width * (mid_row + 2*(letter_pixel_width));

  arr = writeC(arr, mid_col-12*(letter_pixel_width), mid_row+0*(letter_pixel_width), letter_pixel_width)
  arr = writeL(arr, mid_col-6*(letter_pixel_width), mid_row+0*(letter_pixel_width), letter_pixel_width)
  arr = writeI(arr, mid_col+0*(letter_pixel_width), mid_row+0*(letter_pixel_width), letter_pixel_width)
  arr = writeC(arr, mid_col+6*(letter_pixel_width), mid_row+0*(letter_pixel_width), letter_pixel_width)
  arr = writeK(arr, mid_col+12*(letter_pixel_width), mid_row+0*(letter_pixel_width), letter_pixel_width)
  
  return arr
}

function make2DArray(cols, rows, pixel_width) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  
  written_arr = writeName(arr, cols, rows, pixel_width)
  
  return written_arr;
}

// The grid
let grid;
// How big is each square?
let w = 5;
if (w > 10){
  // Maximum square size of 10
  w = 10
}

// Define Word area
let min_word_x, max_word_x, min_word_y, max_word_y;

// Columns and row
let cols, rows;
let hueValue = 200;

// Counter to remove last row of sand
let cont = 0;
let frequency = 50;

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

function setup() {
  createCanvas((round(window.innerWidth/w) - 1) * w , (round(window.innerHeight/w) - 1) * w);
  colorMode(HSB, 360, 255, 255);
  cols = round(window.innerWidth/w) - 1;
  rows = round(window.innerHeight/w) - 1;
  grid = make2DArray(cols, rows, w);
}

function mouseMoved() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);
  
  // Randomly add an area of sand particles
  let matrix = 10;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          if (grid[col][row] === 0) { // Only draw if is background
            grid[col][row] = hueValue;
          }
        }
      }
    }
  }
  // Change the color of the sand over time
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function draw() {
  background(0);
  
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }
  
  // Create a 2D array for the next frame of animation
  let nextGrid = make2DArray(cols, rows, w);
  
  // Check every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows ; j++) {
      // What is the state?
      let state = grid[i][j];
      
      // If it's a piece of sand!
      if (state > 0) {
        if (state === 400) {
          // If is text/word
          nextGrid[i][j] = state;
        } else {
          // Otherwise
          
          // What is below?
          let below = grid[i][j + 1];

          // Randomly fall left or right
          let dir = 1;
          if (random(1) < 0.5) {
            dir *= -1;
          }

          // Check below left or right
          let belowA = -1;
          let belowB = -1;
          if (withinCols(i + dir)) {
            belowA = grid[i + dir][j + 1];
          }
          if (withinCols(i - dir)) {
            belowB = grid[i - dir][j + 1];
          }

          // Can it fall below or left or right?
          if (below === 0) {
            nextGrid[i][j + 1] = state;
          } else if (belowA === 0) {
            nextGrid[i + dir][j + 1] = state;
          } else if (belowB === 0) {
            nextGrid[i - dir][j + 1] = state;
          // Stay put!
          } else {
            if (cont === frequency) {
              // If is the Xth time, remove a row
              if (j != rows) {
                nextGrid[i][j+1] = state;
              }
            } else {
              // Otherwise keep
              nextGrid[i][j] = state;
            }
          }
          
        }
      }
    }
  }
  if (cont === frequency) {
    cont = 0;
  }
  cont = cont + 1;
  grid = nextGrid;
}

// Start the race when the user presses the mouse on click.
function mousePressed() {
  if (min_word_x < mouseX && mouseX < max_word_x) {
    if (min_word_y < mouseY && mouseY < max_word_y) {
      window.open("https://ivanhcenalmor.github.io/#about");
    }
  }
}

window.onresize = function() {
  // assigns new values for width and height variables 
  cols = round(window.innerWidth/w) - 1;
  rows = round(window.innerHeight/w) - 1;
  grid = make2DArray(cols, rows, w);
  createCanvas((round(window.innerWidth/w) - 1) * w , (round(window.innerHeight/w) - 1) * w);
  canvas.size((round(window.innerWidth/w) - 1) * w , (round(window.innerHeight/w) - 1) * w);
}
