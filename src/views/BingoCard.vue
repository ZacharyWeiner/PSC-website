<template>
    <div class="text-white">
            <div class="text-right m-2">
                <button class="p-1 m-1 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                        @click="goBack()">
                        Back to Bingo List
                </button>     
            </div>
               

        <div v-for="{id, winningNumbers} in currentGame" 
                    :key="id"
                    class="container m-auto m-1 p-2">
            <div>
                <div class="text-left mb-5">
                    Name: {{meta.name}} <br>
                    Description: {{meta.description}} <br>
                    Edition: {{meta.edition}} <br>
                    Numbers Called: {{winningNumbers}}
                    <img class="h-80" :src="'https://berry.relayx.com/' + store.state.selectedBingoCard.berry.txid " alt="">
                </div>
                <div class="text-right">
                    Players who called Bingo:
                    <div v-for="player in userBingos"
                            :key="player.id"
                            class="">
                        {{player.relayHandle}}
                    </div>
                    
                </div>
                <div class="mb-10">
                    <button class="p-4 m-4 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                            @click="userCallBingo(bingo, meta.edition)"
                            >
                            BINGO!
                            
                    </button> 
                </div>    
                
                <div class="flex grid grid-cols-5 bg-indigo-500 ">
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
                        class="ring h-28 p-10"
                        :class="compareSquare(attr.value, winningNumbers)">
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
import { ref } from 'vue'
import { useBingo } from '../services/firebase'
import { useStore } from 'vuex'

export default {
    async setup() {
        const store = useStore()
        const { getCurrentGame , userBingos, userCallBingo} = useBingo()
        const currentGame = getCurrentGame();
        console.log("CurrentGame.CurrentGame", currentGame.currentGame)
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

        return { currentGame, store, meta, bingo, userBingos, userCallBingo }
    },
    methods: {
        goBack() {
            this.$router.push('BingoCardList')
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
            
        },
        showBingo() {
            

            return 'test'
        }   
    
    },
    computed:{
        winningNumbers(){
           return ""
        }
    }
}
</script>