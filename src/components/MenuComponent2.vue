
Tailwind UI
Components
Templates
New
Documentation
Headers
Marketing
Elements
Centered with bottom border

Requires JS

<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Popover class="relative bg-white z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Pewnicorn Social Club NFT Community</span>
            <img class="h-8 w-auto sm:h-10 rounded-full" src="https://berry2.relayx.com/feca781862b91f4957fdf38bbce3f52c3f898e46d38c2c30785f79b893fa28d7" alt="" />
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <!-- Buy & Sell --> 
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
              <span>Buy &amp; Sell</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <router-link v-for="item in exchange" :key="item.name" :to="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                      <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <div class="ml-4">
                        <p class="text-left text-base font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 text-left">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                  <div class="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                    <div v-for="item in callsToAction" :key="item.name" class="flow-root">
                      <router-link :to="item.href" class="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                        <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                        <span class="ml-3">{{ item.name }}</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- End Buy & Sell --> 
          <router-link to="/my-bag" class="text-base font-medium text-gray-500 hover:text-gray-900"> Holdings </router-link>
          <router-link to="/claims" class="text-base font-medium text-gray-500 hover:text-gray-900"> Earn </router-link>
          <router-link to="/bingo/cards/my-cards" class="text-base font-medium text-gray-500 hover:text-gray-900"> Bingo </router-link>
          <!-- Begin Members Only Links --> 
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
              <span>Members Only</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <router-link v-for="item in membersOnly" :key="item.name" :to="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                      <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900 text-left">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 text-left">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- End Members Only Links --> 
          <!-- Begin More Links --> 
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
              <span>More</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    <router-link v-for="item in more" :key="item.name" :to="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                      <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900 text-left">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 text-left">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                  <div class="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                    <div>
                      <h3 class="text-sm tracking-wide font-medium text-gray-500 uppercase">Friends</h3>
                      <ul role="list" class="mt-4 space-y-4">
                        <li v-for="friend in friends" :key="friend.name" class="text-base truncate">
                          <router-link :to="friend.href" class="font-medium text-gray-900 hover:text-gray-700">
                            {{ friend.name }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="mt-5 text-sm">
                      <a href="https://swap.relayx.com" class="font-medium text-indigo-600 hover:text-indigo-500"> Buy $POO <span aria-hidden="true">&rarr;</span></a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <!-- End More Links --> 
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div v-if="isLogin" class="flex-shrink-0 text-gray-700 px-1"> <span class='text-xs'>$</span> {{relayUser}}</div>
          <div v-if="!isLogin">
              <button @click="login" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign In </button>
            </div>
            <div v-else>
              <button @click="logout" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"> Sign Out </button>
            </div>
        </div>
      </div>
    </div>
    <!-- Mobile Menu --> 
    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto rounded-full" src="https://berry2.relayx.com/feca781862b91f4957fdf38bbce3f52c3f898e46d38c2c30785f79b893fa28d7" alt="Workflow" />
              </div>
              <div class="-mr-2">
                <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <router-link v-for="item in exchange" :key="item.name" :to="item.href" class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                  <component :is="item.icon" class="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ item.name }}
                  </span>
                </router-link>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <router-link to="/my-bag" class="text-base font-medium text-gray-900 hover:text-gray-700"> Holdings </router-link>

              <router-link to="/claims" class="text-base font-medium text-gray-900 hover:text-gray-700"> Earn </router-link>
              <router-link to="/bingo/cards/my-cards" class="text-base font-medium text-gray-900 hover:text-gray-700"> Bingo </router-link>
              <router-link v-for="item in more" :key="item.name" :to="item.href" class="text-base font-medium text-gray-900 hover:text-gray-700">
                {{ item.name }}
              </router-link>
            </div>
            <div v-if="isLogin" class="flex-shrink-0 text-gray-700 px-1"> <span class='text-xs'>$</span> {{relayUser}}</div>
            <div v-if="!isLogin">
              <button @click="login" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign In </button>
            </div>
            <div v-else>
              <button @click="logout" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"> Sign Out </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
    <!-- End Mobile Menu --> 
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  BookmarkAltIcon,
  //CalendarIcon,
  //ChartBarIcon,
  //CursorClickIcon,
  MenuIcon,
  //PhoneIcon,
  //PlayIcon,
  CashIcon,
  CurrencyDollarIcon,
  HandIcon,
  //LibraryIcon,
  PuzzleIcon,
  //RefreshIcon,
  //ShieldCheckIcon,
  ShoppingBagIcon,
  //SupportIcon,
  //ViewGridIcon,
  XIcon,
  RefreshIcon,
  EmojiHappyIcon,
} from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import {useRun} from "./../services/wallet.js"

