<template>
<!-- <button @click="newGame()"
    class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
>
Create New Game
</button> -->
    <div class="container m-auto my-20 text-white">
        <div v-for="game in currentGame"
            :key="game.id">

            <!-- {{game}} -->
            
            
            <div v-if="game.gameComplete">
                <button @click="newGame()"
                        class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                >
                    Create New Game
                </button>
            </div>

            <div v-else>
                <div class="text-left">
                    Game ID: {{game.id}}
                    <br><br>
                    Winner: {{game.winners}}

                </div>    
                
                <div class="my-20">
                    Numbers Called: {{game.winningNumbers}}
                    <!-- {{game.winningNumbers.sort((a,b) => a-b > 1 ? 1 :-1)}} -->
                </div>
                
                <div class="my-10">
                    <button @click="callNumber(game.id, game.winningNumbers)"
                                class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl "
                        >
                            Call New Number
                    </button>
                    <button @click="endCurrentGame(game.id)"
                            class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl "
                    >
                        End Game
                    </button>
                </div>
                

                <div class="container">
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

export default {
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
            const newNum = Math.floor(Math.random() * 90) + 1
            if ( nums.includes(newNum) ) {
                alert('duplicate number')
                return
            }
            this.setWinningNumber(gameId, newNum)
            this.$store.commit("setBingoCurrenGame", gameId)
        },
        async getMetaData(edition) {
            
            const metaData = await  import(`@/assets/metadata/${edition}`)
            
            // .then((module) => {
            //     edition.value = module.default
            // })
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
            
        }
        
    }
    
    
}
</script>