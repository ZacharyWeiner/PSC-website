<template>
  <div
    class="min-h-screen h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
  >
    <div
      class="h-36 bg-contain bg-center md:h-96"
      style="
        background-image: url(https://pewparty.com/wp-content/uploads/2022/01/WideBanner.jpg);
      "
    ></div>
    <div class="text-white text-center pt-4">
      <div class="w-auto">
        <span
          class="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
        >
          The Pewnicorn
        </span>
      </div>
      <div class="text-xl md:text-4xl pb-1">SOCIAL CLUB</div>
    </div>
    <div class="bg-gray-900 rounded-xl p-4">
      <div
        class="text-left w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-xl p-4 md:text-4xl md:px-8 font-extrabold"
      >
        Search For Pre-Orders 
      </div>
      <div class="flex w-full">
        <div class="flex w-full mx-4">
          <div>
            <label class="mx-4 text-lg">
              What is Your Relay Handle or Address?</label
            >
            <br />
            <input class="mx-4 rounded-xl w-full text-gray-800" v-model="handle" />
            <button
              @click="search"
              type="button"
              class="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Find My Orders
            </button>
          </div>
        </div>
        <div class="w-full">
         <div
            class="w-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 bg-clip-text text-transparent text-xl md:text-4xl md:px-8 font-extrabold"
          >
            Pre Order Confirmation
          </div>
          <div class='min-h-36' >
            <div v-if="searching"> Searching ...  </div>
            <div> There are <span :class="[tokens > 0 ? 'text-green-500' : 'text-red-500 font-bold']"> {{tokens? tokens : 0}} </span> pre-orders in for your handle</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import {ref} from "vue"
import Run from "run-sdk";
export default {
  setup(){
      let decimals = ref(0)
      let purseBalance = ref(0)
      let searching = ref(false);
      let utxos = ref([])
      let handle = ref('');
      let userRunAddress = ref('')

      return {decimals, purseBalance, searching, utxos, handle, userRunAddress}
    },
  methods: {
    
    async search() {
      this.searching = true
      console.log("handle:", this.handle)
       const r = await axios.get('https://api.relayx.io/v1/paymail/run/' + this.handle + "@relayx.io")
        const res = await r.data
        console.log('res', res)
        //let _handle = data.paymail.split('@')[0]
      this.userRunAddress = res.data
      let _run = new Run({
        trust: "*",
        timeout: 1000000,
        logger: console,
        owner: "1GqbnK9xVK5HuWNAtyVYm3AmAdempjct3E",
      });
      await _run.inventory.sync();
      let CoinsClass = await _run.load(
        "d0f84d202d91468f9bbdcf6a028e7223abab5a2c935fb347a65bc3ec6d85ddd8_o2"
      );
      console.log("POO decimals:", CoinsClass.decimals);
      this.decimals = CoinsClass.decimals;
      this.utxos = _run.inventory.jigs.filter(
        (jig) => jig instanceof CoinsClass
      );
      console.log("unsepnt output count:", this.utxos.length, this.utxos[0]);
      this.purseBalance = await _run.purse.balance();
      this.searching = false
    },
  },
  computed:{
    tokens(){
      if (this.utxos?.length > 0 ){
        return this.utxos.filter(utxo => utxo.sender === this.userRunAddress).length
      } else {
        return 0
      } 
    }
  }
};
</script>
