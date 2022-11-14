<template>
    <!-- Hero --> 
<div class="relative overflow-hidden">
    <main>
      <div class="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 ">
        <div class="mx-auto max-w-7xl lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8">
            <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div class="lg:py-24">
                <router-link to="/treasury" class="inline-flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
                  <span class="rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">Buy With $POO</span>
                  <span class="ml-4 text-sm">Visit The Treasury</span>
                  <ChevronRightIcon class="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </router-link>
                <h1 class="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span class="block  bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent">PEWNICORN</span>
                  <span class="block ">SOCIAL CLUB</span>
                </h1>
                <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">The Best Damn Social Club On Bitcoin.</p>
                <div class="mt-10 sm:mt-12">
                  <div action="#" class="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div class="sm:flex">
                      <div class="min-w-0 flex-1">
                        <label for="email" class="sr-only">Handcash Handle</label>
                        <input v-model="handcashHandle" id="email" type="email" placeholder="pewnicorn@handcash.io" class="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900" />
                      </div>
                      <div class="mt-3 sm:mt-0 sm:ml-3">
                        <button @click="addHandcash" class="block w-full rounded-md bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900">NOTIFY ME</button>
                      </div>
                    </div>
                    <p class="mt-3 text-sm text-gray-300 sm:mt-4">Add your Handcash Handle to get announcement notifications. </p>
                    <p v-if="showThankYou" class="mt-3 text-sm text-yellow-300 sm:mt-4">You've been added to our notifications list. Thanks! </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorn+class+cover.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- More main page content here... -->
    </main>
</div>
<!-- End Hero -->
<!-- Join The Club --> 
<div class="bg-white">
    <!-- Header -->
    <div class="relative bg-gray-800 pb-32">
      <div class="absolute inset-0">
        <img class="h-full w-full object-cover" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/BingoCard.png" alt="" />
        <div class="absolute inset-0 bg-gray-900 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div class="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-indigo-300 via-purple-500 to-teal-500 bg-clip-text text-transparent">PLAY TO CLAIM</h1>
        <p class="mt-6 mx-auto max-w-3xl text-xl text-gray-100">Join us for <span class="font-bold bg-gradient-to-r from-yellow-300 to-yellow-600  bg-clip-text text-transparent">Bingo Wednesdays 8PM </span> NY Time </p>
        <p class="mt-1 mx-auto max-w-3xl text-xl text-gray-100">Play arcade games for a leaderboard spot whenever you want.</p>
      </div>
    </div>

    <!-- Overlapping cards -->
    <section class="relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
      <h2 class="sr-only" id="contact-heading">Contact us</h2>
      <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
        <div v-for="link in JoinSectionLinks" :key="link.name" class="flex flex-col rounded-2xl bg-white shadow-xl">
          <div class="relative flex-1  pt-16 pb-8 md:px-8">
            <!-- <div class="top-0 inline-block -translate-y-1/2 transform rounded-xl bg-indigo-600 p-5 shadow-lg">
              <component :is="link.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div> -->
            <img :src="link.image" class="mx-auto h-16 w-12 md:h-32 md:w-20" />
            <h3 class="text-xl font-medium text-gray-900">{{ link.name }}</h3>
            <p class="mt-4 text-base text-gray-500">{{ link.description }}</p>
          </div>
          <div class="rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
            <router-link :to="link.href" class="text-base font-medium text-white font-bold  hover:text-indigo-600">PLAY<span aria-hidden="true"> &rarr;</span></router-link>
          </div>
        </div>
      </div>
    </section>
