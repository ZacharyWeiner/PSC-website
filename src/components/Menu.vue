<template>
<div> 
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="-ml-2 mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div v-if="showGif" class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" alt="Workflow" />
            <img class="hidden lg:block h-8 w-auto" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/corns-gif-2.gif" alt="Workflow" />
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div v-if="isLogin" class="flex-shrink-0 bg-gray-900 text-white px-1"> <span class='text-xs'>$</span> {{handle}}</div>
          <div class="flex-shrink-0">
            <button @click="isLogin ? logout() : login()" type="button" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              <span v-if="isLogin">Logout</span>
              <span v-else>Sign In</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
            <!-- <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button> -->

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="firstImage" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <router-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="firstImage" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{ user.name }}</div>
            <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
          </div>
          <!-- <button type="button" class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->
        </div>
        <div class="mt-3 px-2 space-y-1 sm:px-3">
          <router-link v-for="item in userNavigation" :key="item.name" :to="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">{{ item.name }}</router-link>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
  </div> 
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { 
    //BellIcon, 
    MenuIcon, XIcon } from '@heroicons/vue/outline'
// import { PlusSmIcon } from '@heroicons/vue/solid'
//import { useStore } from "vuex";
import {useRun} from "./../services/wallet.js"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'My Bag', href: '/my-bag', current: false },
  { name: 'Marketplace', href: '/relay-orders', current: false },
  { name: 'Treasury', href: '/treasury', current: false },
  { name: 'Claim', href: '/claims', current: false },
  { name: 'Friends', href: '/friends', current: false },
  { name: 'Votes', href: '/votes', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/my-bag' },
  { name: 'Sign out', href: '/logout' },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    //BellIcon,
    MenuIcon,
    //PlusSmIcon,
    XIcon,
  },
  setup() {
    let {isLogin, signIn, signOut} = useRun()
    let user = {
        name: 'logged out',
        email: 'loggedout@relayx.io',
        imageUrl:
            '',
        }
    return {
      isLogin, 
      signIn,
      signOut,
      user,
      navigation,
      userNavigation,
    }
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
      }
  },
  props:["showGif"]
}
</script>