<template>
    <ul role="list" class="divide-y divide-indigo-200 text-left rounded-xl">
            <li v-for="message in sorted" :key="message" class="flex py-4 m-2 bg-gray-800 rounded-xl">
            <img class="h-10 w-10 rounded-full" :src="getProfilePic(message)" alt="" />
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-100">{{ message.MAP.paymail }}</p>
                <p class="text-sm text-gray-200">{{message.B.content }}</p>
            </div>
            </li>
        </ul>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
export default {
    setup (props) {
        const messages = ref([])
        const state = reactive({
            count: props.count,
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
                //"MAP.app": "bitchat",
                "MAP.channel": "pewnicorn-social-club"
                }
            },
            "limit": 10000
        }
        let url = 'https://b.map.sv/q/'

        // Attach API KEY as header
        let header = {
            // Replace with your API key
            headers: { key: '1MS56ewiH7MZsDQ1oN2buDXD8SBdFipp9D' }
        }
        let b64 = btoa(JSON.stringify(query))
        let response = await fetch(url + b64, header);
        let cs = await response.json();
        cs.c.forEach(element => {
            console.log(element);
            this.messages.push(element);
        });
    
        // let items = clean.c.concat(clean.u)
        // items.forEach((item) => {
        //    console.log(item)
        //    if(item !== undefined){
        //     this.messages.push(item)
        //    }
        //     console.log('B Content-Type:' + item.B['content-type'])


        // // Display all MAP keys and values
        // for (let key in item.MAP) {
        //     console.log(key + ': ' + item.MAP[key])
        // }

    },
    methods:{
        getProfilePic(entry){
            if(entry.MAP.paymail.includes('handcash')){
                return `https://cloud.handcash.io/v2/users/profilePicture/${entry.MAP.paymail.split("@")[0]}`
            } else if(entry.MAP.paymail.includes('relay')){
                return `https://bitpic.network/u/${entry.MAP.paymail}`
            }
        }
    },
    computed: {
        sorted(){
            let s = this.messages; 
            s.sort((a,b) => a.timestamp - b.timestamp > 0 ? 1 : -1)
            if(this.count >= s.length){return s}
            if(this.count < s.length)return s.slice(s.length - this.count, s.length);
            return s;
        }   
    },
    props:["count"]
}
</script>

<style lang="scss" scoped>

</style>