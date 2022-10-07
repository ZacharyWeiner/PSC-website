<template>
    <div class="h-screen mx-4 bg-gray-900 overscroll-none">
        <Menu></Menu>
        <div class="grid grid-cols-7 p-10 bg-gray-700 my-2 rounded-xl max-h-32"> 
            <textarea v-model="message" placeholder="type your message here.." class="max-h-12 rounded-xl p-1 m-1 col-span-6 bg-gray-100" ></textarea>
            <div class="w-full col-span-1 pl-1 m-1 "><button @click="sendMessage" class="max-h-12 bg-gradient-to-r from-blue-500 to-purple-500 w-full rounded-xl"> <PaperAirplaneIcon class=" mx-auto max-h-12 text-gray-100" aria-hidden="true" /></button></div>
        </div>
        <div class="h-screen overflow-y-scroll">
            <ul role="list" class="divide-y divide-teal-200 text-left rounded-xl">
                <li v-for="message in sorted" :key="message" class="flex py-4 m-2 bg-gray-800 rounded-xl">
                <img class="h-10 w-10 lg:h-12 lg:w-12 rounded-full" :src="getProfilePic(message)" alt="" />
                <div class="mx-3 px-1 w-full bg-gray-700 rounded-xl">
                    <p class="text-sm font-bold text-gray-100 underline pb-1">{{ message.MAP.paymail }}</p>
                    <p class="text-sm text-gray-100  w-full rounded-xl">{{message.B.content }}</p>
                    <p class="text-xs text-gray-500"> {{new Date(message.timestamp).toString()}}</p>
                </div>
                </li>
            </ul>
        </div>    
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import bops from "bops"
import Menu from "./../../components/MenuComponent2.vue";
import { PaperAirplaneIcon } from '@heroicons/vue/outline'
var socket;
export default {
    components: {Menu, PaperAirplaneIcon},
    setup () {
        const message = ref('');
        const messages = ref([])
        const state = reactive({
            count: 0,
        })

        return {
            ...toRefs(state), messages, socket, message 
        }
    },
    async mounted(){
        let query = {
            "v": 3,
            "q": {
                "find": {
                //"MAP.app": "bitchatnitro.com",
                "MAP.channel": "pewnicorn-social-club"
                },
                "sort":{
                    "timestamp": -1
                },
            "limit": 1000
            },
        }
        // let url = 'https://b.map.sv/q/'

        // // Attach API KEY as header
        // let header = {
        //     // Replace with your API key
        //     headers: { key: '1MS56ewiH7MZsDQ1oN2buDXD8SBdFipp9D' }
        // }
        let b64 = btoa(JSON.stringify(query))

        // let response = await fetch(url + b64, header);
        // let cs = await response.json();
        // cs.c.forEach(element => {
        //     console.log(element);
        //     this.messages.push(element);
        // });

         // Subscribe to EventSource
        this.socket  = new EventSource('https://b.map.sv/s/' + b64)
        // Handle new messages
        this.socket.onmessage = async(e) =>   {
            console.log("new Event: ", e)
            await this.queryMessages()
        }
    
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
    unMounted(){
        this.socket = null;
    },
    methods:{
        getProfilePic(entry){
            if(entry.MAP.paymail.includes('handcash')){
                return `https://cloud.handcash.io/v2/users/profilePicture/${entry.MAP.paymail.split("@")[0]}`
            } else if(entry.MAP.paymail.includes('relay')){
                return `https://bitpic.network/u/${entry.MAP.paymail}`
            }
        },
        async sendMessage(){
            try{
            console.log(this.$store.state.relayx_handle);
            // Create data payload for Like Schema
            let dataPayload = [
                "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut", // B Prefix
                this.message,
                "text/plain",
                "utf-8",
                "|",
                "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5", // MAP Prefix
                "SET",
                "app",
                "pewnicornsocial.club",
                "type",
                "message",
                "paymail",
                this.$store.state.relayx_handle + "@relayx.io",
                ];
                dataPayload.push("context", "channel", "channel", "pewnicorn-social-club");

                const script = window.nimble.Script.fromASM(
                    "OP_0 OP_RETURN " +
                        dataPayload
                        .map((str) => bops.to(bops.from(str, "utf8"), "hex"))
                        .join(" ")
                    );
                console.log(script.toASM())
                let outputs = [{ script: script.toASM(), amount: 0, currency: "BSV" }];

                let resp = await window.relayone.send({ outputs });

                console.log("Sent", resp);
                let txid = resp.txid;
                console.log("TXID:", txid)
                this.message = "";
            }catch(err){alert(err)}
        },
        async queryMessages(){
            let query = {
                "v": 3,
                "q": {
                    "find": {
                    //"MAP.app": "bitchatnitro.com",
                    "MAP.channel": "pewnicorn-social-club"
                    },
                    "sort":{
                        "timestamp": -1
                    },
                "limit": 1000
                },
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
            this.messages = [];
            cs.c.forEach(element => {
                console.log(element);
                this.messages.push(element);
            });
        }
    },
    computed: {
        sorted(){
            let s = this.messages; 
            s.sort((a,b) => a.timestamp - b.timestamp > 0 ? -1 : 1)
            return s;
        }   
    }
}
</script>

<style lang="scss" scoped>

</style>