<template>
     <div
    class="h-full bg-black w-full text-white flex-col items-center overflow-y-scroll"
  >
  <Menu />
    <div
      class="h-36 bg-contain bg-center md:h-64"
      style="
        background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
      "
    ></div>
    <div class="grid grid-cols-1 md:grid-cols-3 w-full">
         
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/gopniks" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry.relayx.com/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o1"> </div> 
            <div>  Gopniks</div>
             </router-link>
            </div> 
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/wokka-quokkas" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry.relayx.com/84fdb5121bcb556682e872c98f5bad0f7109807d9395b4c2b087ab401c63ee5d_o1"> </div> 
            <div>   Wokka Quokkas </div>
            
            </router-link>
        </div>
          <!-- <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/stick-doodz" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry2.relayx.com/f181e9e9883bc2dfb233b10e75a378f06715e25da5163d423d8f6d07a843bcdd_o1"> </div> 
            <div>Stick Doodz </div>
            </router-link>
        </div> -->
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/popsicle-sticks" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry.relayx.com/fd0ffe5908cf88293ecd4dd781e9af1aac8bab9e0ba53867fbcbde07b80a309a_o1"> </div> 
            <div>   Popsicles </div>
            
            </router-link>
        </div>
        <div class="col-span-1 flex-1 p-2 m-2 bg-gray-900 rounded"> 
            <router-link to="/friends/savages" class='text-3xl'>
            <div> <img class="max-w-sm mx-auto rounded-full" src="https://berry2.relayx.com/6d589398a0b4e83c3100c9b28afa2239be2d21b9080a4c4bcf05767805d637f5_o1"> </div> 
            <div>Sabertooth Savages </div>
            </router-link>
        </div>
        
    </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../components/Menu.vue"
export default {
    components:{Menu },
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