<template>
  <div class="w-full p-20">
    <div v-on:click="goBack()" class=" text-left mb-10"> 
        <button class="font-bold px-6 py-3 border-4 border-white text-white rounded-lg"> Back</button>
      </div>
    <Proposals />
  </div>
</template>

<script>
import Proposals from '@/components/Proposals.vue'

export default {
  name: 'Props',
  components: {
    Proposals
  },
  methods:{
    goBack(){
      this.$router.push('/');
    },
  }
  
}
</script>