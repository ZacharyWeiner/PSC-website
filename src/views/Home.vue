<template>
 
  <div class="pt-20 m-1 rounded-xl">
    <!-- <div class="w-full rounded-xl cta flex p-2 ">
      <div class='w-3/4'>
     <h2 class="text-lg md:text-5xl font-bold text-white sm:text-3xl p-5">
        <span class=" text-black md:pt-12">Your digital passport<br> to the METAVERSE</span>
      </h2>
      <a href="https://relayx.com/market/GOP" class='m-2 p-2 text-xl  lg:px-20 lg:py-6 m-2 bg-purple-600 rounded-full text-white font-bold lg:text-2xl ' > Squat with us </a>
    </div>
    <div class='w-1/4'><img class="object-scale-down w-full pr-2" src="../assets/gopnik_cta.png" alt="gopnik"></div>
    </div> -->
    
    <img @click="navigateTo('https://gopnikz.info')" class='hidden md:inline md:object-cover md:w-full md:max-h-96 md:rounded-xl ' src="https://pewparty.com/wp-content/uploads/2021/12/GopHead2Thin.png" />
    <img @click="navigateTo('https://gopnikz.info')" class='object-cover w-full max-h-96 rounded-xl xs:inline md:hidden' src="https://pewparty.com/wp-content/uploads/2021/12/GopHead2.png" />
  </div>

  <div class="break1 mt-8"></div>
  <div class='grid grid-cols-1 lg:grid-cols-4  max-h-screen'>
    <div class='col-span-3 p-2 m-2'>
      <Proposals />
        <button 
          class="p-2 m-2 rounded-full text-xl font-bold tracking-widest " 
        :class="moreProposalsButtonClass"
          v-on:click="goToProps"   >  
        {{moreProposalsButtonText}}
      </button>
    </div>

    <div class='flex-col col-span-1 lg:col-span-1 p-2 m-2'>
      <div class="">
          <div class="mb-20 w-full min-w-xl mx-auto xl:mb-0">
            <div class="w-full justify-center lg:h-auto p-1">
              <div class="flex items-center justify-center mb-5">
                <div> <img class='h-5 mx-auto' src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png"/></div>
                <div class="font-bold text-2xl text-white uppercase tracking-2xl"> Trollbox</div>
              </div>
              <div class="rounded-xl ring-2 ring-gray-300" >
                <div class=" p-2  overflow-y-scroll" style='max-height:600px;'>
                  <Messages :isTrollbox="true" />
                  <div ref="bottom"></div>
                </div>
                <div v-if='true' class="w-full bg-white rounded-b-lg ">
                  <form  @submit.prevent="send('Public')" class="w-full text-lg flex ">
                      <input class='w-full rounded-2xl' rows="2" v-model="message" placeholder="type to chad" :disabled="!canAccess"  required>
                      <button type="submit" >
                          <SendIcon></SendIcon>
                      </button>
                  </form>
                </div>        
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <div class="break3 pt-10 mb-4"></div>
</template>


<script>

import {ref} from 'vue'
import SendIcon from './../components/SendIcon.vue'
import Proposals from '@/components/Proposals.vue'
import Messages from '@/components/Messages.vue'
import { useRun } from '../services/wallet' 
import {useChat} from './../services/firebase'
import {useStore} from 'vuex'


export default {
  async setup() {
   
    const { isLogin, canAccess, setJigs } = useRun()
    let store = useStore()
     const {sendMessage } = useChat(store.state.relayx_handle, store.state.user_address)
    store.commit('setSelectedProposalId', null);
    const message = ref('')
    await setJigs();
    return { isLogin, store, message, canAccess, sendMessage }
  },
  name: 'Home',
  components: { Proposals, Messages , SendIcon,},
  computed: {
    moreProposalsButtonClass() {
      if (this.isLogin) {
        return  'bg-purple-800 text-white '
      }
      return 'bg-gray-400 text-gray-700'
    },
    moreProposalsButtonText() {
      if (this.isLogin) {

        return 'See more proposals'
      }
      return 'Connect to see more'

    }
  },
  methods: {
    goToProps() {
      this.$router.push('/props')
    },
    navigateTo(url){
       window.location.href = url;
    },
    send(propCode) {
      if(this.$store.state.relayx_handle !== ""){
          console.log('Sending Started')
          this.sendMessage(this.message, propCode, this.$store.state.gopnikId)
          console.log('Sending Complete')
          this.message= ''
          //bottom.value?.scrollIntoView({ behavior: 'smooth' })
      } else{
          alert('you are not logged in')
      }
  }
}
}
</script>

<style>

.break1 {
  height: 60px;
  background: url('../assets/break.png') center top no-repeat ;
  background-size: cover;

}

.break2 {
  height: 60px;
  background: url('../assets/break2.png') center top no-repeat ;
  background-size: cover;

}

.break3 {
  height: 60px;
  background: url('../assets/break3.png') center top no-repeat ;
  background-size: cover;

}

.cta {
  background-color: #3AFFFD;
}

</style>