</div>
  <!-- End Join the club -->
  <!-- Ply Bingo With Us-->
  <div class="relative overflow-hidden bg-gradient-to-r from-purple-500 via-teal-500 to-blue-500">
    <div class="mx-auto max-w-7xl">
      <div class="relative z-10 bg-gray-800 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
        <svg class="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <main class="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left pt-4">
            <h1 class="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
              <span class="block xl:inline ">Play Bingo</span>
              {{ ' ' }}
              <span class="block text-indigo-600 xl:inline">With Us</span>
            </h1>
            <p class="mt-3 text-base text-gray-100 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">Play every wednesday to win $POO, Pewnicorns, and other NFTs from <a href="https://relayx.com" target="_blank">Relay X</a>  <a href="https://rarecandy.io" target="_blank">RareCandy</a> and <a href="https://twetch.com" target="_blank">Twetch</a></p>
            <p class="mt-3 text-base text-gray-100 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">To get a card just ask <a href="https://twitter.com/iampewnicorn" target="_blank" class="text-teal-500"> @iampewnicorn </a> nicely on Twitter. </p>
            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <router-link to="/bingo/cards/my-cards" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">View Your Cards</router-link>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a target="blank" href="https://www.twitter.com/iampewnicorn" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">Get Cards</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/BingoCard.png" alt="" />
    </div>
  </div>
  <!-- End Play Bingo -->
    <!-- Relayx Wrapper -->
    <div class="relative overflow-hidden bg-white pt-16 pb-32">
    <div class="mt-24">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
          <div>
            <div>
            </div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 md:text-right">RELAYX DASHBOARD</h2>
              <p class="mt-4 text-lg text-gray-500 md:text-right">THE BEST VIEW INTO WHATS HOT ON RELAYX </p>
              <div class="mt-6 md:text-right">
                <router-link to="/secret/relay-wrapper/home" class="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">CHECK IT OUT</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
          <div class="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/relaydashboard.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Relayx Wrapper-->
  
  <!-- Top 5 Relay Coins-->
  <TopFiveRelayCoins></TopFiveRelayCoins>
  <!-- End Top % Relay Coins -->
    <!-- POO CLIAMS-->
    <div class="relative py-6 pb-6 bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700">
      <div class="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img class="h-full w-full object-cover rounded" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/Poo-transparent.png" alt="" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div class="md:ml-auto md:w-1/2 md:pl-10">
          <h2 class="text-lg font-semibold text-gray-300">WEEKLY POO CLAIMS</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">CLAIM YOUR POO </p>
          <p class="mt-3 text-lg text-gray-300">Every Pewnicorn in your stable is eligible for weekly cliams. The amount of $POO you'll recieve is based on the number of NFTs you have in your wallet (not for sale) and their rank.</p>
          <p class="mt-3 text-lg text-gray-300">WEEKLY BONUSES FOR SPECIFIC TRAITS TOO!</p>
          <div class="mt-8">
            <div class="inline-flex rounded-md shadow">
              <router-link to="/claims" class=" bg-gradient-to-r from-purple-600 via-red-500 to-red-500 inline-flex items-center justify-center rounded-md px-5 py-3 text-base font-medium text-gray-100 hover:bg-gray-50">
                CLAIM NOW
                <CurrencyDollarIcon class="-mr-1 ml-3 h-5 w-5 text-gray-100" aria-hidden="true" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- END POO CLAIMS-->
  <!-- Ape & Frog Floor -->
  <div class="relative overflow-hidden bg-white pt-16 pb-32">
    <div class="relative pb-8">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
          <div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 md:text-left">Astro Apes Floor Tool</h2>
              <p class="mt-4 text-lg text-gray-500 text-left">We scour all the candies for the floors of AstroApes, Slurp Juices, Lab Monkes & Special Forces</p>
              <div class="mt-6 md:text-left">
                <router-link to="/secret/rare-candy/ape-floor" class="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">SEE THE APES</router-link>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-200 pt-6">
            <blockquote>
              <!-- <div>
                <p class="text-base text-gray-500">&ldquo;Cras velit quis eros eget rhoncus lacus ultrices sed diam. Sit orci risus aenean curabitur donec aliquet. Mi venenatis in euismod ut.&rdquo;</p>
              </div> -->
              <footer class="mt-3">
                <!-- <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <img class="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
                  </div>
                  <div class="text-base font-medium text-gray-700">Marcia Hill, Digital Marketing Manager</div>
                </div> -->
              </footer>
            </blockquote>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div class="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/Apes+Floor.png" alt="Inbox user interface" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-24">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
          <div>
            <div>
            </div>
            <div class="mt-6">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 md:text-right">Frog Cartel Floor Tool</h2>
              <p class="mt-4 text-lg text-gray-500 md:text-right">We scour all the candies for the floors of Frog Cartel, Vaxx, Graveyard Frogs & APUs</p>
              <div class="mt-6 md:text-right">
                <router-link to="/secret/rare-candy/frog-floor" class="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">SEE THE FROGS</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
          <div class="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/FrogCartelTool.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Ape & Frog Floor-->
  <!-- Concert-->
  <div class="bg-black">
            <div class="mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div class="text-left">
                    <h2 class="text-base font-semibold text-indigo-600 uppercase tracking-wide">Episode 1 Replay</h2>
                    <p class="mt-2 text-3xl font-extrabold text-gray-200">Pewnicorn Concert Series</p>
                    <p class="mt-2 text-lg text-gray-500">Replay: Live Event March 18th 2020.</p>
                    <p class='mt-4 text-gray-300 uppercase'></p> 
                    <h2 class="text-base font-semibold text-indigo-500 uppercase tracking-wide">Artists Contact Us On Twitter:</h2>
                    <a class="text-base font-semibold text-indigo-300 uppercase tracking-wide" href="https://www.twitter.com/iampewnicorn" target="_blank" rerel noopener > @iAmPewnicorn </a>
                </div>
                <div class="lg:mt-0 lg:col-span-2">
                    <iframe width="100%" height="500" src="https://www.youtube.com/embed/R4ECXxyhX5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
  <!-- End COncert -->
  <Footer />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { PhoneMissedCallIcon, NewspaperIcon, PhoneIcon, CurrencyDollarIcon } from '@heroicons/vue/outline'
