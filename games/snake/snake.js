// Get apple position
function getApplePosition() {
  // We don't want it to be in the border positions
  return { x: floor(random(cols-2))+1, y: floor(random(rows-2))+1};
}

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols-1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows-1;
}

// Check if the position is within the bound
function withinCanvas(i, j) {
  return withinCols(i) && withinRows(j)
}

// Check if value is on list
function onList(list, x, y) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].x === x && list[i].y === y) {
      return true;
    }
  }
  return false;
}

// Show the moving keys on a message
confirm("Welcome to the snake game!\nThis are the controls:\nA - Left\nD - Right\nW - Up\sS - Donw\nEnjoy!");

// Define the grid
let grid;

// How big is each square?
let w = 10;
if (w > 10){
  // Maximum square size of 10
  w = 10
}

// Columns and row
let cols, rows;

// Direction of the snake
let direction = "Down";

// Define the snake
let snake;

// Define the apple
let eaten;
let apple_pos;

// Define flag for loosing
let lost;

// Positions for drawing
let head_pos, head_pos_x,head_pos_y;
let new_head_pox_x ,new_head_pos_y;
let snake_pos_x, snake_pos_y;

// Initialize the canvas and all the process
function setup() {
  // Define the grid size
  cols = round(window.innerWidth/w) - 1;
  rows = round(window.innerHeight/w) - 1;

  // Create the canvas
  createCanvas(cols * w , rows * w);
  frameRate(15);
  colorMode(RGB, 255, 255, 255);
  
  // Initialize the snake in the middle of the canvas
  snake = [];
  random_col = floor(cols/2);
  random_row = floor(rows/2);
  for(let i = 0; i < 20; i++) {
    snake.push({ x:random_col, y:random_row+i});
  }

  // Initialize the apple
  eaten = false;
  apple_pos = getApplePosition();
  
  // Initialize lost flag
  lost = false;
}

function draw() {
  // Draw the background
  background(0,0,0);
  // Draw apple
  noStroke();
  fill(255,1,1);
  square(apple_pos.x*w, apple_pos.y*w, w);
  // Draw the snake
  for(let i = 0; i < snake.length; i++) {
    noStroke();
    fill(255,255,255);
    square(snake[i].x*w, snake[i].y*w, w);
  }
  
  // Update direction if a key is pressed.
  if (keyIsPressed === true) {
    if (key === 'w' && direction != "Down") {
      direction = "Up";
    } else if (key === 's' && direction != "Up") {
      direction = "Down";
    } else if (key === 'a' && direction != "Right") {
      direction = "Left";
    } else if (key === 'd' && direction != "Left") {
      direction = "Right";
    }
  }

  // Update snake positions (remove last, add new)
  head_pos = snake[snake.length-1];
  head_pos_x = head_pos.x;
  head_pos_y = head_pos.y;

  if (direction === "Up") {
    new_head_pos_x = head_pos_x;
    new_head_pos_y = head_pos_y - 1;
  } else if (direction === "Down") {
    new_head_pos_x = head_pos_x;
    new_head_pos_y = head_pos_y + 1;
  } else if (direction === "Left") {
    new_head_pos_x = head_pos_x - 1;
    new_head_pos_y = head_pos_y;
  } else {
    new_head_pos_x = head_pos_x + 1;
    new_head_pos_y = head_pos_y;
  }
  
  // Check if the new head position is within the canvas
  if (withinCanvas(new_head_pos_x, new_head_pos_y)) {
    // Check if the new head position is the same as the apple
    if (apple_pos.x===new_head_pos_x && apple_pos.y===new_head_pos_y){
      eaten = true;
    } else if (onList(snake, new_head_pos_x, new_head_pos_y)) {
      // Check if the new head position enters in contact with the snake
      lost = true;
    }
  } else {
    lost = true;
  }
  
  if (lost) {
    theConfirm=confirm("Ooooo you lost, wanna play another?");
    if (theConfirm) {
      // Reset the game
      setup();
    } else { 
      // Stop the game
      noLoop();
    }
  } else {
    // Add ne snake position
    snake.push({ x:new_head_pos_x, y:new_head_pos_y });

    // If eaten, update apple position
    if (eaten) {
      eaten = false;
      apple_pos = getApplePosition();
    } else { // If no apple has been eaten, the snake does not grow (shift last value)
      snake.shift();
    }
    
    // Draw the background
    background(0,0,0);

    // Draw apple
    noStroke();
    fill(255,1,1);
    square(apple_pos.x*w, apple_pos.y*w, w);

    // Draw the snake
    for(let i = 0; i < snake.length; i++) {
      noStroke();
      fill(255,255,255);
      square(snake[i].x*w, snake[i].y*w, w);
    }
  }
}

window.onresize = function() {
  // assigns new values for width and height variables 
  cols = round(window.innerWidth/w) - 1;
  rows = round(window.innerHeight/w) - 1;
  createCanvas((round(window.innerWidth/w) - 1) * w , (round(window.innerHeight/w) - 1) * w);
  canvas.size((round(window.innerWidth/w) - 1) * w , (round(window.innerHeight/w) - 1) * w);
}