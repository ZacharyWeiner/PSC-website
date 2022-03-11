<template>
  <div
    class="h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
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
    <div
      class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center text-xl p-4 md:text-4xl md:px-8 font-extrabold"
    >
      Pre Order Soon™
    </div>
    <div class="h-auto"></div>
    <div class="w-full items-justify-center px-2">
      <div
        class="p-1 w-full bg-gradient-to-r from-yellow-400 via-pink-200 to-pink-400 rounded"
      >
        <div class="m-0.5 p-4 bg-black rounded md:flex text-lg">
          <div class="w-full">
            <img
              class="w-full rounded-t-xl"
              src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif"
            />
            <div class='mt-2 '> </div>
              
          </div>
          <div class="w-full py-2 lg:py-8">
            <div class="">
              <span
                class="text-2xl md:text-5xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
              >
                 LIVE MINT
              </span>
            </div>
            <div> Begins @ 1PM EST March 11, 2022 </div>
            <div class="rounded-b-xl text-xl font-bold pt-24">
              <div>
                <router-link to="/mint"  class="p-2 m-2 px-12  bg-gradient-to-r from-yellow-500 through-yellow-900 to-yellow-700 rounded-xl"> MINT NOW </router-link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="p-1 w-full">
        <div class="m-1 p-4 bg-gray-900 rounded md:flex">
          <div class="w-auto">
            <img
              class="mx-auto max-h-32 md:max-h-64 md:ml-10 md:mt-16"
              src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/CartoonPoopToken.png"
            />
          </div>
          <div class="w-1/5"></div>
          <div class="text-3xl text-center w-full md:text-left">
            <div class="flex">
              <div class="text-2xl md:text-left lg:text-4xl">What Is</div>
              <div
                class="pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent"
              >
                $POO?
              </div>
            </div>
            <div class="pt-3 text-center">
              <p
                class="text-lg pb-4 font-semibold md:text-left lg:text-2xl underline"
              >
                Pewnicorn Organization &amp; Operational Token
              </p>
              <p class="text-lg text-left">
                Like Horse Shit, But ✨
                <span class="text-yellow-400 font-extrabold"> Magical </span> ✨
                <br />
                <span class="text-yellow-400"> $POO </span> lubes up the
                Pewconomy, powering everything you can do in the Pewniverse. The
                more 'Corns you have in your stable, the more
                <span class="text-yellow-400"> $POO </span> you'll stack. <br />
                Drop <span class="text-yellow-400"> $POO </span> to vote in the
                DAO, get early access to merch drops & JPEGs, take a 'Corn from
                the stable, or just shit in random in a random n0obs wallet.
                <br />
                <span class="text-yellow-400"> $POO </span> can ALWAYS be used
                to add 'Corns to your stable.<br />
                <br />
                <a
                  class="text-2xl"
                  target="_blank"
                  href="https://www.relayx.com/market/POO"
                >
                  <div
                    class="bg-gradient-to-r from-blue-400 through-indigo-600 to-purple-600 text-white rounded p-1 m-1 w-1/2 font-bold"
                  >
                    BUY <span class="text-yellow-400"> $POO </span> NOW
                  </div>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full items-justify-center p-2 md:flex">
      <div
        class="p-1 w-full bg-gradient-to-r from-yellow-400 via-pink-200 to-pink-400 rounded"
      >
        <div class="m-1 p-4 bg-black rounded">
          <div class="text-2xl pb-2">For Updates, Giveaways & More:</div>
          <div
            class="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600 text-2xl p-2 rounded"
          >
            <a
              target="_blank"
              norel
              noopener
              href="https://discord.gg/vBwd3dsNhE"
            >
              Join The Discord Server</a
            >
          </div>
        </div>
      </div>
      <div class="text-black">.</div>
      <div
        class="p-1 w-full bg-gradient-to-r from-pink-400 via-pink-200 to-yellow-400 rounded"
      >
        <div class="m-1 p-4 bg-black rounded">
          <div class="text-2xl pb-2">PewPaper</div>
          <div
            class="text-2xl p-2 rounded bg-gradient-to-b from-yellow-400 via-yellow-400 to-yellow-700 bg-clip-text text-transparent md:text-3xl"
          >
            <a target="_blank" norel noopener href="#"> Coming Soon™</a>
          </div>
        </div>
      </div>
    </div>
    <div class="h-36"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
// import Run from "run-sdk";
export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
  async mounted(){
    if(!window.location.href.includes('localhost') && window.location.protocol !== 'https:'){
      window.location.href = "https://www.pewnicornsocial.club/";
    }
    // let _run = new Run({
    //     trust: "*",
    //     timeout: 1000000,
    //     logger: console,
    //     owner: "1GqbnK9xVK5HuWNAtyVYm3AmAdempjct3E",
    //   });
    //   await _run.inventory.sync();
  }
};
</script>

<style lang="scss" scoped></style>
