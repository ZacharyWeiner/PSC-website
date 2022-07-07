<template>
    <div class='text-white'>
        <input v-model="edition" class='text-gray-900' /> 
        <button @click="newCardSession" > Add Card </button> 
    </div>
    <div v-for="sessionCard in sessionCards" :key="sessionCard.id" class='text-white'>
        {{sessionCard.handle}} {{sessionCard.edition}}
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {gameSessionCards} from "../../services/firebase.js";
import {useStore} from "vuex";
export default {
    setup (props) {
        console.log("Props Session:", props.game[0].session)
        let store = useStore();
        let {
            addCardToSession,
            userGameSessionCards,
            fetchUserGameSessionCards,
        }  = gameSessionCards(store.state.relayx_handle, props.game[0].session)
        fetchUserGameSessionCards()

        const state = reactive({
            edition: 0,
            session: props.game[0].session
        })
    
        return {
            ...toRefs(state),
            addCardToSession,
            userGameSessionCards,
            fetchUserGameSessionCards,

        }
    },
    methods: {
        newCardSession() {
            console.log(this.userGameSessionCards)
            // console.log(this.currentGame[0].session, this.$store.state.relayx_handle, this.edition, this.$store.state.user_address)
            this.addCardToSession(this.session, this.$store.state.relayx_handle, this.edition, this.$store.state.user_address)
        }
    },
    computed:{
        sessionCards(){
            console.log(this.userGameSessionCards)
            return this.userGameSessionCards;
        }
    },
    props:['game']
}
</script>

<style lang="scss" scoped>

</style>