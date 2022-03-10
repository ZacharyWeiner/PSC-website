<template>
    template>
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
        <div class='min-w-sm max-w-sm mx-auto h-96 w-96 bg-gray-900 rounded-xl'> 
            <div class='h-full'> 
                <div class='pt-6'> 
                    <img class='h-48 w-48 mx-auto rounded-xl' src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" />
                </div>
                <div class='mx-auto pt-5 mt-5'>
                    <div v-if="!isLogin" > <button @click="loginClicked" class='bg-blue-500 p-2 m-2 rounded-xl'> LOGIN WITH RELAYX</button> </div>
                    <div  v-if="isLogin">
                    <div> {{relayx_handle}}@relayx.io </div>
                    <div  v-if="isLogin && paid"> 
                        <button @click="mint" class=' rounded-xl px-6 py-2 m-2 bg-gradient-to-r from-yellow-400 via-yellow-700 to-yellow-300 animate-pulse' >
                            <div class="text-2xl font-medium  "> MINT </div> 
                        </button>
                    </div>
                     <div class='items-justify-center'> <div ref='payForMint' class='buy-extra mx-32' > </div></div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRun} from './../services/wallet.js'
import {mapState} from 'vuex'
const whitelist = ['pewnicorn', 'skless', 'zackwins', 'psc_test']
export default {
    setup () {
        //const _store = useStore();
        const {signIn, isLogin, signOut} = useRun()
        //signOut(_store);
        console.log(isLogin.value)
        const state = reactive({
            count: 0,
        })
        return {
            ...toRefs(state), signIn, isLogin, signOut, whitelist
        }
    },
    methods: {
        pay(){
            window.relayone.render(this.$refs['payForMint'], {
                to: "pewnicorn@relayx.io",
                amount: 1.00,
                currency: "USD",
                onPayment: () => {
                    console.log("Successful Payment"); 
                    this.store.commit("paidForMint", true)
                },
                onError: (err) => {
                    alert(err);
                    console.log(err);
                }
            })
        },
        mint() {
            console.log("Minting")

        },
        onMintConfirmed(){
            console.log("Mint Completed"); 
            this.store.commit("paidForMint", true)
        },
        async loginClicked(){
            await this.signIn();
        }
    },
    computed:{
        myNFTs(){
            if(this.isLogin){return "Find NFTs"}
            else{return "Not Logged In"}
        },
        ...mapState(['relayx_handle'])
    }
}
</script>

<style lang="scss" scoped>

</style>