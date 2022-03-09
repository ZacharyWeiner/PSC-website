<template>
    <div class="flex w-full justify-items-center">
        <div class='w-auto mx-auto md:mx-4'>
            <div class="text-white">
                {{allOrders}}
            </div>
        <button
            @click="markMiinted(1)"
            type="button"
            class="inline-flex items-center px-1 md:px-3.5 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Mark Minted
        </button>
        <button
            @click="sendOrder('234565432', 'otherSteve', 'sgfdgsdgiufdogsufigod', 101, false)"
            type="button"
            class="inline-flex items-center px-1 md:px-3.5 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Send Order
        </button>

        <div class="text-white">
                {{orders}}
            </div>
        </div>
    </div>
</template>

<script>

import { useOrders }from '../services/firebase'
export default {
    setup() {
    
        const {allOrders , sendOrder, findOrders, markMiinted} = useOrders() 

        const orders = findOrders('otherSteve')

        return { allOrders, sendOrder, orders, markMiinted }

    },
    methods: {

    }



}
</script>