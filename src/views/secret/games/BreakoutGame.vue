<template>
    <Menu />
    <div>
        <canvas id="myCanvas" width="420" height="380"></canvas>
    </div>
    <img id="pewni" class="hidden" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/BreakoutBackground.png" />
    <img id="pooOnly" class="hidden" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/pooonly.png" />
    
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../../../components/MenuComponent2.vue";
export default {
    components: { Menu },
    setup () {
        const state = reactive({
            count: 0,
            speed: 0,
            lives: 0,
        })
    
        return {
            ...toRefs(state),
        }
    },
    mounted(){
        this.playGame(0)
    },
    methods:{
        playGame(score){
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');

            var x = canvas.width / 2;
            var y = canvas.height - 30; 

            var dx = 2;
            var dy = -2;
            var ballRadius = 10;
            var paddleHeight = 10;
            var paddleWidth = 75;
            var paddleX = (canvas.width - paddleWidth) / 2;
            var rightPressed = false;
            var leftPressed = false;
            var brickRowCount = 4;
            var brickColumnCount = 6;
            var brickWidth = 50;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;
            var lives = 3;
            var resets = 1;
            var previousCheckpoint = 24;

            var bricks = [];
            for (let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
                };
            }
            }

            document.addEventListener("keydown", keyDownHandler);
            document.addEventListener("keyup", keyUpHandler);

            function keyDownHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = true;
            } else if (e.keyCode === 37) {
                leftPressed = true;
            }
            }

            function keyUpHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = false;
            } else if (e.keyCode === 37) {
                leftPressed = false;
            }
            }

            let drawBricks = () =>  {
            var img = document.getElementById("pewni")
            var pat = ctx.createPattern(img, "no-repeat");
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = pat; //"#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
                }
            }
            }
            
            function drawBall() {
            //     var img2 = document.getElementById("pooOnly")
            // var ballPat = ctx.createPattern(img2, "repeat");
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#d4af37 "//ballPat;
            ctx.fill();
            ctx.closePath(); // ball is drawn
            }

            function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }

            function collisionDetection() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status === 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === previousCheckpoint) {
                        // alert("YOU WIN!");
                        // document.location.reload();
                        if(brickRowCount <10){
                            resets = resets + 1
                            brickRowCount = brickRowCount + 1
                           
                        }
                        
                        previousCheckpoint = previousCheckpoint + (brickRowCount * brickColumnCount)
                        for (let c = 0; c < brickColumnCount; c++) {
                        bricks[c] = [];
                        for (let r = 0; r < brickRowCount; r++) {
                            bricks[c][r] = {
                            x: 0,
                            y: 0,
                            status: 1
                            };
                        }
                        }


                        
                    }
                    }
                }
                }
            }
            }

            function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "0095DD";
            ctx.fillText("Score: " + score, 8, 20);
            }

            function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "0095DD";
            ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
            }

            function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            if (y + dy < ballRadius) { //bouncing off top and bottom of canvas
                dy = -dy
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
                }
            }
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx
            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx; 
            y += dy; 
            requestAnimationFrame(draw);
            }
            document.addEventListener("mousemove", mouseMoveHandler);

            function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
                paddleX = relativeX - paddleWidth / 2;
            }
            }
            draw();
        }
    }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
#myCanvas {
  background: #eee;
  display: block;
  margin: 0 auto;
}

</style>