<template>
    <div class="flex">
        <span class="">{{positiveVoteCount.substring(0,3)}} votes</span>
        <div class="bg-green-500 h-1" :class="positiveWidth"></div>
        <div class="bg-red-500 h-1" :class="negativeWidth"></div>
        <span>{{negativeVoteCount}} votes</span>
    </div>
</template>

<script>

import {ref, reactive, toRefs } from 'vue'

export default {
    setup (props) {
        const positiveWidth = ref(props.positiveVoteWidth)
        const negativeWidth = ref(props.negativeVoteWidth)
        console.log(positiveWidth.value, negativeWidth.value)
        const state = reactive({
            count: 0,
        })
    
        return {
            positiveWidth, 
            negativeWidth,
            ...toRefs(state), 
        }
    },
    props:["positiveVoteCount", "negativeVoteCount", 'positiveVoteWidth', 'negativeVoteWidth']
}
</script>

<style lang="scss" scoped>

</style>