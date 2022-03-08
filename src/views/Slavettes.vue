<template>
    <div id="Slavettes" class="w-full grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 mt-20 p-6 text-white">
        <div class="col-span-2">
            
            <div class="w-full flex">          
                <div><span class="text-4xl text-left font-bold p-4">Bag:</span> </div>
                <!-- <div class='w-full text-right'> Eggs {{ jackpots.length }} </div> -->

            </div>
            <div class="rounded-2xl overflow-hidden text-left ring-2 ring-pink-400 m-2 p-4 overflow-y-scroll">
                <div  v-if="!userSlavettes || userSlavettes.length === 0" class="text-7xl font-extrabold text-center">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-600">
                        YNGMI
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-4 max-h-64">
                    <div class='w-full flex'  v-for="slavette in userSlavettes" :key="slavette.props.no" >
                        <div><img
                            :id="slavette.props.no"
                            class="rounded-xl max-h-32" 
                            :src="'https://berry.relayx.com/' + slavette.berry.txid" 
                            :class="`${ (slavette.props.no) === selectedPropNo ? 'ring-2 ring-pink-500' : '' }`"
                            @click="setItem(slavette)"
                            alt="slavette"
                        ></div>
                        <div class='m-4'>
                            <div class='text-pink-600'> <span class='text-lg font-extrabold'> #{{slavette.props.no}} </span> </div>
                            <div class='text-pink-600'>can egg again </div>
                            <div class='text-indigo-400'>{{countdown(slavette)}} </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='w-full flex mb-3 pb-3'>
            <div class=" w-1/2 pt-4"> 
             <button @click="useMoves" class="bg-pink-500  p-3 pt-4 w-1/2 text-white font-semibold rounded-xl">UNDRESS ME</button>
            </div>

            <div v-if='!undressed'> <div class="text-xl pt-6">You can take off {{ availableMoves }} item{{availableMoves === 1 ? '' : 's'}}</div> </div>
            </div>
             <div class="flex ring-2 ring-pink-600 rounded-xl pt-4 mt-2">
                <div id="RedOption"  class="block w-full">
                    <img @click="setOption('red')" src="https://berry.relayx.com/99658f360f9a5f5ce70f6100b1ffbea1fc385a4f44e156f1c1e4fd5e6d1d6232_o1"
                          :class="`${ 'red' === selectedOption ? 'ring-8 ring-pink-500' : '' }`" 
                          class="h-20 rounded-full my-3 mx-auto" alt="rug_red">
                    <span class="text-xl font-bold text-center">{{redCount}}</span>
                </div>
                <div id="GreenOption"  class="block w-full">
                    <img @click="setOption('green')"  src="https://berry.relayx.com/a2feebf63bf84ed28945372a4b2ed43ce84dcd0df312bf4c1308b0bca574e11f_o1" 
                        :class="`${ 'green' === selectedOption ? 'ring-8 ring-pink-500' : '' }`" 
                        class="h-20 rounded-full my-3 mx-auto" alt="rug_green">
                    <span class="text-xl font-bold text-center">{{greenCount}}</span>
                </div>
                <div id="GoldOption"  class="block w-full">
                    <img @click="setOption('gold')"  src="https://berry.relayx.com/54e23ac33b311538f3b07a3579c83cab1fb5effa6e13f8f14408849515f6f3fc_o1" 
                        :class="`${ 'gold' === selectedOption ? 'ring-8 ring-pink-500' : '' }`" 
                          class="h-20 rounded-full my-3 mx-auto" alt="rug_gold">
                    <span class="text-xl font-bold text-center">{{goldCount}}</span>
                </div>                
            </div>
            <div class=" pt-8 w-full">
            
            <div class="rounded-xl overflow-hidden ring-2 ring-pink-600 pt-4 m-2 flex">
                <div class="flex w-full">
                    <div class="pt-0.5">
                        <img class="h-16 w-16 rounded-full mx-2" src="./../assets/cigToken.png" alt="slavette">
                    </div>
                    <div class="font-bold text-lg px-3 pt-4">
                        <h2 class="text-sm">Buy 3 moves: (Coming Soon)</h2>
                        5 CIG
                        </div>
                </div>
                <div class="flex w-full">
                    <div class="">
                        <img class="h-16 w-16 rounded-full mx-2" src="../assets/logo.png" alt="slavette">
                    </div>
                    <div class="font-bold text-lg  px-3 pt-4">.123 BSV</div>
                </div>
            </div>
              <div class='flex bg-gray-200 rounded-xl'>
                        <div v-if="showBuyButton" class='w-full text-lg text-pink-600'> Buy {{movesToBuy}} moves for {{(movesToBuy * .123)}} BSV<button @click="initBuyButton" class='text-white p-2 m-2 bg-gradient-to-r from-green-500 to-green-900 rounded-xl animate-pulse'> Buy Now</button> </div>
                        <div> <div ref='buyExtra' class='buy-extra' > </div></div>
                    </div>
            </div>
        </div>

        <div class="col-span-2">
            
            <div class="flex p-4 mt-10">
               
                <div class="">
                  
                 {{loadingMessage}}
                    <button v-if="showConfirm" @click="confirmAge" class='animate-pulse text-green-500'> I am 18+ </button>
                    <img class="m-2 p-2 rounded-3xl max-h-screen" :class="extraImageClasses" :src="imgSrc" alt="slavette">
                </div>
            </div>
        </div>
    </div>
    <div class='h-auto'>.</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { getJackpots, getAllJackpots } from './../services/firebase'
