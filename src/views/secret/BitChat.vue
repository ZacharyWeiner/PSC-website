<template>
    <div class="grid grid-cols-2">
        <div class="text-white col-span-1" v-for="item in messages" :key="item">
            {{item }}
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
export default {
    setup () {
        const messages = ref([])
        const state = reactive({
            count: 0,
        })
        return {
            ...toRefs(state), messages
        }
    },
    async mounted(){
        let query = {
            "v": 3,
            "q": {
                "find": {
                "MAP.app": "bitchat",
                }
            },
            "limit": 100
        }
        let url = 'https://b.map.sv/query/'

        // Attach API KEY as header
        let header = {
            // Replace with your API key
            headers: { key: '1MS56ewiH7MZsDQ1oN2buDXD8SBdFipp9D' }
        }
        let b64 = btoa(JSON.stringify(query))
        let response = await fetch(url + b64, header)
        let clean = await response.json() 
        console.log(response, clean);
        let items = clean.c.concat(clean.u)
        items.forEach((item) => {
           console.log(item)
           if(item !== undefined){
            this.messages.push(item)
           }
        //     console.log('B Content-Type:' + item.B['content-type'])


        // // Display all MAP keys and values
        // for (let key in item.MAP) {
        //     console.log(key + ': ' + item.MAP[key])
        // }

    })


        
    } 
}
</script>

<style lang="scss" scoped>

</style>