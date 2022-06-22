<template>
    <div class="text-white">
            <div class="text-right m-2">
                <button class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                        @click="goBack()">
                        Back to Bingo List
                </button>     
            </div>
               

        <div v-for="game in currentGame" 
                    :key="game.id"
                    class="container m-auto m-1 p-2">

            <div v-if="!game.gameComplete && (game.id === store.state.bingoCurrenGame)">
                <div class="text-left mb-5">
                    
                    Name: {{meta.name}} <br>
                    Description: {{meta.description}} <br>
                    Edition: {{meta.edition}} <br>
                    Numbers Called: {{game.winningNumbers.sort((a,b) => a-b > 1 ? 1 :-1)}}
                    
                    <img class="h-80" :src="'https://berry.relayx.com/' + store.state.selectedBingoCard.berry.txid " alt="">
                </div>
                <div class="text-right">
                    Players who called Bingo:
                    <div v-for="player in playerBingos"
                            :key="player.id"
                            :class="`${ (store.state.relayx_handle === player.relayHandle) ? 'text-bold text-green-500' : ''}`">
                        {{player.relayHandle}}
                    </div>
                </div>
                <div class="mb-10">
                    <button class="p-4 m-4 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                            @click="userCallBingo(bingo, meta.edition, game.id)"
                            >
                            BINGO!
                            
                    </button> 
                </div>    
                
                <div class="flex grid grid-cols-5 ring bg-indigo-500 ">
                    <div v-for="letter in ['B','I','N','G','O'] "
                            :key="letter"
                            class="h-10 m-5 text-2xl font-bold">
                            {{letter}}
                    </div>
                </div>

                <div class="grid grid-rows-5 grid-flow-col ">
                    <!-- {{winningNumbers}} -->
                    
                    <div v-for="attr in meta.attributes" 
                        :key="attr"
                        :id="attr.trait_type"
                        class="ring h-20 p-5"
                        :class="compareSquare(attr.value, game.winningNumbers)">
                        {{attr.value}}   
                    </div>    
                
                </div>
                
                
                
            </div>
            <div v-else>
                <div v-if="(game.id !== store.state.bingoCurrenGame)">
                    <div class="text-3xl">
                        A new game has started, come join us...
                    </div>
                    <button v-if="(game.id !== store.state.bingoCurrenGame)" class="p-3 m-2 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                            @click="playNextGame(game.id)">
                            Play Again
                    </button>  
                </div>
                <div v-else>
                    <div class="text-3xl">
                        Please wait while a new game is starting soon...
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
    async setup() {
        const store = useStore()
        const { getCurrentGame , getCurrentGameBingos, userCallBingo} = useBingo()

        const currentGame = getCurrentGame()
        const playerBingos = getCurrentGameBingos(store.state.bingoCurrenGame)

        // console.log(currentGame.value)
        
        let meta = ref([])
        const getData = async (_meta) => {
            import(`@/assets/metadata/${store.state.selectedBingoCard.props.no}`).then((module) => {
                _meta.value = module.default 
            })
        } 
        
        await getData(meta)
        // console.log(meta);
       
        const bingo = {
            handle:    store.state.relayx_handle,
            owner:     store.state.user_address,
            card:      store.state.selectedBingoCard.location
        }

        return { currentGame, store, meta, bingo, playerBingos, userCallBingo }
    },
    methods: {
        goBack() {
            this.$router.push('BingoCardList')
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
        playNextGame(gameId) {
            this.$store.commit("setBingoCurrenGame", gameId)
            window.location.reload()
        }
    
    },
    computed:{
        winningNumbers(){
           return ""
        }
    }
}
</script>