const exchange = [


  {
    name: 'Buy With BSV',
    description: 'See all the pewnicorns for sale on the BSV market.',
    href: '/relay-orders',
    icon: CashIcon,
  },
  {
    name: 'Buy With $POO',
    description: 'Buy from the Pewnicorn Treasury using $POO',
    href: '/treasury',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Trade For $POO',
    description: 'Trade Your Pewnicorn back to the Treasury in excange for $POO',
    href: '/my-bag',
    icon: RefreshIcon,
  },
  {
    name: 'Bingo Cards',
    description: "Coming Soon ",
    href: '#',
    icon: PuzzleIcon,
  },
//   {
//     name: 'Automations',
//     description: 'Build strategic funnels that will drive your customers to convert',
//     href: '#',
//     icon: RefreshIcon,
//   },
]
const membersOnly = [


  { name: 'Claimables', href: '/claims', icon: ShoppingBagIcon },
  { name: 'Member Exclusives', href: '#', icon: BookmarkAltIcon },
]

const more = [


  {
    name: 'Votes',
    description: 'Vote On Issues Up For Debate',
    href: '/votes',
    icon: HandIcon,
  },
  {
    name: 'Friends',
    description: 'Check out projects from Pewnicorns Friends',
    href: '/friends',
    icon: EmojiHappyIcon,
  },
//   {
//     name: 'Events',
//     description: 'See what meet-ups and other events we might be planning near you.',
//     href: '#',
//     icon: CalendarIcon,
//   },
//   { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]

const friends = [


  { id: 1, name: 'Gopniks', href: '/friends/gopniks' },
  { id: 2, name: 'Wokka Quokkas', href: '/friends/wokka-quokkas' },
  { id: 3, name: 'Sabertooth Savages', href: '/friends/savages' },
  { id: 3, name: 'Stick Doodz', href: '/friends/stick-doodz' },
  { id: 3, name: 'Popsicle Sticks by Mageta', href: '/friends/popsicle-sticks' },
  { id: 3, name: 'Generative Moose by Mageta', href: '/friends/moose' },
]
export default {
    components:{Popover, PopoverButton, PopoverGroup, PopoverPanel, MenuIcon, XIcon, ChevronDownIcon},
    setup(){
        let {isLogin, signIn, signOut} = useRun()
    let user = {
        name: 'logged out',
        email: 'loggedout@relayx.io',
        imageUrl:
            '',
        }
        return {
            exchange, 
            more, 
            friends, 
            membersOnly,
            isLogin, 
            signIn,
            signOut,
            user,}
    },
    methods: {
      login() {
          this.signIn()
      },
      logout() {
          console.log("logging out")
          this.signOut(this.$store)
      }
  },
  computed:{
      firstImage(){
          if(this.isLogin){
              if(this.$store.state.user_jigs.length > 0){
                 console.log(this.$store.state.user_jigs[0].berry.txid)
                 return "https://berry.relayx.com/" + this.$store.state.user_jigs[0].berry.txid
              }
          }
          return "";
      },
      handle(){
          if(this.isLogin){return this.$store.state.relayx_handle}
          return ""
      },
      relayUser(){
        return this.$store.state.relayx_handle
      }
  },
}
</script>
