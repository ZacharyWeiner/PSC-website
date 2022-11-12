<template>
    <div>
        <div class="bg-gray-900">
          <h1 class="text-2xl pt-4 md:pt-8 font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl">
              <span class="block ">TOP COINS</span>
              {{ ' ' }}
              <span class="block text-indigo-600 text-xl ">ON RELAYX</span>
            </h1>
            <div v-if="!hasLoaded" class="text-white">Loading...</div>
            <div class="mx-auto  max-w-lg md:max-w-full  text-white text-xs md:text-m  rounded-xl">
                <div class="md:mt-4 md:pr-4 md:flex w-full">
                  <div
                      v-for="coin in top5"
                      :key="coin.origin"
                      class="mx-auto w-full bg-gray-800 p-2 m-2 overflow-hidden rounded-lg shadow-lg "
                  >
                  <div class="flex">
                      <div class="h-12 w-12">
                          <img
                              class="w-full rounded-full"
                              :src="imageForCollection(coin)"
                              alt=""
                          />
                      </div>
                      <div class="font-black text-left w-full">
                          <div>{{ coin.name.slice(0, 16) }}</div>
                          <div class="flex">
                              <div class="text-green-600">
                              <span class="text-gray-200 px-1"> RANK: </span>
                              {{ coin.stats.rank }}
                              </div>
                          </div>
                      </div>
                      <div class="my-auto">
                            <a :href="`https://relayx.com/market/${coin.origin}`" target="_blank"> View </a>
                      </div>
                    </div> 
                    <div class="flex space-x-0.5 text-xs">
                      <div
                        class="min-w-6 bg-purple-500 text-white rounded-full px-2 py-0.5 font-bold"
                        >
                        7D: ₿{{ (coin.stats.vol_7d / 100000000).toPrecision(2) }}
                      </div>
                      <div
                        class="min-w-6 bg-pink-500 text-white rounded-full px-2 py-0.5 font-bold"
                        >
                        30: ₿{{ (coin.stats.vol_30d / 100000000).toPrecision(2) }}
                      </div>
                    </div> 
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
// import axios from "axios";
const filterWords = ["Zatto", "BSV", "ZAT", "Spin The", "COST", "METAMASTERS"];
export default {
  async setup() {
    let hasLoaded = ref(false);
    let topCollections = ref([]);
    let topCoins = ref([]);


    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
      topCollections,
      topCoins,
      filterWords,
      hasLoaded
    };
  },
  async mounted(){
    let getTop = async (_type) => {
      if (!_type) {
        _type = "COL";
      }
      let _top = [];
      try {
        let response = "";
        if (_type === "COL") {
          response = await fetch("https://staging-backend.relayx.com/graphql", {
            credentials: "omit",
            headers: {
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.5",
              "content-type": "application/json",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-site",
            },
            referrer: "https://relayx.com/",
            body: '{"query":"query ($filter: String!, $category: String!, $search: String) {\\n  ranks(filter: $filter, category: $category, search: $search) {\\n    origin\\n    name\\n    image\\n    stats {\\n      rank\\n      floor\\n      vol_24h\\n      vol_7d\\n      vol_30d\\n      vol_total\\n      __typename\\n    }\\n    __typename\\n  }\\n}","variables":{"filter":"7d","category":"COL","search":""}}',
            method: "POST",
            mode: "cors",
          });
          let data = await response.json();
          console.log("Gets a list of something:", data);
          data.data.ranks.map((coin) => {
            if (
              !filterWords.every(
                (bannedWord) => !coin.name.includes(bannedWord)
              )
            ) {
              console.log("This title is banned;", coin.name);
            } else {
              _top.push(coin);
            }
          });
          return _top;
        } else {
          response = await fetch("https://staging-backend.relayx.com/graphql", {
            credentials: "omit",
            headers: {
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.5",
              "content-type": "application/json",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-site",
            },
            referrer: "https://relayx.com/",
            body: '{"query":"query ($filter: String!, $category: String!, $search: String) {\\n  ranks(filter: $filter, category: $category, search: $search) {\\n    origin\\n    name\\n    image\\n    stats {\\n      rank\\n      floor\\n      vol_24h\\n      vol_7d\\n      vol_30d\\n      vol_total\\n      __typename\\n    }\\n    __typename\\n  }\\n}","variables":{"filter":"7d","category":"FT","search":""}}',
            method: "POST",
            mode: "cors",
          });
          let data = await response.json();
          console.log("Gets a list of something:", data);
          data.data.ranks.map((coin) => {
            if (
              !filterWords.every(
                (bannedWord) => !coin.name.includes(bannedWord)
              )
            ) {
              console.log("This title is banned;", coin.name);
            } else {
              _top.push(coin);
            }
          });
          return _top;
        }
      } catch (err) {
        alert(err);
        return;
      }
    };
    console.log("Gettting Coins");
    this.topCoins = await getTop("FT");
    this.hasLoaded = true;
  },
  methods: {
    imageForCollection(collection) {
      return "https://berry.relayx.com/" + collection.image;
    },
    goToMarket(collection) {
        console.log("Clicked with collection:", collection)
        this.$store.commit("setMarketContractLocation", collection.origin);
        this.$store.commit("setMarketContractName", collection.name);
        this.$store.commit("setMarketContractSevenDayVol", collection.stats.vol_7d);
        this.$store.commit("setMarketContractThirtyDayVol", collection.stats.vol_30d);
        this.$store.commit("setMarketContractFloor", collection.stats.floor);
        this.$store.commit("setMarketOrders", []);
        this.$store.commit("setMarketContractImageUrl", this.imageForCollection(collection))
        this.$router.push("/collectables");
    },
  },
  computed: {
    top5(){
      let coins = new Object(this.topCoins);
      return coins.splice(0, 5);
    }
  }
};
</script>


<style lang="scss" scoped>

</style>