<template>
    <Menu />
    <div class="w-auto mx-auto py-8">
                <span
                class="text-xl md:text-3xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
                >
                Tetris Leaderboard Payouts
                </span>
            </div>  
            <div class="text-white font-bold">
                Nov 5, 2021
            </div>
    <div class="w-full">
    <div v-for="(entry, index) in leaderboard" :key="entry[1]" class="bg-gray-900 m-1 rounded-xl p-1 max-w-sm mx-auto">
        <div class="flex grid grid-cols-4">
            <div class="col-span-1 text-white font-bold"> {{index + 1}}. </div>
            <div class="col-span-1 text-white font-bold"> {{entry[0]}} </div>
            <div class="col-span-1 text-green-500 font-bold"> {{entry[1]}} </div>
        </div>
    </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../../components/MenuComponent2.vue";
let leaderboard = [
    ["Geir", "1000"],
    ["ZackWins", "900"],
    ["Kumo", "800"],
    ["Kumo", "700"],
    ["Kumo", "600"],
    ["Kumo", "500"],
    ["Kumo", "400"],
    ["Kumo", "300"],
    ["BigC", "200"],
    ["BigC", "100"],
]
export default {
    components:{Menu},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state), leaderboard
        }
    }
}
</script>

<style lang="scss" scoped>

</style>