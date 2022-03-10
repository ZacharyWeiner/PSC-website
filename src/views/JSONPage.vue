<template>
    <div id="content" class='text-white'>
        {{allOrders}}
    </div>
</template>

<script>
import {useOrders} from '../services/firebase.js'
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const {allOrders} = useOrders()
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state), allOrders
        }
    }, 
    methods: {
        showJSON(){
            return 
        }
    }
}
</script>

<style lang="scss" scoped>

</style>