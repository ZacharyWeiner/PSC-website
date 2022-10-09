<template>
    <div class="h-screen mx-4 bg-gray-900 overscroll-none">
        <Menu></Menu>
        <div class="lg:grid lg:grid-cols-3"> 
            <div class="cols-span-1 my-2 rounded-xl max-h-32 bg-gray-700 "> 
                <div class="visible text-white">What would you like to share? </div>
                <div class="grid grid-cols-7 h-full ">
                    <textarea v-model="message" placeholder="type your message here.." class="max-h-24 rounded-xl p-1 m-1 col-span-6 bg-gray-100" ></textarea>
                    <div class="w-full col-span-1 pl-1 m-1 pr-2 grid items-justify-center"><button @click="sendMessage" class="max-h-12 bg-gradient-to-r from-blue-500 to-purple-500 w-full rounded-xl lg:mt-4 "> <PaperAirplaneIcon class=" mx-auto max-h-12 text-gray-100" aria-hidden="true" /></button></div>
                </div> 
                <div class="w-full flex pt-2">
                    <div class="w-full text-right pr-2 text-gray-100">Pewnicorn Only</div>   
                    <div>  
                        <Switch v-model="enabled" @click="queryPosts" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                            <span class="sr-only">Global</span>
                            <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                        </Switch>
                    </div>  
                </div>
                <div class="hidden lg:block text-gray-100 w-full">
                    <div> Links: </div>
                    <div class="w-full text-left"> 
                        <div class="w-full p-2"><router-link to="/secret/airdrop" class="p-2 m-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-black ">Airdrop Tool</router-link> </div>
                        <div class="w-full p-2"><router-link to="/secret/relay-wrapper/home" class="p-2 m-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-black ">Whats Hot On Relay</router-link> </div>
                        <div class="w-full p-2"><router-link to="/secret/rare-candy/ape-floor" class="p-2 m-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-black ">APE Floor Tool</router-link> </div>
                       <div class="w-full p-2"> <router-link to="/secret/rare-candy/frog-floor" class="p-2 m-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-black ">Frog Floor Tool</router-link> </div>
                    </div>
                </div>
            </div>
            <div class=" col-span-2 h-screen overflow-y-scroll">
                <ul role="list" class="divide-y divide-teal-200 text-left rounded-xl">
                    <li v-for="message in sorted" :key="message" class="flex py-4 m-2 bg-gray-800 rounded-xl">
                    <img class="h-10 w-10 lg:h-12 lg:w-12 rounded-full" :src="getProfilePic(message)" alt="" />
                    <div v-if="message.MAP.app === 'twetch'" class="mx-3 px-1 w-full bg-gray-700 rounded-xl">
                        <p class="text-sm font-bold text-gray-100 underline pb-1">Posted from {{ message.MAP.app }} by {{getTwetchProfileName(message)}}</p>
                        <div  v-if="message.MAP.app === 'twetch'">    
                            <p v-if="message.MAP.app === 'twetch'" class="text-sm text-gray-100  w-full rounded-xl"><a :href="message.B.content" >{{message.B.content }}</a></p>
                            <!-- <p v-else class="text-sm text-gray-100  w-full rounded-xl">{{message.B.content }}</p> -->
                            <div v-if="message.MAP.twdata_json?.length > 0">
                                <p class="text-sm text-gray-100  w-full rounded-xl">{{getPostBody(message)}}</p>
                                <div class="flex" v-for="image in getMedia(message)" :key="image">
                                    <div> 
                                        <img class="max-w-48 max-h-48" :src="image" />
                                    </div>  
                                </div>
                            </div>
                        </div> 
                        <p class="text-xs text-gray-500"> {{formatDate(message.timestamp)}}</p>
                    </div>
                    <div v-else-if="message.MAP.app === 'pewnicornsocial.club'"   class="mx-3 p-1 w-full bg-gray-100 rounded-xl"> 
                            <p class="text-sm font-bold text-gray-900 underline pb-1">Posted from {{ message.MAP.app }} By {{message.MAP.paymail}}</p> 
                            <p class="text-sm text-gray-900  w-full rounded-xl">{{message.B.content }}</p>
                            <p class="text-xs text-gray-500"> {{formatDate(message.timestamp)}}</p>
                    </div>
                    <div v-else > 
                            <p class="text-sm font-bold text-gray-100 underline pb-1">Posted from {{ message.MAP.app }}</p> 
                            <p class="text-sm text-gray-100  w-full rounded-xl">{{message.B.content }}</p>
                            <p class="text-xs text-gray-500"> {{formatDate(message.timestamp)}}</p>
                    </div>
                        
                    </li>
                </ul>
            </div>
        </div>      
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import bops from 'bops';
import Menu from "./../../components/MenuComponent2.vue";
import { PaperAirplaneIcon } from '@heroicons/vue/outline';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { Switch } from '@headlessui/vue'
var socket;
export default {
    components: {Menu, PaperAirplaneIcon, Switch},
    setup () {
        const message = ref('');
        const messages = ref([])
        let store = useStore();
        let router = useRouter();
        if(store.state.relayx_handle === "" || store.state.user_jigs.length ===0){
            alert("You must be logged in and have a pewnicorn to see the social page");
            router.push("/")
        }
        const state = reactive({
            count: 0,
            enabled: false
        })

        return {
            ...toRefs(state), messages, socket, message 
        }
    },
    async mounted(){
        let query = this.bitQuery;
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
            await this.queryPosts()
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
        formatDate(timestamp){
            let _date = new Date(timestamp * 1000);
            console.log(typeof(timestamp), _date);
            return _date
        },
        getMedia(post){
            let postJSON = JSON.parse(post.MAP.twdata_json)
            if(postJSON)
                return postJSON.media
            return []
        },
        getPostBody(post){
            let postJSON = JSON.parse(post.MAP.twdata_json)
            if(postJSON)
                return postJSON.text
            return postJSON
        },
        getProfilePic(post) {
            if(post.MAP.twdata_json){
                let postJSON = JSON.parse(post.MAP.twdata_json)
                if(postJSON && postJSON.user){
                    console.log("POST JSON.user:", postJSON.user);
                    return postJSON.user.profile_image_url;
                }
                else
                    console.log("POST JSON was null")
                    if(post.MAP.app === "twetch"){
                    console.log("not the right format")
                    return 'https://fv.twetch.app/app-icon.png'
                    }
            } else {
                if(post.MAP.app === "twetch"){
                console.log("not the right format")
                return 'https://fv.twetch.app/app-icon.png'
                }
                if(post.MAP.app === "retrofeed.me"){
                console.log("not the right format")
                return 'https://retrofeed.me/assets/images/chat.png'
                }
                if(post.MAP.app === "pewnicornsocial.club"){
                console.log("not the right format")
                    return 'https://bitpic.network/u/' + post.MAP.paymail
                }
            }
            return "";
        },
        getTwetchProfileName(post) {
            if(post.MAP.twdata_json){
                let postJSON = JSON.parse(post.MAP.twdata_json)
                if(postJSON && postJSON.user){
                    console.log("POST JSON.user:", postJSON.user);
                    return postJSON.user.name;
                }
                else
                    console.log("POST JSON was null")
            } else {
                console.log("not the right format")
            }
            return "";
        },
        showTwetchPost(post) {
            if(post.MAP.twdata_json){
                let postJSON = JSON.parse(post.MAP.twdata_json)
                if(postJSON && postJSON.user){
                    console.log("POST JSON.user:", postJSON.user);
                    return true;
                }
                else
                    console.log("POST JSON was null")
                    return false
            } else {
                console.log("not the right format")
            }
            return "";
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
                "post",
                "paymail",
                this.$store.state.relayx_handle + "@relayx.io",
                ];

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
        async queryPosts(){
            let query =this.bitQuery;
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
                //console.log(element);
                this.messages.push(element);
            });
        }
    },
    computed: {
        sorted(){
            let s = this.messages; 
            s.sort((a,b) => a.timestamp - b.timestamp > 0 ? -1 : 1)
            return s;
        },
        bitQuery(){
            let query = {
                    "v": 3,
                    "q": {
                        "find": {
                        //"MAP.app": "blockpost.network",
                        "MAP.type": "post"
                        },
                        "sort":{
                            "timestamp": -1
                        },
                    "limit": 100
                    },
                }
            if(this.enabled){
                 query = {
                    "v": 3,
                    "q": {
                        "find": {
                        "MAP.app": "pewnicornsocial.club",
                        "MAP.type": "post"
                        },
                        "sort":{
                            "timestamp": -1
                        },
                    "limit": 100
                    },
                }
            }
            return query
        }   
    }
}
</script>

<style lang="scss" scoped>

</style>
