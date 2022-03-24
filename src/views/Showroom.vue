<template>
<div id="showRoom" class="m-4 px-16 text-white ">
    <div class="p-1 w-full bg-gradient-to-r from-yellow-400 via-pink-200 to-pink-400 rounded">
        <div class="h-auto min-h-96 m-0.5 p-4 bg-black rounded md:flex text-lg">
            <iframe width="100%" height="500" src="https://www.youtube.com/embed/R4ECXxyhX5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>    
    </div>
    <div class="p-1 w-1/4 flex">
        <div ref="relayx-button" class="justify-center items-center">
            <p>Tip Amount: {{selectedTipAmount}}</p>
            <ul class="flex justify-center ">
                <li v-for="tipAmount in tipAmounts"
                    :key="tipAmount"
                    @click="setTipAmount(tipAmount)"
                    class="px-2 m-2 border-white ring-1 ring-white rounded cursor-pointer"
                    :class="`${selectedTipAmount === tipAmount ?  'bg-gray-100 text-black' : ''}`"
                >
                {{tipAmount}}
                </li>
            </ul>
        </div>
        <div ><p class="text-xl font-bold my-10">You are tipping: {{ selectedHandle }}</p></div>
    </div>
    <div class="w-1/4 bg-black ring-4 ring-white ">
        <div class="bg-black text-lg ">
            <div @click="createNewRelay('pewnicorn@relayx.io', selectedTipAmount)"
                class="cursor-pointer"
                :class="`${selectedHandle === 'pewnicorn@relayx.io' ?  'bg-teal-100 text-black' : ''}`"
            >
                Pewnicorn Social Club
            </div>
            <div v-for="band in bands"
                 :key="band.id"
                 class="pb-2">
                <div :id="band.code" @click="createNewRelay(band.handle, selectedTipAmount)"
                    class="cursor-pointer"
                     :class="`${selectedHandle === band.handle ?  'bg-teal-100 text-black' : ''}`">
                    {{band.name}}
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<style>
    #showRoom {background: url(../assets/curtain.png) center top no-repeat;background-size: cover;}
</style>

<script>
import { useRun } from '../services/wallet.js'
import { getBands } from '../services/firebase.js'
import { ref } from 'vue'

export default {
    setup() {
        const { signIn, isLogin, signOut } = useRun()
        const { bands } = getBands()
        const tipAmounts = [0.05, 0.25, 1.00, 5.00]
        const selectedTipAmount = ref(0.05)
        const selectedHandle = ref('pewnicorn@relayx.io')

    
        return { signIn, isLogin, signOut, bands, tipAmounts, selectedTipAmount, selectedHandle }

    },
    methods: {
        createNewRelay(_toHandle) {
            this.selectedHandle = _toHandle
            window.relayone.render(this.$refs['relayx-button'], {
                to: _toHandle,
                amount: this.selectedTipAmount,
                currency: 'USD',
                editable: true,
                onPayment: (e) => {
                    console.log("Successful Payment", e.txid)
                },
                onError: (err) => {
                    alert(err);
                    console.log(err)
                }
            })   
        },
        setTipAmount(_amount){
            this.selectedTipAmount = _amount
            this.createNewRelay(this.selectedHandle)
        }
        
    },

    
}
</script>