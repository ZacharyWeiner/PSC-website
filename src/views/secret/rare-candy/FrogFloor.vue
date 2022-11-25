<template>
    <Menu />
    <div class="text-center">
        <h2 class="text-lg font-semibold text-indigo-600 pt-6">RARE CANDY</h2>
        <div
          class="text-7xl font-black w-full xl:inline bg-gradient-to-r from-blue-400 via-purple-400 to-purple-700 bg-clip-text text-transparent"
        >
          FROG FLOOR
        </div>
        <p class="mx-auto mt-4 max-w-xl text-xl text-gray-500">
          Floor Comparison Tool For FROGS
        </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-12 text-white space-x-1  mx-2 md:mx-6 lg:mx-12">
        <div class="col-span-1 border-2 border-solid rounded-xl mb-2" :class="getRarityBorderClasses(candy)" v-for="candy in sortedCandies" :key="candy.outpoint">
            <div class="rounded-t-xl" :class="getRarityClasses(candy)"> {{candy.metadata? candy.metadata.title : ""}} </div>    
            <div> <img class="w-100% " :src="imageForItem(candy)" /></div>
            
            <div> {{candy.seller_paymail}} </div>    
            <div> ₿ {{(candy.satoshis_price / 100000000).toPrecision(3) }} + Fees</div>    
            <!-- <div class="w-full flex "> <a class="w-full rounded-b-xl bg-gradient-to-r from-purple-400 via-blue-400 to-blue-700 font-black" :href="`https://www.rarecandy.io/item/${candy.collection}`" target="_blank"> VIEW </a> </div>
             -->
             <div class="w-full flex "> <a class="w-full rounded-b-xl bg-gradient-to-r from-purple-400 via-blue-400 to-blue-700 font-black" :href="getRareCandyLink(candy)" target="_blank"> VIEW </a> </div>
        </div>
    </div>
  </template>
  
  <script>
  import { reactive, toRefs } from "vue";
  import {mapState} from "vuex";
  // import axios from "axios";
  import Menu from "./../../../components/MenuComponent2.vue";
  const filterWords = ["Zatto", "BSV", "ZAT", "Spin The", "COST"];
  export default {
    components: { Menu },
    async setup() {

      const state = reactive({
        count: 0,
      });
  
      return {
        ...toRefs(state),
        filterWords,
      };
    },
    async mounted(){
        this.$store.commit("setRareCandies", []);
        let response = await fetch("https://api.rarecandy.io/collections/c8925e7b008668089d3ae1fc1cf450f7f45f0b4af43cd7d30b84446ecb374d6d/listings?page=0&limit=16", {
              "credentials": "omit",
              "headers": {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                  "Accept": "application/json, text/plain, */*",
                  "Accept-Language": "en-US,en;q=0.5",
                  "Content-Type": "application/json",
                  "Sec-Fetch-Dest": "empty",
                  "Sec-Fetch-Mode": "cors",
                  "Sec-Fetch-Site": "same-site"
              },
              "body": "{\"order\":\"ASC\",\"order_by\":\"satoshis_price\",\"min\":\"0\",\"max\":\"1.7976931348623157e+308\",\"status\":\"listed\"}",
              "method": "POST",
              "mode": "cors"
          });
          let data = await response.json();
          console.log("Gets a list of something:", data);
          this.$store.commit("setRareCandies", data);

          response = await fetch("https://api.rarecandy.io/collections/af834baef0563d692a1942daaebea9e3e3a0a5843cbff7667d7776a530fef520/listings?page=0&limit=16", {
              "credentials": "omit",
              "headers": {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                  "Accept": "application/json, text/plain, */*",
                  "Accept-Language": "en-US,en;q=0.5",
                  "Content-Type": "application/json",
                  "Sec-Fetch-Dest": "empty",
                  "Sec-Fetch-Mode": "cors",
                  "Sec-Fetch-Site": "same-site"
              },
              "body": "{\"order\":\"ASC\",\"order_by\":\"satoshis_price\",\"min\":\"0\",\"max\":\"1.7976931348623157e+308\",\"status\":\"listed\"}",
              "method": "POST",
              "mode": "cors"
          });
          data = await response.json();
          console.log("Gets a list of something:", data);
          let newData = [...this.$store.state.rareCandies, ...data]
          console.log(newData);
          this.$store.commit("setRareCandies", newData);

          response = await fetch("https://api.rarecandy.io/collections/9ff8922f53093f0a10b0b368a3724460c109c2acf2087f6ccaf822f47aede467/listings?page=0&limit=16", {
              "credentials": "omit",
              "headers": {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                  "Accept": "application/json, text/plain, */*",
                  "Accept-Language": "en-US,en;q=0.5",
                  "Content-Type": "application/json",
                  "Sec-Fetch-Dest": "empty",
                  "Sec-Fetch-Mode": "cors",
                  "Sec-Fetch-Site": "same-site"
              },
              "body": "{\"order\":\"ASC\",\"order_by\":\"satoshis_price\",\"min\":\"0\",\"max\":\"1.7976931348623157e+308\",\"status\":\"listed\"}",
              "method": "POST",
              "mode": "cors"
          });
          data = await response.json();
          console.log("Gets a list of something:", data);
          newData = [...this.$store.state.rareCandies, ...data]
          console.log(newData);
          this.$store.commit("setRareCandies", newData);

          response = await fetch("https://api.rarecandy.io/collections/964a82d5d478eb7f6236e1c2ee6cb993c50b3131cd88b1d1330f6f125d31bb8d/listings?page=0&limit=16", {
              "credentials": "omit",
              "headers": {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                  "Accept": "application/json, text/plain, */*",
                  "Accept-Language": "en-US,en;q=0.5",
                  "Content-Type": "application/json",
                  "Sec-Fetch-Dest": "empty",
                  "Sec-Fetch-Mode": "cors",
                  "Sec-Fetch-Site": "same-site"
              },
              "body": "{\"order\":\"ASC\",\"order_by\":\"satoshis_price\",\"min\":\"0\",\"max\":\"1.7976931348623157e+308\",\"status\":\"listed\"}",
              "method": "POST",
              "mode": "cors"
          });
          data = await response.json();
          console.log("Gets a list of something:", data);
          newData = [...this.$store.state.rareCandies, ...data]
          console.log(newData);
          this.$store.commit("setRareCandies", newData);

    },
    methods: {
      imageForItem(nft) {
        if(!nft?.metadata){return }
        return "https://bico.media/" + nft.metadata.image.replace("b://", '');
      },
      goToMarket(collection) {
          console.log("Clicked with collection:", collection)
          this.$store.commit("setMarketContractLocation", collection.origin);
          this.$store.commit("setMarketContractName", collection.name);
          this.$store.commit("setMarketOrders", []);
          this.$router.push("/collectables");
      },
      getRarityClasses(nft){
        if(!nft?.metadata){return}
        if(nft.metadata.rarity === "Common"){
            return "bg-gray-800 text-gray-200"
        }
        else if(nft.metadata.rarity === "Uncommon"){
            return "bg-gray-300 text-gray-900"
        }
        else if(nft.metadata.rarity === "Rare"){
            return "bg-green-500"
        }
        else if(nft.metadata.rarity === "Epic"){
            return "bg-red-500"
        }
        else if(nft.metadata.rarity === "Legendary"){
            return "bg-yellow-700"
        }
        if(nft.metadata.rarity === "Exotic"){
            return "bg-aqua-800"
        }
      },
      getRarityBorderClasses(nft){
        if(!nft?.metadata){return}
        if(nft.metadata.rarity === "Common"){
            return "border-gray-800"
        }
        else if(nft.metadata.rarity === "Uncommon"){
            return "border-gray-300"
        }
        else if(nft.metadata.rarity === "Rare"){
            return "border-green-500"
        }
        else if(nft.metadata.rarity === "Epic"){
            return "border-red-500"
        }
        else if(nft.metadata.rarity === "Legendary"){
            return "border-yellow-700"
        }
        if(nft.metadata.rarity === "Exotic"){
            return "border-aqua-800"
        }
      },
      getRareCandyLink(candy){
        if(candy.metadata.title.includes("Lizer")){
            return "https://rarecandy.io/" + "/collections/lizer-vaxx" + '?filter={"order":"ASC","order_by":"satoshis_price"}'
        } else if(candy.metadata.title.includes("Frog")){
            return "https://rarecandy.io/" + "/collections/frog-cartel" + '?filter={"order":"ASC","order_by":"satoshis_price"}'
        } else if(candy.metadata.title.includes("Apu")){
            return "https://rarecandy.io/" + "/collections/apu-cartel" + '?filter={"order":"ASC","order_by":"satoshis_price"}'
        } else if(candy.metadata.title.includes("Grave")){
            return "https://rarecandy.io/" + "/collections/graveyard" + '?filter={"order":"ASC","order_by":"satoshis_price"}'
        }
      }
      
    },
    computed:{
        sortedCandies(){
            let sorted = this.$store.state.rareCandies
            return sorted.sort((a, b) =>{ 
                let a1 =  parseInt(a.satoshis_price, 10)
                let b1 =  parseInt(b.satoshis_price, 10)
                return a1- b1
            });
        },
        ...mapState(['rareCandies'])
    }
  };
  </script>
  
  <style lang="scss" scoped></style>
  