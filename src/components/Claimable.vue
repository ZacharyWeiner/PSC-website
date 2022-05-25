<template>
    <div v-if="isLogin">
        <div v-if='!userHasAction' > 
        <div class='text-center'> Claim </div>
        <div class='text-center'> <button class='ring-gray-100 ring-2 px-1 py-2 rounded bg-gray-900 mx-1' @click="saveUserAction"> 100 $POO </button></div>
        </div>
        <div v-else> Youve Claimed Your $POO, It Will Be Sent Soon </div>
    </div>
    <div v-else>Not Logged In</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { userProfiles} from "./../services/firebase.js"
import {useRun} from "./../services/wallet.js"

export default {
    setup () {
        let {setUserAction, findUserActions} = userProfiles()
        let {isLogin} = useRun()
        const state = reactive({
            count: 0,
        })
        let response = findUserActions();
        console.log(response);
        return {
            ...toRefs(state), setUserAction, findUserActions, isLogin
        }
    },
    methods:{
        saveUserAction(){
            if(this.isLogin){
                if(!this.$store.state.userHasAction){
                let actions = this.findUserActions(this.$store.state.relay_handle)
                if(actions > 0){
                    this.$store.commit("setHasAction", true);
                }else{
                    this.$store.commit("setHasAction", true);
                    this.setUserAction(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
                }
                }
            }
            console.log(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
        }
    },
    computed:{
        userHasAction(){
            if(this.$store.state.hasAction){
                return true;
            }
            return false;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>