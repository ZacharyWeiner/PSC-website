<template>
    <div class='pt-24 min-h-screen'>
        <div class='text-white text-4xl font-bold'>Profile </div>
        
        <jig-list></jig-list>
        <div class='p-2 m-2 max-w-xl mx-auto text-center'>
        <button @click="logout" class='w-full flex justify-center p-2 m-2 ring-white ring-2 rounded-xl flex text-red-500' > <div> Logout </div>  </button>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import JigList from '../components/JigList.vue'
import {useFetchOrders} from './../services/RunData'
import {mapState} from 'vuex'
import {useRun} from './../services/wallet'
export default {
  components: { JigList },
    setup () {
        const {getOpenOrders} = useFetchOrders();
        const state = reactive({
            count: 0,
        })
    
        return {
            getOpenOrders,
            ...toRefs(state),
        }
    },
    methods:{
        async logout(){
            let signOut= useRun();
            signOut.signOut(this.$store);
            this.$router.push('/')
        }
    },
    computed:{
        ...mapState(['last_offers'])
    }
}
</script>

<style scoped>

</style>