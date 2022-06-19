<template>
    <div class="container m-auto text-white">
        
        <div v-for="{id, winningNumbers} in currentGame" 
                    :key="id"
                    class="container m-auto m-1 p-2">
                     Numbers Called: {{winningNumbers.sort((a,b) => a-b > 1 ? 1 :-1)}}
        </div>
        <div v-for="game in currentGame"
            :key="game.id">
            
        
            <div v-if="game.gameComplete === false">
                <button @click="callNumber(game.id, game.winningNumbers)"
                            class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl "
                    >
                        Call New Number
                </button>
                <button @click="endGame(game.id)"
                        class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl "
                >
                    End Game
                </button>
            </div>

            <div v-else>
                <button @click="newGame()"
                        class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                >
                    Create New Game
                </button>
            </div>

            <div class="container">
                Players called Bingo:
                <div v-for="bingo in userBingos"
                    :key="bingo.id">
                    <div>
                        {{bingo.relayHandle}}
                        <button @click="getMetaData(bingo.edition)"
                            class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                            Verify
                        </button>
                        <button @click="deleteBingoList(bingo.id)"
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

            <!-- <div class="containter">
                <button @click="deleteBingoList()"
                    class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    Delete List
                </button> 
            </div> -->

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
</template>

<style>
    #Sponsor, #Background, #Bonus {display:  none;}
</style>

<script>
import {ref} from 'vue'
import { useBingo } from '../services/firebase'

export default {
    setup() {
        const { 
            getCurrentGame, 
            newGame, 
            endGame, 
            setWinner, 
            setWinningNumbers, 
            userBingos,
            deleteBingoList
            
            
            } = useBingo()

        const currentGame = getCurrentGame()

        
        let meta = ref([])
        return { newGame, endGame, setWinner, setWinningNumbers, userBingos, deleteBingoList, currentGame, meta}

    },
    methods: {
        callNumber(id, nums) {
            const newNum = Math.floor(Math.random() * 90) + 1
            if ( nums.includes(newNum) ) {
                alert('duplicate number')
                return
            }
            this.setWinningNumbers(id, newNum)
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
                console.log(set)
                if (setcompare > 0 || sqaure === 'Free Space')
                return 'ring-green-300'

            }catch(err){
                console.log(err)
                return ""
            }
            
        }
        
    }
    
    
}
</script>