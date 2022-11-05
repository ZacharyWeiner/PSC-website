<template>
 <Menu />
 <div v-if="loading" >loading...</div>
    <div class="bg-gray-100 w-full text-gray-900">
        Store:  {{this.$store.state.bingoCurrenGame}}
        Game: <span v-if="currentGame && currentGame[0]">{{currentGame[0].id}}</span>
        <div> <button @click="startAutoPick"> start auto pick {{counter}}</button></div>
        <div> <button @click="stopAutoPick"> stop autopick</button></div>
        {{isCounter}}
        Prize: {{currentGame[0].prize}}
    </div>
    <div class="container m-auto my-20 text-white">
        <div v-for="game in currentGame"
            :key="game.id">
            <div v-if="game.gameComplete">
                <div> 
                    <button @click="startGame"

                            class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                    >
                        Create New Game
                    </button>
                </div>
                <div> 
                    <button @click="newGameSession(currentGame)"

                            class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                    >
                        Create New Game Session
                    </button>
                </div>
            </div>

            <div v-else>

                <div class="w-full">
                      <div class="bg-white">
                        <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span class="block">Last Number Pulled:</span>
                            <span v-if="currentGame && currentGame[0].winningNumbers && currentGame[0].winningNumbers.length > 0" class="block">{{currentGame[0].winningNumbers[currentGame[0].winningNumbers.length -1]}}</span>
                        </h2>
                        <div class="mt-8 max-w-96 justify-center text-indigo-800 font-bold text-xl">
                            <div v-if="currentGame && currentGame[0].winningNumbers && currentGame[0].winningNumbers.length > 0" class="max-w-96 break-all">
                                <!-- <span v-for="number in currentGame[0].winningNumbers.sort((a,b)=> { parseInt(a, 10) - parseInt(b, 10) ?  1 : -1})" :key="number" class='px-1 '>{{number}} </span> -->
                                {{winningNumbers}}
                            </div>
                        </div>
                        <div class="mt-8 flex justify-center">
                            <div class="inline-flex rounded-md shadow">
                                <button @click="callNumber(game.id, game.winningNumbers)"
                                            class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Roll Number
                                </button>
                            
                            </div>
                            <div class="ml-3 inline-flex">
                                <button @click="endCurrentGame(game.id)"
                                    class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                >
                                    End Game
                                </button>
                            </div>
                        </div>
                        <div v-if="!game.prize.length" class="col-span-3 sm:col-span-2 mt-5">
                            <label for="bingo-prize" class="block text-sm font-medium text-gray-700"> Bingo Prize:</label>
                            <div class="mt-1 ">
                                <input v-model="bingoPrize" type="text" name="bingo-prize" id="bingo-prize" 
                                    class=" h-12 pl-2 bg-gray-50 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-1/2 m-auto text-black rounded-none rounded-r-md sm:text-sm border-gray-300" />
                                <button @click="submitPrize(game.id)"
                                    class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </div> 
                        </div>
                        <div class="text-gray-900 text-lg container break-normal">
                           Winners: 
                            <div v-for="winner in game.winners" :key="winner.id">
                                {{winner.winner.relayHandle}}
                            </div>
                        </div> 
                         <div class="container bg-gray-600 w-full p-4 rounded">
                            Players called Bingo:
                            <div v-for="bingo in playerBingos"
                                :key="bingo.id"
                                >
                                <div>
                                    {{bingo.relayHandle}} - {{bingo.edition}} - {{bingo.gameId}}
                                    <button @click="getMetaData(bingo.edition)"
                                        class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                        Verify
                                    </button>
                                    <button @click="deleteUserBingo(bingo.id)"
                                        class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                        Clear
                                    </button>
                                    <button @click="setWinner(game.id, bingo.relayHandle, bingo.ownerAddress, bingo.cardLocation, bingo.edition, bingo.txid)"
                                        class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                        Confirm Bingo
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </div> 
                   
                </div>
                


                <div class="container">
                    <div class="flex grid grid-cols-5 bg-indigo-500 ">
                        <div v-for="letter in ['B','I','N','G','O'] "
                                :key="letter"
                                class="h-10 m-5 text-2xl font-bold">
                                {{letter}}
                        </div>
                    </div>
                    <div class="grid grid-rows-5 grid-flow-col ">
                        
                        <div v-for="attr in meta.attributes" 
                            :key="attr"
                            :id="attr.trait_type"
                            class="ring h-28 p-10"
                            :class="compareSquare(attr.value, game.winningNumbers)"
                            >
                            {{attr.value}}   
                        </div> 
                    
                    </div>
                </div>

            </div>



        </div>
    </div>
</template>

<style>
    #Sponsor, #Background, #Bonus {display:  none;}
</style>

