let forceMeter1 = 0;
let forceMeter2 = 0;
let player1Force = 0;
let player2Force = 0;
let selected = false;
let winner = null;
let player1Position = 300;
let player2Position = 300;
let isJousting = false;
let joustProgress = 0;
let player1Health = 100;
let player2Health = 100;
let currentRound = 1;
let totalRounds = 3;
let gameWinner = null;
let bg;

function setup() {
  bg = loadImage("Jousting.jpg");
  createCanvas(1300, 700);
}

function draw() {
  background(bg); // Sky color
  drawGame();

  // Display the current round
  displayCurrentRound();

  // Check if the game has concluded
  if (gameWinner) {
    displayGameWinner();
    return;
  }

  // Check if a round winner is being displayed
  if (winner) {
    displayRoundWinner();
    handleRoundTransition();
    return;
  }

  // Continue the game logic
  if (!selected) {
    updateForceMeters();
    displayForceMeter();
  } else if (isJousting) {
    animateJoust();
  }
}


function displayCurrentRound() {
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);
  if (currentRound < 4) {
    text("Round: " + currentRound + " of " + totalRounds, width / 2, 50);
  } else {
    text("Round: 3 of " + totalRounds, width / 2, 50);
  }
}

function displayRoundWinner() {
  textSize(32);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);

  if (winner) {
    text(winner, width / 2, height / 2);
  }
}

function nextRound() {
  if (currentRound < totalRounds) {
    currentRound++;
    player1Force = 0;
    player2Force = 0;
    selected = false;
    joustProgress = 0;
  } else {
    determineGameWinner();
  }
}

function determineGameWinner() {
  if (player2Health === 0) {
    gameWinner = "Player 1 wins the game!";
  } else if (player1Health === 0) {
    gameWinner = "Player 2 wins the game!";
  } else {
    gameWinner = "The game is a tie!";
  }
}

function displayGameWinner() {
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text(gameWinner, width / 2, height / 2);
}

function drawGame() {
  let horseY = 400;

  // Draw the left figure (Player 1)
  drawSpear(player1Position + player1Force * joustProgress, horseY);
  drawHorse(player1Position + player1Force * joustProgress, horseY);
  drawKnight(player1Position + player1Force * joustProgress - 15, horseY - 55);

  // Draw the mirrored right figure (Player 2)
  push();
  translate(width - player2Position - player2Force * joustProgress, 0);
  scale(-1, 1);
  drawSpear(0, horseY);
  drawHorse(0, horseY);
  drawKnight(-15, horseY - 55);
  pop();

  // Display health and stamina
  displayStats();
}

function drawSpear(x, y) {
  let bodyColor = color(120, 80, 50);
  let darkColor = color(90, 60, 40);
  let lightColor = color(140, 100, 60);
  let extradarkColor = color(55, 1, 3);

  //for knight spear to be behind the horse
  // spear
  fill(200, 200, 200);
  strokeWeight(1);
  stroke(200, 200, 200);
  rect(x + 35, y - 75, 120, 3); // Lance shaft forward
  fill(200, 200, 200);
  triangle(x + 155, y - 16 - 60, x + 155, y - 71, x + 275, y - 74); // Lance tip
}

