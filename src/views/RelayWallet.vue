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
              <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Relay Wallet</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600 sm:text-center">Burn Your NFTs for POO.</p>
              <div class="mt-8 flex gap-x-4 sm:justify-center">
                <button @click="fetchRelayNFTs" class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                    Reload Relay NFTs
                  <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
                </button>
                <button @click="fetchRelayNFTs" class="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Load Relay Coins
                  <span class="text-gray-400" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
    <!-- <div class="w-full flex grid grid-cols-2 bg-black space-x-1 font-bold">
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
    </div> -->
    <div v-if="loading">
        Loading ...
    </div>
    <div class="w-full flex  bg-black space-x-6 font-bold">
        <div class="w-1/4 ">
            <a v-for="(balance, index) in balances" :key="balance.key" :href="`https://relayx.com/assets/${index}`" target="_blank" class="w-full text-center lg:flex lg:text-left rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 m-2"> 
                <div class="text-green-200 text-left">{{ balance}} </div>   <div class="max-h-24 pl-2 text-right w-full">{{ originNames[index] ? originNames[index].substring(0,30) :  fetchCollectionName(index)}} </div>  
            </a>
        </div>
        <div class="w-3/4 text-white p-2 ">
            <!-- <div v-for="nft in relayNFTs" :key="nft.location" class="w-full rounded full bg-gradient-to-r from-indigo-500 to-purple-500 text-white m-2 flex"> 
               <div> <img :src="`https://berry.relayx.com/${nft.berry.txid}  `" class="h-12 w-12 rounded-full"/> </div> <div> {{originNames[nft.origin] ? originNames[nft.origin] :  fetchCollectionName(nft.origin)}} </div>  <div> | {{nft.props ? nft.props.no : nft.props.metadata.no}} {{nft.props.metadata?.name }} </div>
            </div> -->
            <div v-for="group in grouppedByOrigin" :key="group" class="w-full rounded-xl bg-gray-900 ring-1 ring-indigo-500 m-2 flex"> 
               <div class="w-48"> <img v-if="group" :src="`https://berry.relayx.com/${group.berryTx}  `" class="h-20 w-20 rounded-full p-2"/> </div> 
               <div class="w-full text-xl my-auto text-left text-indigo-400"> {{group.name}} </div>
               <div class="p-2 text-xl my-auto px-5 text-green-400"> {{group.count}} </div>
               <div class="w-full text-xl my-auto px-5" > <a target="blank" :href="group.viewLink" class="text-sm bg-indigo-600 rounded text-white p-2 m-2">View Bag</a> </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import Menu from "./../components/MenuComponent2.vue"
import {mapState, useStore} from "vuex"
import axios from "axios";
export default {
    components: {Menu},
    setup () {
        let relayNFTs = ref([]);
        let balances = ref([]);
        let store = useStore()
        const state = reactive({
            count: 0,
            loading: false,
        })
    
        return {
            ...toRefs(state),
            relayNFTs,
            balances,
            store,
        }
    },
    async mounted(){
        await this.fetchRelayNFTs();
    },
    methods: {
        async fetchRelayNFTs(){
            this.loading = true;
            let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + this.$store.state.user_address)
            let response_data = await walletJSON.json()
            console.log(response_data)
            let collectibles = response_data.data['collectibles'];
            let _balances = response_data.data['balances'];
            console.log(_balances)
            this.relayNFTs = collectibles;
            this.balances = _balances;
            for(let f = 0; f < collectibles.length; f++){
              let collectible = collectibles[f]
              this.fetchCollectionName(collectible.origin);
            }
            for(let f = 0; f < _balances.length; f++){
              let balance = _balances[f]
              await this.fetchCollectionName(balance.key);
            }
            this.loading = false;
        },
         async fetchCollectionName(origin){
          console.log("fetching Name for:", origin);
          let originName = await this.collectionName(origin)
          if(!originName || originName === ""){
            try{
            let { data } = await axios.get(`https://staging-backend.relayx.com/api/market/${origin}`);
            let name = data.data.token.name;
            originName = name;
            this.$store.commit("addOriginName", {name, origin})
            }catch(err){
                console.log(err)
                originName = "Unknown"
            }
          }
          //console.log(this.$store.state.originNames)
          return originName;
        },
        async collectionName(origin){
          return this.$store.state.originNames[origin]
        },
        goToMarket(origin, name, berryTx) {
            console.log("Clicked with collection:", name)
            this.$store.commit("setMarketContractLocation", origin);
            this.$store.commit("setMarketContractName", name);
            this.$store.commit("setMarketOrders", []);
            this.$store.commit("setMarketContractImageUrl", `https://berry.relayx.com/${berryTx}  `)
            this.$router.push("/collectables");
        },
    },
    computed:{
        grouppedByOrigin(){
            let _groups = {};
            if(this.relayNFTs.length > 0){
                for(let i =0; i < this.relayNFTs.length; i++){
                    let _nft = this.relayNFTs[i];
                    console.log(_nft)
                    let _group = _groups[_nft.origin];
                    if(!_group){
                        console.log("no group yet")
                        _groups[_nft.origin] = {count: 1, berryTx: _nft.berry.txid, name: this.$store.state.originNames[_nft.origin], viewLink: `https://relayx.com/market/${_nft.origin}`}
                    } else {
                        console.log("group is", _groups[_nft.origin])
                        _groups[_nft.origin].count = _groups[_nft.origin].count + 1
                    }
                }
            }
            return _groups;
        },
        ...mapState(["user_address", "originNames"])
    }
}
</script>

<style lang="scss" scoped>

</style>