//import Run from 'run-sdk'
import slavetteMetadata from './../assets/slavette_metadata.json'
import {useRun} from './../services/wallet.js'
import Jimp from "jimp"
import {mapState} from 'vuex'

export default {
  
    async setup() {
        let loadingMessage = ""
        let imgSrc = ref('')
        let meta = ref('')
        let undressing = ref(false);
        let undressed = ref(false);
        let showConfirm = ref(false);
        let showBuyButton = ref(false)
        let movesToBuy = ref(0)
        let totalMoves = ref(0)
        const store = useStore()
        const {setJigs} = useRun();
        //let run = new Run({trust:"*", timeout:1000000, networkTimeout:1000000, logger: console})

        // let rugCount = store.state.user_rugs.map(a => a.length).reduce((a,b) => a + b)
        const redCount = store.state.user_rugs[0]
        const greenCount = store.state.user_rugs[1]
        const goldCount = store.state.user_rugs[2]
        await setJigs();
         totalMoves.value = redCount + (greenCount *2) + (goldCount * 4)
        if(totalMoves.value > 4 ){totalMoves.value = 4}
        totalMoves.value = totalMoves.value + store.state.purchased_moves
        movesToBuy.value = 3 - totalMoves.value; 
        if(movesToBuy.value > 1){
            showBuyButton.value = true
        } else if(movesToBuy.value < 0  ){movesToBuy.value= 0}
        const { jackpots, addjackpot } = getJackpots(store.state.relayx_handle)
        const {allJackpots} = getAllJackpots()
        console.log({jackpots})
        const userSlavettes = store.state.user_slavettes

         
        return { userSlavettes, jackpots, addjackpot, allJackpots, imgSrc, redCount, goldCount, greenCount, meta, undressing, loadingMessage, showConfirm, undressed, totalMoves, showBuyButton, movesToBuy }
    },
    mounted() {
      if(this.userSlavettes && (this.userSlavettes.length > 0) && this.$store.state.selected_item){
          if(this.$store.state.selected_item){
            this.getMetadata(this.$store.state.selected_item.props.no)
            this.setSelectedImage(this.$store.state.selected_item.berry.txid)
            
          }else if(this.userSlavettes && this.userSlavettes.length > 0){
              this.loadingMessage = ""
            this.$store.commit("setSelectedItem", this.userSlavettes[0])
            this.getMetadata(this.userSlavettes[0].props.no)
            this.setSelectedImage(this.userSlavettes[0].berry.txid)
          }
      }
    },
    methods: {
        setItem(obj) {
            this.loadingMessage = ""
            this.$store.commit("setSelectedItem", obj)
            this.getMetadata(obj.props.no)
            this.setSelectedImage(obj.berry.txid)
            if(this.undressed === true){
                this.undressed = false;
            }
           this.resetTotalMoves();
           if(this.movesToBuy > 1){
               this.showBuyButton = true;
                this.initBuyButton();
           }
        },
        setOption(option) {
            this.$store.commit("setSelectedOption", option)
        },
        checkJackpot(slavetteId) {
            // Add logic
            let comparison = new Date()
            let setterDate = new Date(comparison.getDate() -7)
            comparison.setDate(setterDate)
            let hands = this.meta.attributes.find(a => a.trait_type.includes("Hands"));
            let getsJackpot = false;
            let hasPhone = hands.value.includes("Phone") || hands.value.includes("Married") || hands.value.includes("Engaged")
            if ((hasPhone || this.goldCount > 0) && (this.availableMoves >= 4)) {
                console.log(this.$store.state.selected_item)
                let newestObj = this.slavetteLastEgg(slavetteId)
                let newest = newestObj ? new Date(newestObj.createdAt.seconds * 1000) : null                
                console.log(`The date of slavette ${slavetteId}'s last egg was made on: ${newest === null? "never" : newest.toLocaleDateString("EN")} by ${newestObj?.userName}`)
                if(!newest || newest <= comparison){
                    console.log("JACKPOT!")
                    getsJackpot = true
                }
                if(getsJackpot){
                    console.log("adding jackpot")
                    this.addjackpot(slavetteId)
                }
                
            }
        },
        setSelectedImage(txid) {
            this.imgSrc = `https://berry.relayx.com/${txid}`   
            console.log(this.imgSrc)
            
        },
         getMetadata(id)  {
            let index = this.updateMetadataPosition(id)
            console.log({index})
            let response = slavetteMetadata.filter(s => s.edition === index)
            this.meta =  response[0]
            //  this.braLayer = this.meta.attributes.filter(a => a.trait_type === 'Bra')[0].value
        },
        updateMetadataPosition(id){
            if(id === 332){return 1}
            if(id === 333){return 149}
            if(id < 148){ return id + 1}
            if(id < 332){return id + 2}
            
        },
        useMoves() {
            // if (this.store.state.available_moves > 4) {
            //     const moves = this.store.state.available_moves - 4
            //     console.log(moves)
            //     this.$store.commit("setMoveCount", moves)
            // }
            
            //this.imgSrc = "https://slavettes-layers.s3.amazonaws.com/misc/placeholder_small.gif"
            this.loadingMessage = "Your ass better be over 18 or we gonna have a problem."
            this.showConfirm = true;
            
        },
        async confirmAge(){
            this.showConfirm = false;
            this.loadingMessage = "."
            this.undressing = true;
            await this.activateUndress();
        },
        async constructLayers(status, _bg, _eyes, _hair, _mouth, _top, _bra, _hands, _pants, _panties){
            
            let body = await Jimp.read('https://slavettes-layers.s3.amazonaws.com/Base/Naked+Body.png')
            let background;
            if(_bg.length < 1){
                 _bg = this.meta.attributes.filter(a => a.trait_type.includes("Radioactive"))
                 background = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/${_bg[0].trait_type.replace(" ", "+")}/${_bg[0].value.replace(" ", "+")}.png`)
            }else{
                background = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Background/${_bg[0].value.replace(" ", "+")}.png`)
            }
            
            
            let eyes = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Eyes/${_eyes[0].value.replace(" ", "+")}.png`)
            let top = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Top/${_top[0].value.replace(" ", "+")}.png`)
            let bra = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Bra/${_bra[0].value.replace(" ", "+")}.png`)
            let hands = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Hands/${_hands[0].value.replace(" ", "+")}.png`)
            let pants = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Pants/${_pants[0].value.replaceAll(" ", "+")}.png`)
            let panties = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Panties/${_panties[0].value.replaceAll(" ", "+")}.png`)
            let hair = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Hair/${_hair[0].value.replaceAll(" ", "+")}.png`)
            let mouth = await Jimp.read(`https://slavettes-layers.s3.amazonaws.com/Mouth/${_mouth[0].value.replaceAll(" ", "+")}.png`)
            this.loadingMessage = "Im taking it off now..."
            console.log(this.loadingMessage)
            background.composite(body, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            background.composite(eyes, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
             if(this.availableMoves < 3){
                background.composite(bra, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
            if(this.availableMoves < 1){
                background.composite(top, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
            }
             if(this.availableMoves < 4){
                background.composite(panties, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
             if(this.availableMoves < 2){
                background.composite(pants, 0, 0, {
                    mode: Jimp.BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: 1
                })
             }
            background.composite(hands, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            background.composite(hair, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            background.composite(mouth, 0, 0, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            })
            let base = await background.getBase64Async(Jimp.MIME_JPEG);
            this.undressed = true;
            return base;
        },
         async activateUndress() {
             try{
                this.checkJackpot(this.$store.state.selected_item.props.no)
                this.loadingMessage = "Give me a minute while I get into something more comfortable for you baby..."
                let eyes_attribute = this.meta.attributes.filter(a => a.trait_type === "Eyes")
                let bg_attribute = this.meta.attributes.filter(a => a.trait_type === "Background")
                let top_attribute = this.meta.attributes.filter(a => a.trait_type === "Top")
                let bra_attribute = this.meta.attributes.filter(a => a.trait_type === "Bra")
                let hands_attribute = this.meta.attributes.filter(a => a.trait_type === "Hands")
                let pants_attribute = this.meta.attributes.filter(a => a.trait_type === "Pants")
                let panties_attribute = this.meta.attributes.filter(a => a.trait_type === "Panties")
                let hair_attribute = this.meta.attributes.filter(a => a.trait_type.includes("Hair"))
                let mouth_attribute = this.meta.attributes.filter(a => a.trait_type === "Mouth")
                console.log(eyes_attribute[0].value)
                let status = "loading"
                console.log(status, bg_attribute, eyes_attribute, hair_attribute, mouth_attribute, top_attribute, bra_attribute, hands_attribute, pants_attribute, panties_attribute)
                this.imgSrc = await this.constructLayers(status, bg_attribute, eyes_attribute, hair_attribute, mouth_attribute, top_attribute, bra_attribute, hands_attribute, pants_attribute, panties_attribute)
                // console.log(this.imgSrc)
                console.log(this.meta)
                this.undressing = false;
                this.loadingMessage = ''
                this.$store.commit('setPurchasedMoves', 0)

             }catch(err){alert(err)}
        },
        countdown(slavette){
            let newestObj = this.slavetteLastEgg(slavette.props.no)        
            if(newestObj?.createdAt){
                let lastDate = new Date(newestObj.createdAt.seconds*1000)
                let futureDate = new Date()
                let setterDate =  lastDate.getDate() + 7
                // setterDate = new Date(lastDate.getDate() + -22)
                futureDate.setDate(setterDate)

                // futureDate.setDate(lastDate.getDate() + 7);
                console.log(`The date of slavette ${slavette.props.no}'s last egg was made on: ${lastDate.toLocaleDateString("EN")} by ${newestObj?.userName}`)
                console.log(`Slavette ${slavette.props.no}'s can egg again on: ${futureDate.toLocaleDateString("EN")}`)
                if(futureDate < new Date()) return "now"
                return futureDate.toLocaleDateString("EN")
            }       
        },
        initBuyButton(){
            let amount = this.movesToBuy * 0.123
            let _local = this;
             window.relayone.render(this.$refs['buyExtra'], {
                to: "gopniksdevfund@relayx.io",
                amount: amount,
                currency: "BSV",
                onPayment: () => {
                    console.log("Successful Payment"); 
                    this.$store.commit("setPurchasedMoves", this.movesToBuy); 
                    this.totalMoves = this.availableMoves + this.movesToBuy
                    this.showBuyButton = false
                    _local.$forceUpdate();
                },
                onError: (err) => {
                    console.log(err);
                }
            })
        },
        resetTotalMoves(){
             this.totalMoves = this.redCount + (this.greenCount *2) + (this.goldCount * 4)
            if(this.totalMoves > 4 ){this.totalMoves = 4}
            this.totalMoves = this.totalMoves + this.$store.state.purchased_moves
            this.movesToBuy = 3 - this.totalMoves; 
            if(this.movesToBuy < 0 ){this.movesToBuy = 0}
            if(this.movesToBuy > 1){
                this.showBuyButton = true
            }
        },
        slavetteEggs(id){
            return this.allJackpots.filter(se => se.slavetteId  === id)
        },
        slavetteLastEgg(id){
           let jps = this.slavetteEggs(id)
           console.log("JPS:", jps)
           if(jps?.length > 1){
                let  newestObj = jps.reduce((a, b) => {
                        return new Date(a.createdAt?.seconds*1000) > new Date(b.createdAt?.seconds*1000) ? a : b;
                    });

            return newestObj
           }else if (jps?.length === 1){
               return jps[0]
           }
          
            return null
        }
    },
    computed: {
        availableMoves(){
            return this.totalMoves
        },
        selectedPropNo(){
            if(this.$store.state.selected_item.props) return this.$store.state.selected_item.props.no
            return 0;
        },
        selectedItem(){
            return this.$store.state.selected_item
        },
        selectedOption(){
            return this.$store.state.selected_option
        },
        extraImageClasses(){
            if(this.undressing){return 'animate-pulse'}
            return ''
        },
        ...mapState(["purchasedMoves"])

    }
}
</script>

