<template>
  <div
    class="min-h-screen h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
  >
    <div
      class="h-36 bg-contain bg-center md:h-64"
      style="
        background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
      "
    ></div>
    <div class="text-white text-center pt-4">
      <div class="w-auto">
        <div
          class="text-5xl md:text-7xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
        >
          Mint A Pewnicorn
        </div>
         <div class="text-xl md:text-2xl pb-1">Research Division</div>
      </div>
    </div>
    <div class='flex items-center items-justify-center'> 
        <div class='min-w-sm max-w-sm mx-auto h-auto w-96 bg-gray-900 rounded-xl'> 
            <div class='h-full'> 
                <div class='pt-6'> 
                    <img class='h-48 w-48 mx-auto rounded-xl' src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" />
                </div>
                <div v-if="(orderCount) < 400" class='mx-auto pt-5 mt-5'>
                    <div v-if="!isLogin" > <button @click="loginClicked" class='bg-blue-500 p-2 m-2 rounded-xl'> LOGIN WITH RELAYX</button> </div>
                    <div  v-if="isLogin">
                    <div> {{relayx_handle}}@relayx.io </div>
                    <div  v-if="isLogin && orderCount < 400"> 
                        <button @click="mint" :class="mintButtonClasses" class=' rounded-xl px-6 py-2 m-2' >
                            <div class="text-2xl font-medium  "> {{mintText}} </div> 
                            <!-- <div class="text-2xl font-medium  "> MINT PAUSED </div>  -->
                        </button>
                    </div>
                    <div  class='items-justify-center'> {{400 + orderCount}} / 800 minted </div>
                     <div class='items-justify-center'> <div ref='payForMint' class='buy-extra mx-32' > </div></div>
                     
                    </div>
                </div> 
            </div>
        </div>
    </div>
    <div v-if="isLogin"> <button @click="logout" class='px-4 p-2 m-2 mt-16 bg-red-600 rounded-xl text-white'>LOGOUT</button> </div>
    <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="mint">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-pink-100">
                <i class='fa fa-check text-pink-600'> </i>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"> CONGRATS YGMI</DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-300">Your Pewnicorn will arrive in your relay wallet in a few minutes. </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r form bg-indigo-600 to-bg-pink-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="mint">MINT MORE</button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {useRun} from '../services/wallet.js'
import {mapState, useStore} from 'vuex'
import {useOrders, useCounters} from '../services/firebase.js'

const whitelist = ['pewnicorn', 'skless', 'zackwins', 'psc_test']
// import { CheckIcon } from '@heroicons/vue/outline'
export default {
    components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    // CheckIcon,
  },
    setup () {
        const _store = useStore();
        const {signIn, isLogin, signOut} = useRun()
        const {sendOrder, findOrders} = useOrders()
        const {allCounters, increment} = useCounters();
        //signOut(_store);
        
        console.log(isLogin.value, _store.state.paidForMint)
        const state = reactive({ 
            count: 0,
            txid: 0,
            open:false,
            paying: false
        })
        return {
            ...toRefs(state), signIn, isLogin, signOut, whitelist, sendOrder, findOrders, allCounters, increment
        }
    },
    methods: {
        pay(){
            window.relayone.render(this.$refs['payForMint'], {
                to: "pewnicornsocialclub@relayx.io",
                amount: 25.00,
                currency: "USD",
                onPayment: (e) => {
                    this.$store.commit("setPaidForMint", true)
                    this.open = true
                    console.log("Successful Payment", e.txid); 
                    this.txid = e.txid
                    this.paying = false;
                },
                onError: (err) => {
                    alert(err);
                    console.log(err);
                }
            })
        },
        mint() {
            if(this.paidForMint){
                console.log("Your Order has been submitted and your mint is pending.... ")
                console.log("TXID before save to firebase:", this.txid)
                let response = this.sendOrder(this.txid, this.$store.state.relayx_handle, this.$store.state.user_address, null, false)
                console.log(response)
                this.$store.commit("setPaidForMint", false)
                this.open = false
            }else{
                this.pay()
                if(this.paying === false){this.increment()}
                this.paying = true
            }
            
        },
        onMintConfirmed(){
            console.log("Mint Completed"); 
            this.store.commit("paidForMint", false)
        },
        async loginClicked(){
            await this.signIn();
        },
        logout(){
            this.signOut(this.$store)
        },
        async setUpDB(){
         
        }
    },
    computed:{
        myNFTs(){
            if(this.isLogin){return "Find NFTs"}
            else{return "Not Logged In"}
        },
        mintText(){ 
            return this.paidForMint ? "MINT" : "BUY"
        },
        orderCount(){
            if(this.allCounters[0]?.count){return this.allCounters[0].count}
            return 0
        },
        mintButtonClasses(){
          if(!this.paidForMint){
            if(this.paying){return 'disabled'}
            return "bg-gradient-to-r from-yellow-400 via-yellow-700 to-yellow-300 animate-pulse"
          }
          return "bg-gradient-to-r from-green-400 via-green-700 to-green-300 animate-pulse";
        },
        ...mapState(['relayx_handle', "paidForMint"])
    }
}
</script>

<style lang="scss" scoped>

</style>