<script>
import { ref } from 'vue'
import { useBingo } from '../services/firebase'
import { useStore } from 'vuex'
import Menu from "./../components/Menu.vue"
export default {
    components:{ Menu 
    },
    setup() {
        const loading = ref(false);
        const store = useStore()
        let timerInterval = null;
        const { 
            getCurrentGame, 
            getCurrentGameBingos,
            newGame, 
            endGame, 
            setWinner, 
            setWinningNumber,
            deleteUserBingo,
            setGamePrize,
            
            } = useBingo()
        console.log(store.state.bingoCurrenGame)
        const currentGame = getCurrentGame()
        const playerBingos = getCurrentGameBingos(store.state.bingoCurrenGame)
        let meta = ref([])
        const gameSession = ref(0)
        const showModal = false;
        const counter = ref(0);
        const isCounter = ref(false)
        const bingoPrize = ref('')
        return { loading, newGame, endGame, setWinner, setWinningNumber, deleteUserBingo, getCurrentGameBingos, getCurrentGame, setGamePrize, currentGame, playerBingos, meta, counter, timerInterval, gameSession, showModal, isCounter, bingoPrize}
    },
    methods: {
        startGame(){
            this.loading = true;
            this.newGame(this.currentGame[0].session)
            //this.startAutoPick();
        },
        endCurrentGame(gameId) {
            this.clearAllBingos()
            this.endGame(gameId)
            this.$store.commit("setBingoCurrenGame", 0)
            this.stopAutoPick();
        },
        callNumber(gameId, nums) {

            if (this.playerBingos.length) {
                this.stopAutoPick()
                return
            }
            this.loading = true;
            const newNum = this.getRandom(nums)
            if ( nums.includes(newNum) ) {
                alert('duplicate number')
                return
            }
            this.setWinningNumber(gameId, newNum)
            this.$store.commit("setBingoCurrenGame", gameId)
            console.log("saved new number for game", gameId)
            this.playerBingos = this.getCurrentGameBingos(gameId);
            console.log(this.playerBingos)  
            this.loading = false;
        },
        getRandom(nums){
            let dup = false; 
            let newNum = Math.floor(Math.random() * 75) + 1
            if(nums.includes(newNum)){dup = true}
            while(dup){
                dup = false;
                newNum = Math.floor(Math.random() * 75) + 1
                if(nums.includes(newNum)){dup = true}
            }
            return newNum;
        },
        async getMetaData(edition) {
            const metaData = await  import(`@/assets/metadata/${edition}`)
            this.meta = metaData
            console.log('here', metaData)
        },
        compareSquare(sqaure, winSet) {
            try{
                const set = winSet.filter(w => w.toString() === sqaure)
                const setcompare = set.length
                // console.log(set)
                if (setcompare > 0 || sqaure === 'Free Space')
                return 'bg-green-300 text-black font-bold'
            }catch(err){
                console.log(err)
                return ""
            }
            
        },
        clearAllBingos() {
            if(this.playerBingos.length) {
                console.log(this.playerBingos)
                this.playerBingos.forEach( bingo => {
                    this.deleteUserBingo(bingo.id)
                });
            }
        },
        startAutoPick(){
            // console.log("starting the autopick", gId, numbs.winningNumbers);
            this.isCounter = true
            this.timerInterval = setInterval(() => 
            {
                 let gId = this.currentGame[0].id;
                let numbs = []
                console.log("winning Numbers", this.currentGame[0].winningNumbers)
                if(this.currentGame[0].winningNumbers){
                    numbs = this.currentGame[0].winningNumbers;
                }
                console.log("calling new number ", gId, numbs);
                this.counter = this.counter + 1;
                this.callNumber(gId, numbs)
            }, 20000)
        },
        stopAutoPick(){
            this.isCounter = false
            clearInterval(this.timerInterval);
        },
        newGameSession(currentGame) {
            console.log(currentGame[0].session);            
            if(currentGame[0].session){
                let confirmSession = confirm("The current session is " + currentGame[0].session + ", would you like to create a new session?")
                if (confirmSession) {
                    this.session = ++currentGame[0].session
                    alert("Session " + this.session + " has been created, Have Fun!")
                    this.newGame(this.session)
                }
            }else{
                this.getCurrentGame()
                console.log("starting new game session should be  ", this.currentGame)
                this.newGame(1)
                this.getCurrentGame()
                console.log(this.currentGame)
            }
        },
        callBonus() {
            let bonus = Math.floor(Math.random() * 75) + 1

            return bonus
        },
        submitPrize(id) {
            this.setGamePrize(id, this.bingoPrize)
            console.log(this.bingoPrize)
            this.bingoPrize = ''
        },
    },
    computed:{
            winningNumbers(){
                if(this.currentGame[0].winningNumbers.length > 0){
                    let str = this.currentGame[0].winningNumbers.toString()
                    return str.replace(/,/g, ' ')
                }
                return [];
            },
            calledBingo(){
                console.log("Checking Called Bingo", this.playerBingos)
                if(this.playerBingos?.length > 0 ){
                    return this.playerBingos;
                }
                return [];
            },
        
            
    }
}
</script>