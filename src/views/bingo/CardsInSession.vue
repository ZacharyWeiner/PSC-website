<template>
    <div>
        <game-session-cards :game="currentGame"></game-session-cards>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import GameSessionCards from "./../../components/controls/GameSessionCards.vue";
import {useBingo} from './../../services/firebase.js'
export default {
    components:{GameSessionCards},
    setup () {
        let {getCurrentGame, currentGame} = useBingo();
        currentGame = getCurrentGame();
        const state = reactive({
            count: 0,
            gameSessionId: 0
        })
    
        return {
            ...toRefs(state),
            currentGame,
            getCurrentGame
        }
    }, 
    computed:{
        gameSession(){
            try {
                console.log(this.currentGame[0])
                if(this.currentGame){
                    return this.currentGame[0].session
                }
            } catch (error) {
                return ""
            }
          return ""
        }
    }
}
</script>

<style lang="scss" scoped>

</style>