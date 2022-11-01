<template>
      <Menu />
      <div v-if="!isLoggedIn">
        <div class="">
            <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">You Must Be Logged In</span>
                    <span class="block">To Play This Game</span>
                </h2>
                
                </div>
            </div>
      </div>
    <div v-if="isLoggedIn" class="container disable-dbl-tap-zoom">
        <div class="grid grid-cols-3 xl:grid-cols-4 disable-dbl-tap-zoom">
            <div class="col-span-3 disable-dbl-tap-zoom">
                <h1>Canvas Tetris</h1>
                <div class="flex w-full disable-dbl-tap-zoom ">
                    <div class="mx-auto" id="canvasTetris" @click="playAudio"></div>
                </div>
                <div class="flex w-full  text-gray-900 disable-dbl-tap-zoom">
                    <div class="flex mx-auto disable-dbl-tap-zoom">
                        <div class="text-7xl m-2 bg-gradient-to-b from-teal-500 via-blue-600 to-purple-500 text-white rounded-xl disable-dbl-tap-zoom  pt-2"> <button @click="gameButtonClick(37)"> ← </button> </div>
                        <div class="text-7xl m-2 bg-gradient-to-b from-teal-500 via-blue-600 to-purple-500  text-white rounded-xl disable-dbl-tap-zoom pt-2 "> <button @click="gameButtonClick(38)"> <RefreshIcon  class="m-3 h-16 w-16 text-white" aria-hidden="true"  /> </button> </div>
                        <div class="text-7xl m-2 bg-gradient-to-b from-teal-500 via-blue-600 to-purple-500  text-white rounded-xl disable-dbl-tap-zoom pt-2"> <button @click="gameButtonClick(40)"> -↓- </button> </div>
                        <div class="text-7xl m-2 bg-gradient-to-b from-teal-500 via-blue-600 to-purple-500  text-white rounded-xl disable-dbl-tap-zoom pt-2"> <button @click="gameButtonClick(39)"> → </button> </div>
                    </div>  
                </div>
                <div class="description text-white disable-dbl-tap-zoom">
                    <div class="disable-dbl-tap-zoom">
                        <div class="font-black text-sm text-gray-100 disable-dbl-tap-zoom">Speed increases every 1000 points</div>
                    </div> 
                    <div class="disable-dbl-tap-zoom">
                        <div class="font-black text-lg text-gray-100 disable-dbl-tap-zoom">Desktop Players</div>
                    </div> 
                    <span class="font-black disable-dbl-tap-zoom">&#8592; &#8593; &#8594; &#8595; on your keyboard to move, P to pause </span>
                    <div class="pt-2">
                        <div class="font-black text-lg text-gray-100">Mobile Players</div>
                        <div class="font-black text-gray-100">Use directional buttons</div>
                    </div> 
                    <br/> Click Game Board to start game
                    <br/>
                    <button class="p-2 m-2 bg-indigo-500 rounded-xl" @click="refresh"> Refresh </button>   
                    <button class="p-2 m-2 bg-indigo-500 rounded-xl" @click="mute"> Mute </button>   
                </div>
            </div>  
            <div class="col-span-3 xl:col-span-1"> 
            <div class="w-auto mx-auto py-8">
                <span
                class="text-xl md:text-3xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
                >
                High Scores
                </span>
            </div>   
            <!-- <div class='text-white'> {{scoresForGame}} </div>  -->
            <div class='text-white grid grid-cols-7 max-w-xs mx-auto bg-gray-900 rounded-xl p-2 m-2 text-left'  v-for="(score, index) in scoresForGame" :key="score.id">
                <div class="col-span-1">{{index + 1}}.</div>
                <div class="col-span-3 text-green-400 font-black text-sm">{{score.score}}</div>
                <div class="col-span-3 text-lg text-gray-100 font-black">{{score.handle}}</div> 
            </div>
        </div>
        </div>
        <img id="pewni" style="max-width:412" class="hidden" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/tetrisbackround.png" />
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import Menu from "./../../../components/MenuComponent2.vue";
import { useGameScores } from "./../../../services/firebase.js";
import { RefreshIcon } from "@heroicons/vue/solid"
export default {

    components: {Menu, RefreshIcon},
    setup () {
        let {allGameScores, getHighScores} = useGameScores();
        let highScores = ref([]);
        let {scoresForGame} = getHighScores("Tetris");
        let currentGame = null;
        console.log(scoresForGame);
        highScores.value = scoresForGame
        console.log("HighScore", highScores)
        var audio = new Audio('https://slavettes-layers.s3.amazonaws.com/pewnicorns/Video+Game.mp3');
        const state = reactive({
            count: 0,
        })
         // path to file
        return {
            ...toRefs(state),
            allGameScores,
            scoresForGame,
            highScores,
            currentGame,
            audio
        }
    },
    mounted(){
      var node = document.getElementById("canvasTetris");
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	  this.canvasTetris(node);
      try{
        // var audio = new Audio('https://slavettes-layers.s3.amazonaws.com/pewnicorns/Video+Game.mp3');
        // audio.play();
      }catch(err){console.error(err)}
      
    },
    methods: {
        canvasTetris(parentNode) {
            var canvas = {
                node: null,
                context: null,
                width: 0,
                height: 0,
                blockSide: 0
            };
            
           

            canvas.drawBackground = function() {
                this.context.fillStyle = "#fff";
                this.context.strokeStyle = "#696969";
                this.context.fillRect(0, 0, this.width, this.height);
                this.context.lineWidth = 8;
                this.context.strokeRect(0, 0, this.width, this.height);
                this.context.lineWidth = 4;
                this.context.beginPath();
                this.context.moveTo(256, 0);
                this.context.lineTo(256, this.height);
                this.context.stroke();
                this.context.closePath();
                this.context.fillStyle = "#000";
                this.context.fillText("SCORE:", 298, 75);
                this.context.fillText(game.score.amount, 330 - game.score.halfWidth, 125);
                this.context.fillText("NEXT:", 308, 220);
                this.context.lineWidth = 2;
                this.context.strokeRect(283, 255, 102, 102);
                this.context.strokeStyle = "#f8f8ff";
            };

            canvas.drawBlock = function(yNum, xNum) {
                var gradient1 = this.context.createLinearGradient(50, 0, 350, 1);
                gradient1.addColorStop(0, 'Purple');
                gradient1.addColorStop(1, 'Black');
                var img1 = document.getElementById("pewni");
                let pattern1= this.context.createPattern(img1,'repeat');
                this.context.fillStyle = pattern1;
                var xCord = xNum * (this.blockSide + 2) + 5;
                var yCord = yNum * (this.blockSide + 2) + 5;
                this.context.strokeRect(xCord, yCord, this.blockSide, this.blockSide);
                this.context.fillRect(xCord, yCord, this.blockSide, this.blockSide);
            };

            canvas.drawBlocks = function() {
                for (var i = 0; i < game.rows; i++) {
                for (var j = 0; j < game.cols; j++) {
                    if (game.blocks[i][j]) {
                    this.drawBlock(i, j);
                    }
                }
                }
            };

            canvas.drawNextBlock = function(yNum, xNum) {
                var xCord = xNum * (this.blockSide + 2) + 285;
                var yCord = yNum * (this.blockSide + 2) + 257;
                this.context.strokeRect(xCord, yCord, this.blockSide, this.blockSide);
                this.context.fillRect(xCord, yCord, this.blockSide, this.blockSide);
            };

            canvas.drawNextBlocks = function() {
                for (var i = 0; i < game.nextSide; i++) {
                for (var j = 0; j < game.nextSide; j++) {
                    if (tetromino.next.tetromino[i][j]) {
                    this.drawNextBlock(i, j);
                    }
                }
                }
            };

            canvas.drawPause = function(gameTextNum) {
                this.context.fillStyle = "#000";
                this.context.strokeStyle = "#fff";

                this.context.fillRect(50, 110, 158, 80);
                this.context.strokeRect(50, 110, 158, 80);
                this.context.strokeRect(53, 113, 152, 74);

                this.context.fillStyle = "#fff";
                this.context.fillText(game.pauseText[gameTextNum].text, 130 - game.pauseText[gameTextNum].halfWidth, 155);

                this.context.strokeStyle = "#000";
            };

            canvas.draw = function() {
                this.drawBackground();
                this.drawBlocks();
                this.drawNextBlocks();
            };

            var tetromino = {};

            tetromino.current = {
                tetromino: null,
                number: 0,
                direction: 0,
                x: 0,
                y: 0
            };

            tetromino.next = {
                tetromino: [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
                ],
                number: 0,
                direction: 0
            };

            tetromino.collection = [
                [ // I
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
                ],
                [ // J
                [
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 1],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 1],
                    [0, 0, 0, 1],
                    [0, 0, 0, 0]
                ]
                ],
                [ // L
                [
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
                ],
                [ // O
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
                ],
                [ // S
                [
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 1],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 1, 1],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
                ],
                [ // T
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 1, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]
                ]
                ],
                [ // Z
                [
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 1],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ],
                [
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 1],
                    [0, 0, 0, 0]
                ]
                ]
            ];

            tetromino.chooseNext = function() {
                var tetLen = this.collection.length;
                var tetNum = Math.floor(Math.random() * tetLen);
                tetNum = (tetNum === tetLen) ? (tetLen - 1) : tetNum;
                var tetDir = Math.floor(Math.random() * 4);
                tetDir = (tetDir === 4) ? 3 : tetDir;

                this.current.tetromino = this.next.tetromino;
                this.current.number = this.next.number;
                this.current.direction = this.next.direction;
                this.current.x = game.xStart;
                this.current.y = game.yStart;

                this.next.tetromino = this.collection[tetNum][tetDir];
                this.next.number = tetNum;
                this.next.direction = tetDir;

                canvas.draw();
            };

            tetromino.move = function(xChanging, yChanging) {
                if (this.checkPaste(xChanging, yChanging)) {
                this.cutTetronimo();
                this.current.x += xChanging;
                this.current.y += yChanging;
                this.pasteTetronimo();
                canvas.draw();
                return true;
                }
                return false;
            };

            tetromino.rotate = function() {
                this.cutTetronimo();
                var oldDirection = this.current.direction;
                this.current.direction = (this.current.direction + 1) % 4;
                this.current.tetromino = this.collection[this.current.number][this.current.direction];
                if (!this.checkPaste(0, 0)) {
                this.current.direction = oldDirection;
                this.current.tetromino = this.collection[this.current.number][this.current.direction];
                }
                this.pasteTetronimo(false);
                canvas.draw();
            };

            tetromino.cutTetronimo = function() {
                for (var i = 0; i < game.nextSide; i++) {
                var yBlock = this.current.y + i;
                if (yBlock >= 0) {
                    for (var j = 0; j < game.nextSide; j++) {
                    if (this.current.tetromino[i][j] !== 0) {
                        game.blocks[yBlock][this.current.x + j] = 0;
                    }
                    }
                }
                }
            };

            tetromino.checkPaste = function(xChanging, yChanging) {
                for (var i = 0; i < game.nextSide; i++) {
                var yBlock = this.current.y + yChanging + i;
                var yTetBlock = yChanging + i;
                for (var j = 0; j < game.nextSide; j++) {
                    if (this.current.tetromino[i][j] !== 0) {
                    var xBlock = this.current.x + xChanging + j;
                    var xTetBlock = xChanging + j;
                    if (xBlock < 0 || xBlock >= game.cols) {
                        return false;
                    }
                    if (yBlock >= game.rows) {
                        return false;
                    }
                    if (yBlock >= 0) {
                        if (game.blocks[yBlock][xBlock]) {
                        if ((xTetBlock >= 0) && (xTetBlock < game.nextSide) && (yTetBlock < game.nextSide)) {
                            if (this.current.tetromino[yTetBlock][xTetBlock] === 0) {
                            return false;
                            } else {
                            if (xChanging === 0 && yChanging === 0) {
                                return false;
                            }
                            }
                        } else {
                            return false;
                        }
                        }
                    }
                    }
                }
                }
                return true;
            };

            tetromino.pasteTetronimo = function() {
                for (var i = 0; i < game.nextSide; i++) {
                var yBlock = this.current.y + i;
                if (yBlock >= 0) {
                    for (var j = 0; j < game.nextSide; j++) {
                    if (this.current.tetromino[i][j] !== 0) {
                        game.blocks[yBlock][this.current.x + j] = this.current.tetromino[i][j];
                    }
                    }
                }
                }
            };
            
            var game = {
                score: {
                amount: 0,
                halfWidth: 0,
                lines: 0
                },
                player:{
                    handle: this.$store.state.relayx_handle,
                    address: this.$store.state.user_address
                },
                speed: 0,
                timer: null,
                paused: false,
                pauseText: [{
                text: "Start!",
                halfWidth: 0
                }, {
                text: "Paused",
                halfWidth: 0
                }, {
                text: "Game over!",
                halfWidth: 0
                }],
                blocks: [],
                rows: 16,
                cols: 10,
                nextSide: 4
            };
            console.log(game);
            this.currentGame = game;
            game.xStart = Math.floor((game.cols - game.nextSide) / 2);
            game.yStart = -game.nextSide;
            game.saveScore = function(score, handle, address){
                console.log("adding gamescore",  score, handle, address);
                let { addGameScore } = useGameScores();
                addGameScore("Tetris", score, handle, address);

            }
            game.setGame = function() {
                parentNode.className += " tetris";

                canvas.node = document.createElement("canvas");
                canvas.node.className = "tetrisCanvas";
                canvas.node.setAttribute("tabindex", "0");
                canvas.node.innerHTML = "Your browser does not support the HTML5 canvas tag";
                parentNode.appendChild(canvas.node);
                canvas.width = 412;
                canvas.height = 408;
                canvas.node.setAttribute("width", canvas.width + "px");
                canvas.node.setAttribute("height", canvas.height + "px");
                canvas.blockSide = 23;
                canvas.context = canvas.node.getContext("2d");
                canvas.context.font = "bold 18px Arial";

                for (var i = 0; i < this.pauseText.length; i++) {
                this.pauseText[i].halfWidth = Math.round(canvas.context.measureText(this.pauseText[i].text).width / 2);
                }
                this.score.halfWidth = Math.round(canvas.context.measureText(0).width / 2);

                for (i = 0; i < this.rows; i++) {
                this.blocks[i] = [];
                for (var j = 0; j < this.cols; j++) {
                    this.blocks[i][j] = 1;
                }
                }

                canvas.drawBackground();
                canvas.drawBlocks();
                canvas.drawNextBlocks();
                canvas.drawPause(0);

                canvas.node.focus();

                canvas.node.addEventListener("click", game.resetGame, false);
            };
            game.resetGame = function() {
                canvas.node.removeEventListener("click", game.resetGame, false);
                canvas.node.addEventListener("keydown", game.keyPress, false);
                canvas.node.addEventListener("focus", game.focus, false);
                canvas.node.addEventListener("blur", game.blur, false);
                game.setScore(0);

                for (var i = 0; i < game.rows; i++) {
                for (var j = 0; j < game.cols; j++) {
                    game.blocks[i][j] = 0;
                }
                }

                tetromino.chooseNext();
                tetromino.chooseNext();

                game.speed = 1000;
                game.timer = setInterval(game.move, game.speed);
            };

            game.move = function() {
                if (!tetromino.move(0, 1)) {
                game.checkScore();
                game.checkGameOver();
                }
            };

            game.checkScore = function() {
                var lines = 0;
                var curLine = tetromino.current.y + game.nextSide - 1;
                if (curLine >= game.rows) curLine = game.rows - 1;

                for (var i = 0; i <= game.nextSide; i++) {
                var filled = true;
                for (var j = 0; j < game.cols; j++) {
                    if (!game.blocks[curLine][j]) {
                    filled = false;
                    break;
                    }
                }
                if (filled) {
                    lines++;
                    this.scoreLine(curLine);
                } else {
                    curLine--;
                    if (curLine < 0) {
                    break;
                    }
                }
                }

                if (lines > 1) {
                this.addScore(100 * lines);
                }
            };

            game.scoreLine = function(line) {
                for (var i = line; i > 0; i--) {
                for (var j = 0; j < game.cols; j++) {
                    game.blocks[i][j] = game.blocks[i - 1][j];
                }
                }
                this.addScore(100);
            };

            game.setScore = function(newScore)  {
                this.score.amount = newScore;
                this.score.halfWidth = Math.round(canvas.context.measureText(newScore).width / 2);
                canvas.draw();
            };

            game.addScore = function(scoreToAdd) {
                var oldScore = this.score.amount;
                var newScore = oldScore + scoreToAdd;
                this.setScore(newScore);
                if (game.speed > 100 && (Math.floor(newScore / 1000) > Math.floor(oldScore / 1000))) {
                    game.speed -= 50;
                    clearInterval(this.timer);
                    game.timer = setInterval(game.move, game.speed);
                
                }else if (game.speed > 10 && (Math.floor(newScore / 1000) > Math.floor(oldScore / 1000))) {
                    game.speed -= 10;
                    clearInterval(this.timer);
                    game.timer = setInterval(game.move, game.speed);
                }
                console.log(game.timer, game.move, game.speed);
            };

            game.checkGameOver = function() {
                for (var j = 0; j < game.cols; j++) {
                if (game.blocks[0][j]) {
                    this.gameOver();
                    this.saveScore(game.score.amount, game.player.handle, game.player.address);
                    return;
                }
                }
                tetromino.chooseNext();
            };

            game.gameOver = function() {
                clearInterval(this.timer);
                canvas.node.removeEventListener("keydown", game.keyPress, false);
                canvas.node.removeEventListener("focus", game.focus, false);
                canvas.node.removeEventListener("blur", game.blur, false);
                game.animateGameOver();
            };

            game.animateGameOver = function() {
                var i = game.rows - 1;
                var j = 0;
                (function() {
                if (i >= 0) {
                    game.blocks[i][j] = 1;
                    canvas.draw();
                    canvas.drawPause(2);
                    if ((j + 1) < game.cols) {
                    j++;
                    } else {
                    j = 0;
                    i--;
                    }
                    //setTimeout(arguments.callee, 20);
                    canvas.node.addEventListener("click", game.resetGame, false);
                } else {
                    canvas.node.addEventListener("click", game.resetGame, false);
                }
                })();
            };

            game.pause = function() {
                if (game.paused) {
                canvas.draw();
                game.timer = setInterval(game.move, game.speed);
                } else {
                canvas.drawPause(1);
                clearInterval(this.timer);
                }
                game.paused = !game.paused;
            };

            // game.focus = function() {
            //     if (game.paused) {
            //     canvas.node.focus();
            //     game.pause();
            //     }
            // };

            // game.blur = function() {
            //     if (!game.paused) {
            //     game.pause();
            //     }
            // };

            game.keyPress = function(e) {
                e.preventDefault()
                if (!game.paused) {
                switch (e.keyCode) {
                    case 37: // Left
                    tetromino.move(-1, 0);
                    break;
                    case 38: // Up
                    tetromino.rotate();
                    break;
                    case 39: // Right
                    tetromino.move(1, 0);
                    break;
                    case 40: // Down
                    tetromino.move(0, 1);
                    game.addScore(1);
                    break;
                    case 80: // P
                    game.pause();
                    break;
                }
                } else {
                if (e.keyCode === 80) {
                    game.pause();
                }
                }
            };

            game.setGame();
        },
        gameButtonClick(_key){
            let event = {keyCode: _key, preventDefault: function(){}}
            this.currentGame.keyPress(event)
        },
        refresh(){
            // var node = document.getElementById("canvasTetris");
            // // eslint-disable-next-line no-mixed-spaces-and-tabs
            // this.canvasTetris(node);
            window.location.reload();
        },
        playAudio(){
            this.audio.play();
        },
        mute(){
            this.audio.pause();
        }
    },
    computed:{
        isLoggedIn(){
            return this.$store.state.relayx_handle !== "";
        }
    }
}
</script>

<style scoped>
*, *:before, *:after {
    -webkit-user-select: none; /* Chrome/Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
}
.disable-dbl-tap-zoom {
  touch-action: manipulation;
}
</style>