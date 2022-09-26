<template>
    <div v-if="isLogin">
        <div v-if='canClaim' > 
            <!-- <div class='text-center'> Claim </div> -->
            <div class='text-center'> 
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button @click="saveUserAction" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"> CLAIM NOW!</button>
                </div>
                <div class="pt-4"> 
                Last Claimed: {{lastAction}}
                </div>  
            </div>
        </div>
        <div v-else-if="userJigs.length > 0" >
            <img src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorn-claim-gif.gif" />
             {{successMessage}} 
             <div class="pt-4"> 
                Last Claimed: {{lastAction}}
             </div>  
        </div>
        <div v-else>You must own a Pewnicorn PRD NFT to Claim </div>
    </div>
    <div v-else>You must be logged in to Claim </div>
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
            this.getUserActions();
            this.userActions = this.findUserActions(this.$store.state.relayx_handle);
        },
        getUserActions(){
            return this.userActions
        }
    },
    computed:{
        userHasAction(){
            console.log(this.userActions['userActions'].value.length)
            if(this.userActions['userActions'].value.length >  1){
                return true;
            }
            return false;
        },
        canClaim() {
            let _canClaim = false;
            if(this.isLogin  && this.$store.state.user_jigs.length > 0){
                _canClaim = true;
            } 
            let compareDate = new Date('2022-09-18');
            this.userActions['userActions'].value.forEach((ua)=> {
                let actionDate = new Date(ua.timestamp.seconds * 1000);
                if( actionDate > compareDate){
                    console.log("newer")
                    _canClaim = false;
                }
            })
            console.log(compareDate, this.isLogin,  this.userActions['userActions'].value.length >  0,  this.$store.state.user_jigs.length > 0)
            
            return _canClaim;
        },
        lastAction(){
            let last = null;
            this.userActions['userActions'].value.forEach((ua)=> {
                let _compare = new Date(ua.timestamp.seconds * 1000); 
                if( last === null || _compare > last){
                    last  = _compare;
                }
            })
            return last === null ? "None" : last.toDateString();
        },
         userJigs(){
            return this.$store.state.user_jigs;
        },
    }
}
</script>

<style lang="scss" scoped>

</style>