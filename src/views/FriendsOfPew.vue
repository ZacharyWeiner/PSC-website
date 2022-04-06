<template>
     <div
    class="h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
  >
    <div
      class="h-36 bg-contain bg-center md:h-64"
      style="
        background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
      "
    ></div>
    <div class="grid grid-cols-1 md:grid-cols-2 w-full">
         
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/gopniks" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry.relayx.com/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o1"> </div> 
            <div>  Gopniks</div>
             </router-link>
            </div> 
            
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/popsicle-sticks" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry.relayx.com/fd0ffe5908cf88293ecd4dd781e9af1aac8bab9e0ba53867fbcbde07b80a309a_o1"> </div> 
            <div>   Popsicles </div>
            
            </router-link>
        </div>
    </div>
        <router-link to="/quokka-orders"> Quokkas (coming soon) </router-link>
        
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>