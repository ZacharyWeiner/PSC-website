<template>
  <div
    class="min-h-screen h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
  >
    <div
      class="h-36 bg-contain bg-center md:h-96"
      style="
        background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
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
        class="text-center md:text-left w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-xl p-4 md:text-4xl md:px-4 font-extrabold"
      >
        Search For Pre-Orders 
      </div>
      <div class="flex-1 md:flex w-full">
        <div class="flex w-full justify-items-center">
          <div class='w-auto mx-auto md:mx-4'>
            <label class="text-lg">
              What is Your Relay Handle or Address?</label
            >
            <br />
            <input class="rounded-xl w-full text-gray-800" v-model="handle" />
            <button
              @click="search"
              type="button"
              class="inline-flex items-center px-1 md:px-3.5 py-2 my-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <div class='h-full' >
            <div v-if="searching"> Syncing $POO for preorders@relayx.io ... <i class='fa fa-spinner animate-spin'></i>  </div>
            <div v-if="searching" class='text-xs'> *this may take a while.  </div>
            <div> There are <span class='text-xl' :class="[tokens > 0 ? 'text-green-500' : 'text-red-500 font-bold']"> {{tokens? tokens : 0}} </span> pre-orders from your relay address.</div>
          </div>
        </div>
      </div>
    </div>
     <div class="bg-gray-900 rounded-xl m-4 max-h-screen overflow-y-scroll">
       <div> All Orders </div>
       <div v-if="unique?.length > 1"> 
         <div> from {{unique ? unique.length : 0}} accounts </div>
         <!-- <div v-for='(account, index) in unique' :key="index">
            {{account}}
        </div> -->
        <div> {{unique.toString()}} </div>
      </div>
       <div> 
         <div class='py-1 my-2 mx-0.5' v-for="(preorder, index) in preorders" :key="index">
           <div class='mx-auto text-left bg-gray-100 ring-1 ring-pink-500 max-w-md rounded text-pink-800 pl-2 '> 
             <div> {{preorder.amount /100}} - {{preorder.sender}} </div> 
             <!-- <div>  {{JSON.stringify(preorder)}} </div>  -->
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
       const r = await axios.get('https://api.relayx.io/v1/paymail/run/' + this.handle.toLowerCase() + "@relayx.io")
        const res = await r.data
        console.log('res', res)
        //let _handle = data.paymail.split('@')[0]
      this.userRunAddress = res.data
      let _run = new Run({
        trust: "*",
        timeout: 1000000,
        logger: console,
        owner: "1Np9babREvhcHpNgd1RaoCfaokQRSxqnxV",
        //preorders_test
        //owner: "1GqbnK9xVK5HuWNAtyVYm3AmAdempjct3E",
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
    getRelayHandles(){
      // let str = "";
      //  for( let i=0; i < this.unique.length; i++){

      //  }
    }
  },
  computed:{
    tokens(){
      if (this.utxos?.length > 0 ){
        return this.utxos.filter(utxo => (utxo.sender === this.userRunAddress && utxo.amount >= 300000)).length
      } else {
        return 0
      } 
    },
    preorders(){
      if (this.utxos?.length > 0 ){
        return this.utxos.filter(utxo => utxo.amount >= 300000)
      } else {
        return {}
      } 
    },
    unique(){
      let u  = [...new Set(this.utxos.map(item => item.sender))];
      console.log(u)
      return u;
    }
  }
};
</script>
