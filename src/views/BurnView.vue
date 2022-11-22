<template>
    <Menu />
    <div class="isolate bg-white">
    <main class="overflow-none">
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-3xl pt-2 pb-4 sm:pt-12 sm:pb-12">
          <div>
            <!-- <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              <div class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span class="text-gray-600">
                  Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
                </span>
              </div>
            </div> -->
            <div>
              <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">This Is Your Burn Account</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">Burn Your NFTs for POO.</p>
              <div class="mt-8 flex gap-x-4 sm:justify-center">
                <button @click="createBurnAccount" class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                  Create My Burn Account
                  <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
                </button>
                <button @click="fetchRelayNFTs" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Load Relay NFTs
                  <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
    <div class="w-full flex grid grid-cols-2 bg-black space-x-1 font-bold">
        <div class="w-full flex grid col-span-1">
            <div class="w-full rounded full bg-gradient-to-r from-indigo-500 to-purple-500 text-white m-2"> 
                <div> Burn Address: </div>  <div> {{burnAddress}} </div>
            </div>
        </div>
        <div class="w-full flex grid col-span-1">
            <div class="w-full rounded full bg-gradient-to-r from-indigo-500 to-purple-500 text-white m-2"> 
                <div> Burn PrivateKey: </div>  <div> {{burnPrivateKey}} </div>
            </div>
        </div>
    </div>
    <div v-if="loading">
        Loading ...
    </div>
    <div class="w-full flex grid grid-cols-2 bg-black space-x-1 font-bold">
        <div class="w-full flex grid col-span-1">
            <div v-for="nft in relayNFTs" :key="nft.location" class="w-full rounded full bg-gradient-to-r from-indigo-500 to-purple-500 text-white m-2 flex"> 
               <div> <img :src="`https://berry.relayx.com/${nft.berry.txid}  `" class="h-12 w-12 rounded-full"/> </div> <div> {{collectionName(nft.origin)}} </div>  <div> | {{nft.props ? nft.props.no : nft.props.metadata.no}} {{nft.props.metadata?.name }} </div>
            </div>
        </div>
        <div class="w-full flex grid col-span-1">
           
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import Menu from "./../components/MenuComponent2.vue"
import {mapState} from "vuex"
import axios from "axios";
export default {
    components: {Menu},
    setup () {
        let relayNFTs = ref([]);
        const state = reactive({
            count: 0,
            loading: false,
        })
    
        return {
            ...toRefs(state),
            relayNFTs,
        }
    },
    methods: {
        createBurnAccount(){
            let Run = window.Run;
            let instance = new Run({});
            console.log(instance.owner.address);
            console.log(instance.owner.privkey);
            this.$store.commit("setBurnAddress", instance.owner.address);
            this.$store.commit("setBurnPrivateKey", instance.owner.privkey);
        },
        async fetchRelayNFTs(){
            this.loading = true;
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + this.$store.state.user_address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            console.log(collectibles)
            this.relayNFTs = collectibles;
            for(let f = 0; f < collectibles.length; f++){
              let collectible = collectibles[f]
              this.fetchCollectionName(collectible.origin);
            }
            this.loading = false;
        },
         async fetchCollectionName(origin){
          let originName = this.$store.state.originNames[origin]
          if(!originName || originName === ""){
            let { data } = await axios.get(`https://staging-backend.relayx.com/api/market/${origin}`);
            console.log( data.data.token.name )
            let name = data.data.token.name;
            this.$store.commit("addOriginName", {name, origin})
          }
          console.log(this.$store.state.originNames)
          return originName;
        },
        collectionName(origin){
          return this.$store.state.originNames[origin]
        }
    },
    computed:{
        ...mapState(["burnAddress", "burnPrivateKey"])
    }
}
</script>

<style lang="scss" scoped>

</style>