function drawHorse(x, y) {
  let bodyColor = color(120, 80, 50);
  let darkColor = color(90, 60, 40);
  let lightColor = color(140, 100, 60);
  let extradarkColor = color(55, 1, 3);
  stroke(0);

  // Body and neck
  fill(bodyColor);
  beginShape();
  vertex(x + 60, y - 100);
  vertex(x + 50, y - 75);
  vertex(x + 55, y - 75);
  vertex(x + 40, y - 45);
  vertex(x + 45, y - 45);
  vertex(x + 30, y - 15);
  vertex(x - 70, y);
  vertex(x - 75, y + 15);
  vertex(x - 75, y + 25);
  vertex(x - 78, y + 47);
  vertex(x + 30, y + 50);
  vertex(x + 70, y + 40);
  vertex(x + 90, y + 11);
  vertex(x + 80, y - 65);
  vertex(x + 120, y - 35);
  vertex(x + 130, y - 45);
  vertex(x + 100, y - 90);
  vertex(x + 80, y - 100);
  endShape(CLOSE);

  // Ears
  fill(darkColor);
  triangle(x + 80, y - 100, x + 67, y - 120, x + 70, y - 100);
  triangle(x + 75, y - 100, x + 62, y - 120, x + 65, y - 100);

  // Tail
  fill(darkColor);
  beginShape();
  vertex(x - 73, y + 10);
  vertex(x - 95, y + 25);
  vertex(x - 95, y + 85);
  vertex(x - 105, y + 95);
  vertex(x - 90, y + 90);
  vertex(x - 85, y + 85);
  vertex(x - 85, y + 40);
  endShape(CLOSE);

  // Legs
  fill(darkColor);
  // Front right leg
  beginShape();
  vertex(x + 57, y + 44);
  vertex(x + 43, y + 47);
  vertex(x + 42, y + 80);
  vertex(x + 40, y + 115);
  vertex(x + 50, y + 115);
  endShape(CLOSE);

  // Front left leg
  beginShape();
  vertex(x + 55, y + 44);
  vertex(x + 60, y + 80);
  vertex(x + 65, y + 115);
  vertex(x + 75, y + 115);
  vertex(x + 70, y + 40);
  endShape(CLOSE);

  // Back right leg
  beginShape();
  vertex(x - 65, y + 47);
  vertex(x - 67, y + 80);
  vertex(x - 57, y + 115);
  vertex(x - 47, y + 115);
  vertex(x - 53, y + 80);
  vertex(x - 33, y + 47);
  endShape(CLOSE);

  //Back left leg
  beginShape();
  vertex(x - 78, y + 47);
  vertex(x - 80, y + 80);
  vertex(x - 70, y + 115);
  vertex(x - 60, y + 115);
  vertex(x - 65, y + 80);
  vertex(x - 45, y + 47);
  endShape(CLOSE);

  fill(extradarkColor);

  //mane
  beginShape();
  vertex(x + 60, y - 100);
  vertex(x + 45, y - 70);
  vertex(x + 50, y - 70);
  vertex(x + 35, y - 40);
  vertex(x + 40, y - 40);
  vertex(x + 25, y - 15);
  vertex(x + 30, y - 15);
  vertex(x + 45, y - 45);
  vertex(x + 40, y - 45);
  vertex(x + 55, y - 75);
  vertex(x + 50, y - 75);
  endShape(CLOSE);

  //front right foot
  beginShape();
  vertex(x + 40, y + 115);
  vertex(x + 50, y + 115);
  vertex(x + 52, y + 125);
  vertex(x + 38, y + 125);
  endShape(CLOSE);

  //front left foot
  beginShape();
  vertex(x + 65, y + 115);
  vertex(x + 75, y + 115);
  vertex(x + 77, y + 125);
  vertex(x + 63, y + 125);
  endShape(CLOSE);

  //back right foot
  beginShape();
  vertex(x - 57, y + 115);
  vertex(x - 47, y + 115);
  vertex(x - 45, y + 125);
  vertex(x - 59, y + 125);
  endShape(CLOSE);

  //beck left foot
  beginShape();
  vertex(x - 70, y + 115);
  vertex(x - 60, y + 115);
  vertex(x - 58, y + 125);
  vertex(x - 72, y + 125);
  endShape(CLOSE);
}

function drawKnight(x, y) {
  let armorLight = color(200, 200, 200);
  let armorDark = color(100, 100, 100);

  // // spear
  // fill(100);
  // rect(x + 50, y - 15, 120, 3); // Lance shaft forward
  // fill(100);
  // triangle(x + 170, y - 16, x + 170, y - 11, x + 290, y - 14); // Lance tip

  // Helmet facing forward with plume
  fill(armorLight);
  rect(x + 10, y - 60, 30, 40, 5); // Helmet body
  fill(255, 0, 0); // Red plume
  beginShape(); // Plume on top of helmet
  vertex(x + 20, y - 60);
  vertex(x + 25, y - 100);
  vertex(x + 30, y - 60);
  endShape(CLOSE);
  fill(armorDark);
  rect(x + 20, y - 45, 15, 5); // Front visor slit

  // Torso armor rotated slightly forward
  fill(armorLight);
  beginShape(); // Chest armor
  vertex(x, y - 20);
  vertex(x + 40, y - 20);
  fill(armorDark);
  vertex(x + 35, y + 41);
  vertex(x + 5, y + 45);
  endShape(CLOSE);

  // Arms and lance positioned forward
  fill(armorLight);
  rect(x + 40, y - 25, 10, 20); // Right upper arm holding lance

  // Left arm with shield closer to chest
  fill(armorLight);
  rect(x - 5, y - 25, 10, 20); // Left upper arm
  fill(armorDark);
  rect(x - 20, y - 5, 15, 5); // Left forearm with shield
  fill(120, 120, 120); // Darker for shield
  ellipse(x - 28, y - 10, 40, 100); // Shield

  // Legs bent at the knees, positioned as if sitting in a saddle
  fill(armorDark);
  rect(x + 5, y + 45, 8, 25); // Left thigh
  fill(armorLight);
  rect(x + 5, y + 70, 8, 25); // Left lower leg (bent)

  // Boots with shading
  fill(50);
  rect(x + 3, y + 90, 14, 5); // Left boot

  beginShape();
  vertex(x, y);
  endShape(CLOSE);
}

