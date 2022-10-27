<template>
  <Menu />
  <div class="text-center">
      <h2 class="text-lg font-semibold text-indigo-600 pt-6">Whats Hot?</h2>
      <div
        class="text-7xl font-black w-full xl:inline bg-gradient-to-r from-blue-400 via-purple-400 to-purple-700 bg-clip-text text-transparent"
      >
        ON RELAY
      </div>
      <p class="mx-auto mt-4 max-w-xl text-xl text-gray-500">
        A New Look For The Relay Orderbook
      </p>
    </div>
  <div class="grid grid-cols-1 lg:grid-cols-4 lg:grid-cols-4 pt-12">
    <div class="col-span-0 md:col-span-1 xl:col-span-1">
      <div
        class="pt-4 mt-4 text-3xl font-black w-full xl:inline bg-gradient-to-r from-purple-400 via-blue-400 to-blue-700 bg-clip-text text-transparent"
      >
        Top Coins
      </div>
      <div v-if="!hasLoaded" class="text-white">Loading...</div>
      <div class="text-white text-xs md:text-m">
        <div class="mx-auto md:mt-12 md:pr-4">
          <div
            v-for="coin in topCoins"
            :key="coin.origin"
            class="bg-gray-900 rounded-full p-2 m-2 flex overflow-hidden rounded-lg shadow-lg"
          >
            <div class="h-12 w-12">
              <img
                class="w-full rounded-full"
                :src="imageForCollection(coin)"
                alt=""
              />
            </div>
            <div class="font-black text-left">
              <div>{{ coin.name.slice(0, 16) }}</div>
              <div class="flex">
                <div class="text-green-600">
                  <span class="text-gray-200 px-1"> RANK: </span>
                  {{ coin.stats.rank }}
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
    <div
      class="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-3 rounded-lg"
    >
      <div
        class="pt-4 mt-4 text-3xl underline font-black w-full xl:inline bg-gradient-to-r from-purple-400 via-blue-400 to-blue-700 bg-clip-text text-transparent"
      >
        Top Collections
      </div>
      <div v-if="!hasLoaded" class="text-white">Loading...</div>
      <div class="text-white">
        <div
          class="mx-auto md:mt-12 md:px-12 grid gap-5 lg:max-w-none sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="collection in topCollections"
            :key="collection.origin"
            class="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div class="flex-shrink-0">
              <img
                class="h-48 w-full object-cover"
                :src="imageForCollection(collection)"
                alt=""
              />
            </div>
            <div class="flex flex-1 flex-col justify-between bg-gray-900 text-gray-100 p-6">
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-600">
                  <a href="" class="underline"
                    >All Time Rank: {{ collection.stats.rank }}</a
                  >
                </p>
                <a href="post.href" class="mt-2 block">
                  <p class="text-xl font-semibold text-gray-100">
                    {{ collection.name }}
                  </p>
                  <!-- <p class="mt-3 text-base text-gray-500">{{ post.description }}</p> -->
                </a>
              </div>
              <div class="mt-6 flex items-center space-x-4">
                <div class="">
                  <div class="text-gray-900 text-xs font-bold">
                    7 Day Volume:
                  </div>
                  <div
                    class="bg-purple-500 text-white rounded-full px-3 py-1 font-bold"
                  >
                    {{ (collection.stats.vol_7d / 100000000).toPrecision(3) }}
                  </div>
                </div>
                <div class="">
                  <div class="text-gray-900 text-xs font-bold">
                    30 Day Volume:
                  </div>
                  <div
                    class="bg-pink-500 text-white rounded-full px-3 py-1 font-bold"
                  >
                    {{ (collection.stats.vol_30d / 100000000).toPrecision(3) }}
                  </div>
                </div>
                <div class="w-full">
                  <div class="text-gray-100 text-xs font-bold">
                    Floor Price:
                    {{ (collection.stats.floor / 100000000).toPrecision(3) }}
                  </div>
                  <div
                    class="bg-green-500 text-white rounded-full px-3 py-1 font-bold"
                  ></div>
                </div>
              </div>
              <div class="pt-6">
                <button
                  class="border-solid border-2 border-indigo-600 rounded-xl w-full font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-purple-800"
                  @click="goToMarket(collection)"
                >
                  <div
                    class="font-black w-full xl:inline text-gray-100"
                  >
                    BUY A {{ collection.name }}
                  </div>
                </button>
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
import Menu from "./../../../components/MenuComponent2.vue";
const filterWords = ["Zatto", "BSV", "ZAT", "Spin The", "COST", "METAMASTERS"];
export default {
  components: { Menu },
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
    console.log("Gettting Collections");
    this.topCollections = await getTop();
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
};
</script>

<style lang="scss" scoped></style>
