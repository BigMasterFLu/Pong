            const movable = document.getElementById("moveable");
            const movable2 = document.getElementById("moveable2");
            const ball = document.getElementById("ball");
            const scoreboard = document.getElementById("scoreboard");

            // Initial positions and scores
            let topPosition = window.innerHeight / 2 - 87.5;
            let topPosition2 = window.innerHeight / 2 - 87.5;
            let ballX = window.innerWidth / 2;
            let ballY = window.innerHeight / 2;
            let speedX = 0;
            let speedY = 0;
            let player1Score = 0;
            let player2Score = 0;

            // Define the maximum and minimum limits for paddles
            const maxTop = 0;
            const maxBottom = window.innerHeight - 175;

            // Update the scoreboard
            function updateScoreboard() {
              scoreboard.textContent = `${player1Score} | ${player2Score}`;
            }

            // Function to set a random direction within 45 degrees toward the left or right wall
            function setRandomDirection(isLeft) {
              const angle = (Math.random() * 45 + 20) * (Math.PI / 180); // Convert to radians
              const baseSpeed = 8;
              speedX = baseSpeed * (isLeft ? -1 : 1);
              speedY = baseSpeed * Math.tan(angle);
            }

            // Reset the ball to the center after it misses a paddle
            function resetBall(missedByLeft) {
              ballX = window.innerWidth / 2;
              ballY = window.innerHeight / 2;
              ball.style.left = ballX + "px";
              ball.style.top = ballY + "px";

              // Update scores and scoreboard
              if (missedByLeft) {
                player2Score++;
              } else {
                player1Score++;
              }
              updateScoreboard();

              // Set a random direction after a 2-second delay
              setTimeout(() => {
                setRandomDirection(!missedByLeft); // Set direction toward the scoring player
                moveBall(); // Start moving the ball
              }, 2000);
            }

            // Move the ball continuously
            function moveBall() {
              ballX += speedX;
              ballY += speedY;

              // Update ball's position
              ball.style.left = ballX + "px";
              ball.style.top = ballY + "px";

              // Bounce off the top and bottom edges
              if (ballY <= 0 || ballY >= window.innerHeight - 70) speedY *= -1;

              // Check for collision with left paddle
              if (ballX <= 30) {
                if (ballY >= topPosition2 && ballY <= topPosition2 + 175) {
                  speedX *= -1.1; // Bounce off left paddle
                  ballX = 30; // Adjust position to prevent "sticking" to paddle
                } else {
                  resetBall(true); // Ball missed left paddle
                  return;
                }
              }

              // Check for collision with right paddle
              if (ballX >= window.innerWidth - 40) {
                if (ballY >= topPosition && ballY <= topPosition + 175) {
                  speedX *= -1.1; // Bounce off right paddle
                  ballX = window.innerWidth - 40; // Adjust position to prevent "sticking" to paddle
                } else {
                  resetBall(false); // Ball missed right paddle
                  return;
                }
              }

              // Continue the animation
              requestAnimationFrame(moveBall);
            }

            // Start ball movement 2 seconds after the page loads
            setTimeout(() => {
              setRandomDirection(Math.random() < 0.5); // Initial random direction
              moveBall(); // Start moving the ball
            }, 2000);

            // Movement intervals for both paddles
            let intervals = {
              ArrowUp: null,
              ArrowDown: null,
              w: null,
              s: null
            };

            // Event listener for keydown event to control paddles
            document.addEventListener("keydown", function (event) {
              // Right paddle (ArrowUp/ArrowDown)
              if (event.key === "ArrowUp" && !intervals["ArrowUp"]) {
                intervals["ArrowUp"] = setInterval(() => {
                  if (topPosition > maxTop) {
                    topPosition -= 25; // Move right paddle up
                    movable.style.top = topPosition + "px";
                  }
                }, 50);
              } else if (event.key === "ArrowDown" && !intervals["ArrowDown"]) {
                intervals["ArrowDown"] = setInterval(() => {
                  if (topPosition < maxBottom) {
                    topPosition += 25; // Move right paddle down
                    movable.style.top = topPosition + "px";
                  }
                }, 50);
              }

              // Left paddle (W/S)
              if ((event.key === "w" || event.key === "W") && !intervals["w"]) {
                intervals["w"] = setInterval(() => {
                  if (topPosition2 > maxTop) {
                    topPosition2 -= 25; // Move left paddle up
                    movable2.style.top = topPosition2 + "px";
                  }
                }, 50);
              } else if ((event.key === "s" || event.key === "S") && !intervals["s"]) {
                intervals["s"] = setInterval(() => {
                  if (topPosition2 < maxBottom) {
                    topPosition2 += 25; // Move left paddle down
                    movable2.style.top = topPosition2 + "px";
                  }
                }, 50);
              }
            });

            // Event listener for keyup event to stop movement
            document.addEventListener("keyup", function (event) {
              if (event.key === "ArrowUp" && intervals["ArrowUp"]) {
                clearInterval(intervals["ArrowUp"]);
                intervals["ArrowUp"] = null;
              } else if (event.key === "ArrowDown" && intervals["ArrowDown"]) {
                clearInterval(intervals["ArrowDown"]);
                intervals["ArrowDown"] = null;
              }

              if (event.key === "w" || (event.key === "W" && intervals["w"])) {
                clearInterval(intervals["w"]);
                intervals["w"] = null;
              } else if (event.key === "s" || (event.key === "S" && intervals["s"])) {
                clearInterval(intervals["s"]);
                intervals["s"] = null;
              }
            });