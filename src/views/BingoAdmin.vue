<template>
 <Menu />
    <div class="bg-gray-100 w-full text-gray-900">
        Game: <span v-if="currentGame && currentGame[0]">{{currentGame[0].id}}</span>
    </div>
    <div class="container m-auto my-20 text-white">
        <div v-for="game in currentGame"
            :key="game.id">
            <div v-if="game.gameComplete">
                <button @click="newGame()"
                        class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                >
                    Create New Game
                </button>
            </div>

            <div v-else>
                <div class="w-full">
                      <div class="bg-white">
                        <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span class="block">Last Number Pulled:</span>
                            <span v-if="currentGame && currentGame[0].winningNumbers && currentGame[0].winningNumbers.length > 1" class="block">{{currentGame[0].winningNumbers[currentGame[0].winningNumbers.length -1]}}</span>
                        </h2>
                        <div class="mt-8 max-w-96 justify-center text-indigo-800 font-bold text-xl">
                            <div v-if="currentGame && currentGame[0].winningNumbers && currentGame[0].winningNumbers.length > 1" class="max-w-96 break-all">
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
                        </div>
                        <div class="text-gray-900 text-lg container break-normal">
                            Winner: {{game.winners.toString()}}
                        </div> 
                         <div class="container bg-gray-600 w-full p-4 rounded">
                            Players called Bingo:
                            <div v-for="bingo in playerBingos"
                                :key="bingo.id"
                                >
                                <div>
                                    {{bingo.relayHandle}} - {{bingo.edition}}
                                    <button @click="getMetaData(bingo.edition)"
                                        class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                        Verify
                                    </button>
                                    <button @click="deleteUserBingo(bingo.id)"
                                        class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                        Clear
                                    </button>
                                    <button @click="setWinner(game.id, bingo.relayHandle, bingo.ownerAddress, bingo.cardLocation)"
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
    components:{ Menu },
    setup() {

        const store = useStore()

        const { 
            getCurrentGame, 
            getCurrentGameBingos,
            newGame, 
            endGame, 
            setWinner, 
            setWinningNumber,
            deleteUserBingo
            
            
            } = useBingo()

        console.log(store.state.bingoCurrenGame)

        const currentGame = getCurrentGame()
        
        let playerBingos = ref([])
        playerBingos = getCurrentGameBingos(store.state.bingoCurrenGame)

        
        let meta = ref([])
        return { newGame, endGame, setWinner, setWinningNumber, deleteUserBingo, getCurrentGameBingos, playerBingos, currentGame, meta}

    },
    methods: {
        endCurrentGame(gameId) {
            this.endGame(gameId)
            this.$store.commit("setBingoCurrenGame", 0)
        },
        callNumber(gameId, nums) {
            const newNum = this.getRandom(nums)
            if ( nums.includes(newNum) ) {
                alert('duplicate number')
                return
            }
            this.setWinningNumber(gameId, newNum)
            this.$store.commit("setBingoCurrenGame", gameId)
        },
        getRandom(nums){
            let dup = false; 
            let newNum = Math.floor(Math.random() * 90) + 1
            if(nums.includes(newNum)){dup = true}
            while(dup){
                dup = false;
                newNum = Math.floor(Math.random() * 90) + 1
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
    }, 
    computed:{
            winningNumbers(){
                if(this.currentGame[0].winningNumbers.length > 0){
                    let str = this.currentGame[0].winningNumbers.toString()
                    return str.replace(/,/g, ' ')
                }
                return [];
            }
        }
}
</script>