function updateForceMeters() {
  forceMeter1 = (sin(frameCount * 0.1) + 1) * 50;
  if (player1Force > 0 && player2Force === 0) {
    forceMeter2 = (sin(frameCount * 0.1 + PI) + 1) * 50;
  }
}

function displayForceMeter() {
  textSize(24);
  fill(0);
  textAlign(CENTER, CENTER);

  if (player1Force === 0) {
    text("Player 1: Press 'A' to select force", width / 4, height - 100);
    fill(200, 0, 0);
    rect(width / 4 - 50, height - 150, forceMeter1, 20);
  } else if (player2Force === 0 && player1Force > 0) {
    text("Player 2: Press 'L' to select force", (3 * width) / 4, height - 100);
    fill(200, 0, 0);
    rect((3 * width) / 4 - 50, height - 150, forceMeter2, 20);
  }
}

function animateJoust() {
  joustProgress += 5;
  player1Position += player1Force / 20;
  player2Position += player2Force / 20;

  if (player1Position >= width - player2Position) {
    isJousting = false;
    resolveCollision();
  }
}

function resolveCollision() {
  if (player1Force > player2Force) {
    player2Health = max(0, player2Health - (player1Force - player2Force));
  } else {
    player1Health = max(0, player1Health - (player2Force - player1Force));
  }
}

function keyPressed() {
  if (!selected) {
    if ((key === "A" || key === "a") && player1Force === 0) {
      player1Force = forceMeter1 * 2;
    } else if (
      (key === "L" || key === "l") &&
      player1Force > 0 &&
      player2Force === 0
    ) {
      player2Force = forceMeter2 * 2;
      checkSelection();
    }
  }
}

function checkSelection() {
  if (player1Force > 0 && player2Force > 0) {
    selected = true;
    isJousting = true;
  }
}

function animateJoust() {
  let joustSpeed = 0.005 + 0.0001 * Math.abs(player1Force - player2Force);
  joustProgress += joustSpeed;

  if (joustProgress >= 1.0) {
    isJousting = false;
    determineWinner();
  }
}

function determineWinner() {
  if (player1Force > player2Force) {
    player2Health = max(0, player2Health - 50);
    winner = "Player 1 wins the Round!";
  } else if (player2Force > player1Force) {
    player1Health = max(0, player1Health - 50);
    winner = "Player 2 wins the Round!";
  } else {
    winner = "It's a tie!";
  }

  isJousting = false;
  winnerDisplayStartTime = millis(); // Record the time the winner is displayed
}

function resetForNextRound() {
  currentRound += 1;
  selected = false;
  joustProgress = 0;
  player1Force = 0;
  player2Force = 0;

  // Clear the winner message
  winner = null;
}

function determineRoundWinner() {
  if (player1Health === 0) {
    gamewinner = "Player 2 wins the game!";
  } else if (player2Health === 0) {
    gamewinner = "Player 1 wins the game!";
  }

  if (!gameWinner) {
    // Reset for the next round after a short delay
    setTimeout(nextRound, 3000);
  }
}

function displayGameWinner() {
  textSize(48);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(gameWinner, width / 2, height / 2);
}

function displayStats() {
  textSize(16);
  fill(0);

  // Draw Player 1 stats aligned to the left
  textAlign(LEFT);
  text("Player 1 Health: " + player1Health, 20, 20);

  // Draw Player 2 stats aligned to the right
  textAlign(RIGHT);
  text("Player 2 Health: " + player2Health, width - 20, 20);
}

function handleRoundTransition() {
  if (winner && millis() - winnerDisplayStartTime > 3000) {
    if (player1Health > 0 && player2Health > 0) {
      resetForNextRound();
    } else {
      determineGameWinner();
    }
  }
}
