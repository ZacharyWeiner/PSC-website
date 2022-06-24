<template>
    <div class='text-white min-h-screen'>
        <Menu />
        <div
        class="h-36 bg-contain bg-center md:h-64"
        style="
            background-image: url('https://slavettes-layers.s3.amazonaws.com/pewnicorns/pewnicorns+header.png');
        "
        ></div>
        <div v-if="!isLogin" class='justify-end'>
            <div class="">
                <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 class="text-3xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-4xl">
                    <span class="block">You Must Be Logged In</span>
                    <span class="block">To See Your Bag</span>
                </h2>
                </div>
            </div>
        </div>
        <div class=''> 
            <h2 class="text-xl font-extrabold tracking-tight pl-3 text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-pink-200 via-pink-400 to-indigo-700 bg-clip-text text-transparent sm:text-4xl">
            Redeemables 
            </h2>
        </div>
        <div class='w-full grid grid-cols-1 sm:grid-cols-2'> 
            <div class="col-span-1"> 
                <div class='text-xl font-extrabold tracking-tight pl-3 lg:text-4xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent sm:text-xl'> Hoodies </div>
                <div  class="h-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 bg-gray-200 rounded mx-2">
                    <div v-for="(nft, index) in hoodies" :key="index" class="col-span-1 mx-1 rounded-xl">
                        <img :src="getBerryUrl(nft)" class="w-full rounded-t-xl" />
                        <div class='grid grid-cols-4 bg-gray-200 text-gray-900 rounded-b-xl' >
                            <div class='w-full col-span-4'> 
                                <div class='mx-auto'> Edition {{nft.no > 0? nft.no : nft.props.no}}</div>  
                                <div class='w-full col-span-4'> <button class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-bold rounded shadow-sm text-white bg-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Redeem</button>  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 pt-8 sm:pt-0">
                <div class='text-xl font-extrabold tracking-tight pl-3 lg:text-4xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 bg-clip-text text-transparent xs:text-xl'> Bags </div>
                <div  class="h-full grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 bg-gray-200 rounded mx-2">
                    <div v-for="(nft, index) in bags" :key="index" class="col-span-1 mx-1 rounded-xl">
                        <img :src="getBerryUrl(nft)" class="w-full rounded-t-xl" />
                        <div class='grid grid-cols-4 bg-gray-200 text-gray-900 rounded-b-xl' >
                            <div class='w-full col-span-4'> <div class='mx-auto'> Edition {{nft.no > 0? nft.no : nft.props.no}}</div>  </div>
                            <div class='w-full col-span-4'> <button class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-bold rounded shadow-sm text-white bg-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Redeem</button>  </div>
                        </div>
                    </div>
                </div>
             </div>
        </div> 

        <div class='my-96'></div> 
        <Footer />
          <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div class="relative inline-block align-bottom bg-gray-800 text-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                    <!-- <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-pink-100">
                        <i class='fa fa-check text-green-600'> </i>
                    </div> -->
                    <img :src="getBerryUrl(hoodies[0])" class="h-24 w-24 mx-auto rounded-full" />
                    <div class="mt-3 text-center sm:mt-5">
                        <DialogTitle as="h3" class="text-3xl leading-6 font-medium bg-gradient-to-r from-indigo-600 via-indigo-400 to-pink-400 bg-clip-text text-transparent"> Redeem Your Hoodie</DialogTitle>
                         <div class="mt-2">
                           <div> Size </div>
                            <div class="flex w-full">
                                <div v-for="size in sizes" :key="size" class="m-1 w-full">
                                    <button @click="setSize(size)" :class="sizeButtonClass(size)"> {{size}} </button>
                                </div>
                            </div> 
                        </div>
                        <div class="mt-2">
                            Mailing Address:
                            <textarea v-model="mailingAddress" rows="5" class='rounded w-full text-gray-800 bg-gray-200' />
                        </div>
                        <div  class="w-full max-h-32 overflow-y-scroll pt-1"> 
                            <div v-for="jig in user_jigs" :key="jig.txid" class=''>
                                <button class='bg-gray-700 rounded-xl w-full' @click="setEdition(jig)"> 
                                    <div class="flex"> 
                                        <div class=""> <img :src="getBerryUrl(jig)" class="h-12 w-12 rounded-full" /></div>
                                        <div class="w-full pl-1 pt-2 "> <span :class="edition === jig.props.metadata.no ? 'text-green-500' : ''"> Edition {{jig.props.metadata.no}}</span> </div>
                                        <div class="w-auto pr-4 pt-2">{{ edition === jig.props.metadata.no ? "√" : ""}}</div>
                                    </div> 
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="mt-5 sm:mt-6">
                    <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="mint">REDEEM</button>
                    </div>
                </div>
                </TransitionChild>
            </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import {useRun} from './../../services/wallet.js'
import {mapState, useStore} from 'vuex'
import Menu from "./../../components/Menu.vue"
import Footer from "./../../components/Footer.vue"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
let sizes = ["XS", "Small", "Medium", "Large", "XL", "XXL" ]; 
export default {
    components:{Menu, Footer,
     Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot},
    async setup () {
        let store = useStore()
        console.log("userjigs:", store.state.user_jigs)
        let {signIn, isLogin,  signOut} = useRun()
        console.log( store.state.selectedFriendCollection.contractId)
        let walletJSON  = await fetch('https://staging-backend.relayx.com/api/user/balance2/' + store.state.user_address)
        let response_data = await walletJSON.json()
        console.log(response_data)
        let collectibles = response_data.data['collectibles'];
        let balances = response_data.data['balances'];
        console.log({balances})
        let multipass = collectibles.filter(c => c.origin === "0bcf2caf13e55b95c9353e427991df138980a8704da00028d9cc46e414f90411_o2")

        const state = reactive({
            loading: false,
            open: true,
            size: "Medium",
            edition: 0,
        })
        return {
            ...toRefs(state), signOut, signIn, isLogin, store, sizes, bags
        }
    },
    methods:{
        async login(){
            this.loading = true
            await this.signIn();
            this.loading = false
        },
        logout(){
            this.signOut(this.$store);
        },
        getBerryUrl(nft){
            let suffix = nft.berry.txid
            if(suffix){
                return 'https://berry.relayx.com/'+ suffix
            }
            return ''
            
        },
        setSize(size){
            this.size = size;
        },
        sizeButtonClass(_size){
            if(this.size === _size){
                return "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }
            return "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        },
        setEdition(jig){
            this.edition = jig.props.metadata.no;
        }
    },
    computed:{
        
        orderedNFTs(){
           return [... this.hoodies].sort((a, b) => this.rankNFT(a) - this.rankNFT(b) > 0 ? 1 : -1);
        },
        ...mapState(["isLogin", "user_jigs"])
    }
}
</script>