import TopFiveRelayCoins from '../components/TopFiveRelayCoins.vue'
import { useNotificationRequests } from '../services/firebase.js';
import Footer from "./../components/Footer.vue"
const JoinSectionLinks = [
  {
    name: 'Bingo',
    href: '/bingo/cards/my-cards',
    image: 'https://slavettes-layers.s3.amazonaws.com/pewnicorns/BingoCard.png',
    description:
      `Be the first to connect 5 blocks to win a prize. Every Wednesday at 8pm NYC Time. `,
    icon: PhoneIcon,
  },
  {
    name: 'BlockLines',
    href: '/secret/games/tetris',
    image: 'https://slavettes-layers.s3.amazonaws.com/pewnicorns/tetris.png',
    description:
      'Shapes Fall. Use the shapes to complete a solid line of bloicks across the screen. Just Like Tetris.',
    icon: PhoneMissedCallIcon,
  },
  {
    name: 'Memzorizer',
    href: '/secret/games/memory',
    image: 'https://slavettes-layers.s3.amazonaws.com/pewnicorns/memory.png',
    description:
      'Match 2 identical cards to win points. Match all the cards on screen to level up.',
    icon: NewspaperIcon,
  },
]
export default {
    components:{Footer, ChevronRightIcon, TopFiveRelayCoins, CurrencyDollarIcon },
    setup () {
      let {allRequests} = useNotificationRequests();
        const state = reactive({
            count: 0,
            handcashHandle: "",
            showThankYou: false,
        })
    
        return {
            ...toRefs(state),
            JoinSectionLinks,
            allRequests
        }
    },
    async mounted(){
    },
    methods:{
      async addHandcash(){
        try{
        console.log("Adding", this.handcashHandle)
        let {newNotificationRequest} = useNotificationRequests();
        newNotificationRequest(this.handcashHandle)
        this.showThankYou = true
        }
        catch(err){
          alert(err)
        }
      }
    }
}
</script>

<style lang="scss" scoped>

</style>