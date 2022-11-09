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
                  <form action="#" class="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div class="sm:flex">
                      <div class="min-w-0 flex-1">
                        <label for="email" class="sr-only">Handcash Handle</label>
                        <input id="email" type="email" placeholder="pewnicorn@handcash.io" class="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900" />
                      </div>
                      <div class="mt-3 sm:mt-0 sm:ml-3">
                        <button type="submit" class="block w-full rounded-md bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 py-3 px-4 font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900">NOTIFY ME</button>
                      </div>
                    </div>
                    <p class="mt-3 text-sm text-gray-300 sm:mt-4">Add your Handcash Handle to get announcement notifications. </p>
                  </form>
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
        <h1 class="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-indigo-300 via-purple-500 to-teal-500 bg-clip-text text-transparent">PLAY TO EARN</h1>
        <p class="mt-6 mx-auto max-w-3xl text-xl text-gray-100">Join us for Bingo Wednesdays 8PM NY Time </p>
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
</template>

<script>
import { reactive, toRefs } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/solid'
import { PhoneMissedCallIcon, NewspaperIcon, PhoneIcon } from '@heroicons/vue/outline'

const JoinSectionLinks = [
  {
    name: 'Bingo',
    href: '/bingo/cards/my-cards',
    description:
      `Be the first to connect 5 blocks to win a prize. Every Wednesday at 8pm NYC Time. `,
    icon: PhoneIcon,
  },
  {
    name: 'BlockLines',
    href: '/secret/games/tetris',
    description:
      'Shapes Fall. Use the shapes to complete a solid line of bloicks across the screen. Just Like Tetris.',
    icon: PhoneMissedCallIcon,
  },
  {
    name: 'Memzorizer',
    href: '/secret/games/memory',
    description:
      'Match 2 identical cards to win points. Match all the cards on screen to level up.',
    icon: NewspaperIcon,
  },
]
export default {
    components:{ ChevronRightIcon},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
            JoinSectionLinks
        }
    }
}
</script>

<style lang="scss" scoped>

</style>