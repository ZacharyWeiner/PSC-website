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
        Pre Order Confirmation
      </div>
      <div class="flex w-full">
        <div class="flex w-full mx-4">
          <div>
            <label class="mx-4 text-lg">
              What is Your Relay Handle or Address?</label
            >
            <br />
            <input class="mx-4 rounded-xl w-full" v-model="relayhandle" />
            <button
              @click="search"
              type="button"
              class="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Find My Orders
            </button>
          </div>
        </div>
        <div class="flex w-full"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Run from "run-sdk";
export default {
  methods: {
    async search() {
      let _run = new Run({
        trust: "*",
        timeout: 1000000,
        logger: console,
        owner: "1GqbnK9xVK5HuWNAtyVYm3AmAdempjct3E",
      });
      await _run.inventory.sync();
      let CoinsClass = await _run.load(
        "1a0efa033fb9552f022e1a2892c60160e18394dfa41a232b409324bd65eb656c_o2"
      );
      console.log("BAMS decimals:", CoinsClass.decimals);
      this.decimals = CoinsClass.decimals;
      this.tokens = _run.inventory.jigs.filter(
        (jig) => jig instanceof CoinsClass
      );
      console.log("unsepnt output count:", this.tokens.length);
      this.purseBalance = await _run.purse.balance();
    },
  },
};
</script>
