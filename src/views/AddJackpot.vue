<template>
    <div class='pt-20 text-white'>
        <div> handle: <input class='text-gray-800' v-model='handle'> </div>
        <div> Slavette: <input class='text-gray-800' v-model='slavetteId'> </div>
        <button @click='clickAddJackpot'> Add </button>
        <!-- <button @click='getJackpotsForSlavette'>  -->

        
    </div>
</template>

<script>
import {useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { reactive, toRefs } from 'vue'
import {getJackpots} from './../services/firebase.js'
const whitelist = ['gopniks', 'zackwins', 'stevenk', 'pewparty']
export default {
    setup () {
        let store = useStore();
        let router = useRouter();
        let whitelisted = whitelist.filter(un => un === store.state.relayx_handle)
        if(whitelisted.length === 0){
            router.push('/')
        }
        const state = reactive({
            handle: '',
            slavetteId:'',
            count: 0,
        })
    
        return {
            ...toRefs(state), 
        }
    },
    methods:{
        clickAddJackpot(){
            const { addjackpot } = getJackpots(this.handle)
            addjackpot(this.slavetteId)
            this.slavetteId = ""
        },

    }
}
</script>

<style lang="scss" scoped>

</style>