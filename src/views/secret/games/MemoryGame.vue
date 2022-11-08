<template>
    <Menu />
   <div id="app">
  <div class="info text-white">
    <div><span class="label">Time:</span><span class="value">{{ time }} </span></div>
    <div><span class="label">Turns:</span><span class="value">{{ turns }} </span></div>
    <div><span class="label">Score:</span><span class="value">{{ score }} </span></div>
    <div><span class="label">Trys Remaining:</span><span class="value">{{ 10 - wrongMatches }} </span></div>
  </div>
  <div class="cards text-white max-w-xl mx-auto">
    <div class="card" v-for="card, index in cards" :key="card.index" :class="{ flipped: card.flipped, found: card.found }" @click="flipCard(card.index)">
      <div class="back"></div>
      <div class="text-white">{{index}}</div>
      <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
    </div>
  </div>
  <div class="mx-auto">
    <button class="p-2 m-2 bg-indigo-500 rounded-xl" @click="mute"> Mute </button>   
  </div>
  <div class="text-white">
    <div class="text-md font-bold">How To Play</div>
    <div class="text-left max-w-lg mx-auto">
        <div class="text-md "><span class="font-bold">1.</span> Click a card to flip it & see the image underneath.</div>
        <div class="text-md "><span class="font-bold">2.</span> Click a second card to flip it.</div>
        <div class="text-md "><span class="font-bold">3.</span> If the images match you earn points, and the cards remain face up.</div>
        <div class="text-md "><span class="font-bold">4.</span> If the images do not match both you will lose 1 try and the cards will flip so the backside is facing up. </div>
        <div class="text-md "><span class="font-bold">5.</span> You have 10 trys. You can play until you fail to match a card 10 times.  Matches do not count against your Try count.</div>
        <div class="text-md "><span class="font-bold">6.</span> Match all the images, and the cards will be shuffled, but your scre will continue to increase. </div>
        <div class="text-md "><span class="font-bold">7.</span> The game is timed. Your score will be reduced by some factor of the time it took to play </div>
        <div class="text-md "><span class="font-bold">8.</span> Leaderbard auto-cliams $POO weekly.  </div>
    </div>
  </div>
  <div class="w-auto mx-auto py-8">
        <span
        class="text-xl md:text-3xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
        >
        High Scores
        </span>
    </div>   
    <!-- <div class='text-white'> {{scoresForGame}} </div>  -->
    <div class='text-white grid grid-cols-7 max-w-xs mx-auto bg-gray-900 rounded-xl p-2 m-2 text-left'  v-for="(score, index) in sortedScores" :key="score.id">
        <div class="col-span-1">{{index + 1}}.</div>
        <div class="col-span-3 text-green-400 font-black text-sm">{{score.score}}</div>
        <div class="col-span-3 text-lg text-gray-100 font-black">{{score.handle}}</div> 
    </div>
  <div class="splash" v-if="showSplash">
    <div class="overlay"></div>
    <div class="content">
      <div class="title text-white">Game Over!</div>
      <div class="score text-white">Your Score: {{ score }}</div>
      <button class="newGame" @click="resetGame()">New game</button>
    </div>
  </div>
</div>
<audio id="soundtrack" class="hidden">
            <source src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/File+A+2-17_331+-+8+Bit+(Full).mp3" type="audio/mp3" />
        </audio>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { useGameScores } from "./../../../services/firebase.js"
