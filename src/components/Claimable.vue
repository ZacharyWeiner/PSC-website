<template>
    <div v-if="isLogin">
        <div v-if='canClaim' > 
            <!-- <div class='text-center'> Claim </div> -->
            <div class='text-center'> 
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button @click="saveUserAction" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"> CLAIM </button>
                </div>
            </div>
        </div>
        <div v-else-if="userJigs.length > 0"> {{successMessage}} </div>
        <div v-else>You must own a Pewnicorn PRD NFT to Claim </div>
    </div>
    <div v-else>You must be logged in & own a Pewnicorn PRD NFT to Claim </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useStore} from "vuex"
;import { userProfiles} from "./../services/firebase.js"
import { useRun } from "./../services/wallet.js"

export default {
    setup () {
        let {setUserAction, findUserActions} = userProfiles()
        let {isLogin} = useRun()
        let store = useStore();
        const state = reactive({
            count: 0,
            successMessage: "Your $POO has been claimed and will be sent SOON"
        })
        console.log(store.state.relayx_handle);
        let userActions = findUserActions(store.state.relayx_handle);
        return {
            ...toRefs(state), setUserAction, findUserActions, isLogin, userActions
        }
    },
    methods:{
        saveUserAction(){
            if(this.isLogin){
                if(!this.$store.state.userHasAction){
                let actions = this.findUserActions(this.$store.state.relayx_handle)
                if(actions > 0){
                    this.$store.commit("setHasAction", true);
                }else{
                    this.$store.commit("setHasAction", true);
                    console.log(this.$store.state.relayx_handle)
                    this.setUserAction(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
                }
                }
            }
            console.log(this.$store.state.relayx_handle, this.$store.state.user_address, "Claim")
        },
        getUserActions(){
            return this.userActions
        }
    },
    computed:{
        userHasAction(){
            console.log(this.userActions['userActions'].value.length)
            if(this.userActions['userActions'].value.length >  0){
                return true;
            }
            return false;
        },
        canClaim() {
            console.log(this.isLogin,  this.userActions['userActions'].value.length >  0,  this.$store.state.user_jigs.length > 0)
            if(this.isLogin  && !this.userHasAction && this.$store.state.user_jigs){
                return true;
            } 
            return false;
        },
         userJigs(){
            return this.$store.state.user_jigs;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>