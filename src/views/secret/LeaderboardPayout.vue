<template>
    <Menu />
   <div class="flex grid grid-cols-2">
    <div class="col-span-1">
        <div class="w-auto mx-auto py-8">
                <span
                class="text-xl md:text-3xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
                >
                Tetris Leaderboard Winners
                </span>
            </div>  
            <div class="text-white font-bold">
                Nov 23, 2021
            </div>
    <div class="w-full">
    <div v-for="(entry, index) in tetrisLeaderboard" :key="entry[1]" class="bg-gray-900 m-1 rounded-xl p-1 max-w-sm mx-auto">
        <div class="flex grid grid-cols-4">
            <div class="col-span-1 text-white font-bold"> {{index + 1}}. </div>
            <div class="col-span-1 text-white font-bold"> {{entry[0]}} </div>
            <div class="col-span-1 text-green-500 font-bold"> {{entry[1]}} </div>
        </div>
    </div>
    </div>
    </div>
    <div class="col-span-1">
        <div class="w-auto mx-auto py-8">
                <span
                class="text-xl md:text-3xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
                >
                Memory Leaderboard Winners
                </span>
            </div>  
            <div class="text-white font-bold">
                Nov 23, 2021
            </div>
    <div class="w-full">
    <div v-for="(entry, index) in memoryLeaderboard" :key="entry[1]" class="bg-gray-900 m-1 rounded-xl p-1 max-w-sm mx-auto">
        <div class="flex grid grid-cols-4">
            <div class="col-span-1 text-white font-bold"> {{index + 1}}. </div>
            <div class="col-span-1 text-white font-bold"> {{entry[0]}} </div>
            <div class="col-span-1 text-green-500 font-bold"> {{entry[1]}} </div>
        </div>
    </div>
    </div>
    </div>
   </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../../components/MenuComponent2.vue";
let tetrisLeaderboard = [
    ["ielvis", "1000"],
    ["ielvis", "900"],
    ["bigcnftvault", "800"],
    ["ielvis", "700"],
    ["bigcnftvault", "600"],
    ["geir", "500"],
    ["geir", "400"],
    ["mrkozak", "300"],
    ["mrkozak", "200"],
    ["bigc", "100"],
]
let memoryLeaderboard = [
    ["ielvis", "1000"],
    ["ielvis", "900"],
    ["bigc", "800"],
    ["ielvis", "700"],
    ["chelz", "600"],
    ["bigcnftvault", "500"],
    ["geir", "400"],
    ["geir", "300"],
    ["gametight", "200"],
    ["bigcnftvault", "100"],
]
export default {
    components:{Menu},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state), tetrisLeaderboard, memoryLeaderboard
        }
    }
}
</script>

<style lang="scss" scoped>

</style>