import moment from "moment"
import Menu from "./../../../components/MenuComponent2.vue";
let CardTypes = [
	{ name: "CornGif", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns+gif+1+.gif" },
	{ name: "POO", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/CartoonPoopToken.png" },
	{ name: "MetaGop", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/MetaGop56.png" },
	{ name: "Quokka", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/wokkaqokkas1628.jpeg" },
	{ name: "Bingo", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/BingoCard.png" },
	{ name: "Slavette", image: "https://slavettes-layers.s3.amazonaws.com/pewnicorns/slavette.png" },
	//{ name: "jade", image: "http://jade-lang.com/style/jade-logo-header.svg" },
];



export default {
    components: {Menu},
    setup () {
        let cards = ref([]);
        let {getHighScores} = useGameScores();
        let {scoresForGame} = getHighScores("Memory");

        const state = reactive({
            showSplash: false,
            started: false,
            startTime: 0,
            turns: 0,
            flipBackTimer: null,
            timer: null,
            time: "--:--",
            score: 0,
            indexer: 0,
            wrongMatches: 0,
            playSong: true,
        })
        
    
        return {
            ...toRefs(state),
            cards,
            scoresForGame
        }
    },
    mounted(){
        this.resetGame()
    },
    methods:{
        playGame(){
           
        },
        shuffle(array) {
           let response =  array.sort(() => Math.random() - 0.5);
           return response.slice();
        },
        shuffleCards(){
            let cards = []
            for(let x =1; x < 3; x++){
                for(let i = 0; i < CardTypes.length; i++){
                    cards.push({ name: CardTypes[i].name, image: CardTypes[i].image, index: i * x },)
                }
            }
            console.log("Cards before shuffle", cards)
            return this.shuffle(cards);
        },
        resetGame() {
			this.showSplash = false;
			let _cards = this.shuffleCards();
            console.log("Cards After Shuffle:", _cards)
			this.turns = 0;
			this.score = 0;
			this.started = false;
			this.startTime = 0;
            this.wrongMatches = 0;
			
			let cardsLength = _cards.length;
            for(let i = 0; i < cardsLength; i ++){
                let card = _cards[i];
				card.flipped = false;
				card.found = false;
                card.index = i;
            }
			
			this.cards = _cards;
            console.log(this.cards)
		},
        moveLevel(){
            this.showSplash = false;
			let _cards = this.shuffleCards();
            console.log("Cards After Shuffle:", _cards)
			
			let cardsLength = _cards.length;
            for(let i = 0; i < cardsLength; i ++){
                let card = _cards[i];
				card.flipped = false;
				card.found = false;
                card.index = i;
            }
			
			this.cards = _cards;
            console.log(this.cards)

        },
		flippedCards() {
			return this.cards.filter(card => card.flipped);
		},
		
		sameFlippedCard() {
			let flippedCards = this.flippedCards();
            console.log({flippedCards})
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name)
					return true;
			}
		},
		
		setCardFounds() {
			// eslint-disable-next-line no-undef
			this.cards.forEach((card) => {
				if (card.flipped)
					card.found = true;
			});
		},
		
		checkAllFound() {
			let foundCards = this.cards.filter(card => card.found);
            console.log({foundCards})
			if (foundCards.length == this.cards.length)
				return true;
		},
		
		startGame() {
            this.playAudio();
			this.started = true;
			this.startTime = moment();
			
			this.timer = setInterval(() => {
				this.time = moment(moment().diff(this.startTime)).format("mm:ss");
			}, 1000);
		},
		
		finishGame() {
			this.started = false;
			clearInterval(this.timer);
			let score = this.score - ((moment().diff(this.startTime, 'seconds') - CardTypes.length * 5) * 3 - (this.turns - CardTypes.length) * 5);
			this.score = Math.max(score, 0);
            this.saveGameScore(this.score, this.$store.state.relayx_handle, this.$store.state.user_address)
			this.showSplash = true;
		},
		
		flipCard(index) {
            console.log("Flipping card:" , index)
            let card = this.cards[index];
			if (card.found || card.flipped) return;
			if (!this.started) {
				this.startGame();
			}
			
			let flipCount = this.flippedCards().length;
            console.log("FlipCount:", flipCount)
			if (flipCount == 0) {
				card.flipped = !card.flipped;
                console.log("Flipped Card:", card)
                console.log("Cards:", this.cards)
			}
			else if (flipCount == 1) {
                console.log("flipcount === 1");
				card.flipped = !card.flipped;
				this.turns += 1;

				if (this.sameFlippedCard()) {
					// Match!
                    this.score = this.score + 100;
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.setCardFounds();
						this.clearFlips();
                        let reshuffleRequired = this.checkAllFound()
						if (reshuffleRequired) {
							this.moveLevel();
						}	

					}, 200);
				}
				else {
					// Wrong match
                    this.wrongMatches = this.wrongMatches + 1; 
                    console.log("wrong Matches:", this.wrongMatches);
                    if(this.wrongMatches <=10){
                        this.flipBackTimer = setTimeout( ()=> {
                            this.clearFlipBackTimer();
                            this.clearFlips();
                        }, 1000);
                    } else{
                        this.finishGame();
                    }
					
				}
			}
		},
		
		clearFlips() {
			this.cards.map(card => card.flipped = false);
		},
		
		saveGameScore(score, handle, address){
            console.log("adding gamescore",  score, handle, address);
            let { addGameScore } = useGameScores();
            addGameScore("Memory", score, handle, address);
        },

		clearFlipBackTimer() {
			clearTimeout(this.flipBackTimer);
			this.flipBackTimer = null;
		},
        playAudio(){
            if(this.playSong){
                let audio = document.getElementById('soundtrack')
                audio.play();
                document.getElementById('soundtrack').addEventListener('ended', function(){
                    this.play();
                })
            }
        },
        mute(){
            this.playSong = !this.playSong;
            let audio = document.getElementById('soundtrack')
            if(this.playSong){
                audio.play();
            } else {
                audio.pause();
            }
            
        },
	},
    computed:{
        sortedScores(){
            let response = new Object(this.scoresForGame)
            response.sort((a, b) => {
                let r = -1;
                console.log(a.score,b.score);
               if(b.score > a.score){r = 1}
               return r;
            })
            console.log(response.map((a) => a.score))
            return response.slice(0,10)
        }
    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900|Dosis:300,400,600,700,800|Droid+Sans:400,700|Lato:300,400,700,900|PT+Sans:400,700|Ubuntu:300,400,500,700|Open+Sans:400,300,600,700|Roboto:400,300,500,700,900|Roboto+Condensed:400,300,700|Open+Sans+Condensed:300,700|Work+Sans:400,300,700|Play:400,700|Maven+Pro:400,500,700,900&subset=latin,latin-ext);
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  background-color: #292c33;
  color: White;
  font-size: 16px;
  font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  margin: 0.5em;
}

.info {
  text-align: center;
  padding-bottom: 1em;
  border-bottom: 1px solid #555;
}
.info > div {
  display: inline-block;
  width: 200px;
}
.info > div .label {
  margin-right: 5px;
}
.info > div .value {
  font-weight: bold;
}

.cards .card {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 150px;
  margin: 1em 1em;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
}
.cards .card .front,
.cards .card .back {
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: White;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -moz-transition: -moz-transform 0.6s;
  -o-transition: -o-transform 0.6s;
  -webkit-transition: -webkit-transform 0.6s;
  transition: transform 0.6s;
  -moz-transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.cards .card .back {
  background-image: url("https://slavettes-layers.s3.amazonaws.com/pewnicorns/PewnicornSocialClubCardBack.png");
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 12px;
}
.cards .card .front {
  -moz-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
}
.cards .card.flipped .back, .cards .card.found .back {
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.cards .card.flipped .front, .cards .card.found .front {
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.cards .card.found {
  opacity: 0.3;
}

.splash {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.splash .overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.splash .content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  height: 200px;
  margin: auto;
  text-align: center;
  background-color: rgba(51, 51, 51, 0.9);
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  -webkit-box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
  padding: 1em;
}
.splash .content .title {
  font-size: 1.8em;
  padding: 0.5em;
}
.splash .content .score {
  padding: 0.5em;
}
.splash .content button {
  margin-top: 1em;
  background-color: #444;
  padding: 5px 20px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #555;
  color: White;
  font-size: 1.4em;
}


</style>