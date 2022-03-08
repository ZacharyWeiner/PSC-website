<template>
    <div class="">
        <span class="ml-12 text-xs gray-500" v-if="!sender">{{ name }}</span>
        <div class="flex" :class="sender ? 'flex-row-reverse' : '' ">
            <div class="p-1 m-1">
                <avatar :src="imageSource(gopnikId)" />
            </div>
            <div id="Message-container" class="text-left p-2  mx-2 m-1 rounded-xl text-white w-4/5" :class="sender ? 'bg-purple-500 rounded-tr-none text-right' : 'rounded-tl-none bg-teal-400' ">
                
                <span class='text-xs text-gray-600'> {{name}} </span>
                <slot/> 
                
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue'
import defaultGopnik from '../assets/gopnick.png'

export default {
    components:{ Avatar },
    props: {
        name: { type: String, default: '' },
        sender: { type:Boolean, default: false },
        gopnikId: { type:Number, default: 0 },
    },
    methods:{
        imageSource(gopnikId){
            console.log("Gop Id",  gopnikId)
            if(!gopnikId || gopnikId === ''){return defaultGopnik}
            else {return 'https://pewparty.com/wp-content/uploads/2021/12/' + gopnikId.toString() + '.jpeg';}
        },
    }
}
</script>