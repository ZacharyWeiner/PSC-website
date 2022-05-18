<template>
    <div class="text-white">
        {{currentGame}}
        <div v-for="game in currentGame"
            :key="game.id">
            <!-- {{game.winningNumbers}} -->

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
                <button @click="createNewGame()"
                        class="p-2 m-2 text-white text-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                >
                    Create New Game
                </button>
            </div>

            <div class="container">
                Players called Bingo:
                <div v-for="bingo in usersBingo"
                    :key="bingo.id">
                    <div>
                        {{bingo.relayHandle}}
                        <button @click="markBingo()"
                            class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                            Validate
                        </button>
                        <button @click="markBingo(game.id, bingo.relayHandle, bingo.ownerAddress, bingo.cardLocation)"
                            class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                            Confirm Bingo
                        </button>
                    </div>
                </div>
            </div>

            <div class="containter">
                <button @click="deleteBingoList()"
                    class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    Delete List
                </button>
            </div>


        </div>
    </div>
</template>

<script>
// import {ref} from 'vue'
import { useBingo } from '../services/firebase'

export default {
    setup() {
        const { 
            currentGame, 
            newGame, 
            endGame, 
            setWinner, 
            setWinningNumbers, 
            usersBingo,
            deleteBingoList
            
            } = useBingo()


        return { currentGame, newGame, endGame, setWinner, setWinningNumbers, usersBingo, deleteBingoList}

    },
    methods: {
        createNewGame() {
            this.newGame()
        },
        callNumber(id, nums) {
            const newNum = Math.floor(Math.random() * 90) + 1
            if ( nums.includes(newNum) ) {
                alert('duplicate number')
                return
            }
            this.setWinningNumbers(id, newNum)
        },
        endCurrentGame(id) {
            this.endGame(id)
        },
        markBingo(id, _handle, _owner, _loc) {
            // console.log(id,bingo)
            this.setWinner(id, _handle, _owner, _loc)
            console.log('winner!')
        }
    }
    
    
}
</script>