<template>
    <Menu />
    <div class="text-white pt-4">
    <div v-for="game in currentGame" 
                :key="game.id"
                class="container m-auto m-1 p-2">
            <!-- <GameTimer /> -->
        <div v-if="!game.gameComplete && (game.id === store.state.bingoCurrenGame)"> 
            <BingoModal :isOpen="showAdvertisementModal" :isBingo="false" @closeModal="toggleModal" /> 
            <BingoModal :isOpen="anyOneCallBingo" :isBingo="true" />  
            <div class="grid grid-cols-5 lg:grid-cols-7">
                <div class="col-span-1">
                        <div class="w-full rounded-xl">
                            <div class="text-lg font-bold">Numbers Called:{{winningNumbersCount}} </div>
                            <div>  </div>
                            <div class='w-full h-96 overflow-y-scroll bg-gray-900 rounded-xl shadow px-1'> 
                                <div v-for="number in winningNumbers" :key="number"> {{ number }} </div> 
                            </div>
                        </div>
                </div>
                <div class="col-span-4 lg:col-span-4">
                    <!-- Card Header --> 
                    <div class="flex grid grid-cols-5 ring bg-indigo-500 ">
                        <div v-for="letter in ['B','I','N','G','O'] "
                                :key="letter"
                                class="h-10 m-5 text-2xl font-bold">
                                {{letter}}
                        </div>
                    </div>
                    <!-- Card Body --> 
                    <div class="grid grid-rows-5 grid-flow-col ">
                        <!-- {{winningNumbers}} -->
                        
                        <div v-for="attr in meta.attributes" 
                            :key="attr"
                            :id="attr.trait_type"
                            class="ring-indigo h-20 p-5 m-1 rounded font-bold  break-normal "
                            :class="compareSquare(attr.value, game.winningNumbers)">
                            {{attr.value}}   
                        </div>    
                    
                    </div>
                </div>
                <div class="col-span-7 lg:col-span-2 bg-gray-100 rounded-xl shadow p-2 m-2">
                     <!-- Bingo Button --> 
                      <div class="text-gray-900 text-lg font-black"> Card: {{meta.edition}}</div>
                     {{hasBingoRecord ? "You have a BINGO" : ""}}
                    <div class="mb-10 w-full">
                        <button v-if="isWinner && !hasBingoRecord" class="font-black w-full p-4 text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl " 
                                @click="userCallBingo(bingo, meta.edition, game.id)"
                                >
                                BINGO!
                                
                        </button> 
                        <!-- <button v-if="!isWinner" @click='checkWinner'>Check Bingo</button> -->
                    </div> 
                    <!-- Current Card --> 
                    <div class="w-full"> 
                        <img class="h-80 mx-auto" :src="'https://berry.relayx.com/' + store.state.selectedBingoCard.berry.txid " alt="">
                    </div> 
                    <!-- Bingo List --> 
                    <div class="">
                        Bingos:
                        <div v-for="player in currentGameBingos"
                            class="text-gray-900"
                                :key="player.id"
                                :class="`${ (store.state.relayx_handle === player.relayHandle) ? 'text-bold text-green-500' : ''}`">
                            {{player.relayHandle}}
                        </div>
                    </div>
                    <div > 
                        <button class="w-full p-4 text-white text-sm bg-gradient-to-r from-pink-500 to-red-500 rounded-xl " 
                        @click="goBack()">
                        Back to Card List
                </button>  
                    </div>
                </div>
            </div> 
        </div>
        <div v-else>
            <div v-if="(game.id !== store.state.bingoCurrenGame)">
                <div class="mb-20 text-3xl">
                    <join-game @playGameClicked="joinGame"/>
                </div>
            </div>
            <div v-else>
                <div class="text-3xl">
                    <no-game />
                </div>
            </div>
        </div> 
    </div>
        
    </div>
    <Footer />
</template>
<style>
    #Sponsor, #Background, #Bonus {display:  none;}
</style>

<script>
import Footer from "./../../components/Footer.vue"
import Menu from "./../../components/MenuComponent2.vue"
import { ref } from 'vue';
import { useBingo } from './../../services/firebase.js';
import { useStore } from 'vuex'
import JoinGame from '../../components/JoinGame.vue';
import NoGame from '../../components/NoGame.vue';
import BingoModal from "../../components/BingoModal.vue"

export default {
    components:{Menu, Footer, JoinGame, NoGame, BingoModal},
    async setup() {
        const store = useStore()
        const { getCurrentGame , getCurrentGameBingos, userCallBingo} = useBingo()

        const currentGame = getCurrentGame()
        const currentGameBingos = getCurrentGameBingos(store.state.bingoCurrenGame)

        console.log(currentGame)
        let matches = ref([])
        let meta = ref([])
        console.log("Selected Card Number", store.state.selectedBingoCard.props.no);
        const getData = async (_meta) => {
            import(`@/assets/metadata/${store.state.selectedBingoCard.props.no}`).then((module) => {
                _meta.value = module.default 
            })
        } 
        
        await getData(meta)
        // console.log(meta);

       
        const bingo = {
            handle:    store.state.relayx_handle,
            owner:     store.state.user_address,
            card:      store.state.selectedBingoCard.location
        }
        const hasBingo = ref(false);
        const adModalActive = ref(false)

        const toggleModal = () => {
            if (adModalActive.value) {
                store.commit('setViewedAdvertisement', true)
            }
            adModalActive.value = !adModalActive.value
        }
        // store.state.viewedAdvertisement = false
        return { currentGame, getCurrentGame, store, meta, bingo, userCallBingo, matches, hasBingo, currentGameBingos, adModalActive, toggleModal }
    },
    methods: {
        goBack() {
            this.$router.push('/bingo/cards/my-cards')
        },
        compareSquare(sqaure, winSet) {
            try{
                const set = winSet.filter(w => w.toString() === sqaure)
                const setcompare = set.length
                // console.log(set)
                if (setcompare > 0 || sqaure === 'Free Space')
                    return 'bg-green-500 text-black font-bold animate-pulse'
                    else return "bg-white text-black"

            }catch(err){
                console.log(err)
                return ""
            }
            
        },
        playNextGame(gameId) {
            this.$store.commit("setBingoCurrenGame", gameId)
            this.hasBingo = false;
            this.getCurrentGame()
            console.log(this.currentGame[0].id);
            this.getCurrentGameBingos(this.currentGame[0].id);
            //window.location.reload()
            
        },
        joinGame(){
            console.log("Current Game ID", this.currentGame[0].id)
            this.playNextGame(this.currentGame[0].id)
        },
        checkWinner(){
            let b1 = parseInt(this.meta.attributes.filter(a => a.trait_type === "B1")[0].value, 10)
            let b2 = parseInt(this.meta.attributes.filter(a => a.trait_type === "B2")[0].value, 10)
            let b3 = parseInt(this.meta.attributes.filter(a => a.trait_type === "B3")[0].value, 10)
            let b4 = parseInt(this.meta.attributes.filter(a => a.trait_type === "B4")[0].value, 10)
            let b5 = parseInt(this.meta.attributes.filter(a => a.trait_type === "B5")[0].value, 10)
            let bs = [b1, b2, b3, b4, b5]; 
            let bcount = bs.filter( b => {if(this.currentGame[0].winningNumbers.indexOf(b) > -1) {return b}})
            if(bcount.length === 5){
                this.hasBingo = true
                return true; 
            }
            let i1 = parseInt(this.meta.attributes.filter(a => a.trait_type === "I1")[0].value, 10)
            let i2 = parseInt(this.meta.attributes.filter(a => a.trait_type === "I2")[0].value, 10)
            let i3 = parseInt(this.meta.attributes.filter(a => a.trait_type === "I3")[0].value, 10)
            let i4 = parseInt(this.meta.attributes.filter(a => a.trait_type === "I4")[0].value, 10)
            let i5 = parseInt(this.meta.attributes.filter(a => a.trait_type === "I5")[0].value, 10)
            let is = [i1, i2, i3, i4, i5]; 
            let icount = is.filter( i => {if(this.currentGame[0].winningNumbers.indexOf(i) > -1) {return i}})
            if(icount.length === 5){
                this.hasBingo = true
                return true; 
            }
            // this group has a free space 
            let n1 = parseInt(this.meta.attributes.filter(a => a.trait_type === "N1")[0].value, 10)
            let n2 = parseInt(this.meta.attributes.filter(a => a.trait_type === "N2")[0].value, 10)
            let n4 = parseInt(this.meta.attributes.filter(a => a.trait_type === "N4")[0].value, 10)
            let n5 = parseInt(this.meta.attributes.filter(a => a.trait_type === "N5")[0].value, 10)
            let ns = [n1, n2, n4, n5]; 
            let ncount = ns.filter( n => {if(this.currentGame[0].winningNumbers.indexOf(n) > -1) {return n}})
            if(ncount.length === 4){
                this.hasBingo = true
                return true; 
            }

            let g1 = parseInt(this.meta.attributes.filter(a => a.trait_type === "G1")[0].value, 10)
            let g2 = parseInt(this.meta.attributes.filter(a => a.trait_type === "G2")[0].value, 10)
            let g3 = parseInt(this.meta.attributes.filter(a => a.trait_type === "G3")[0].value, 10)
            let g4 = parseInt(this.meta.attributes.filter(a => a.trait_type === "G4")[0].value, 10)
            let g5 = parseInt(this.meta.attributes.filter(a => a.trait_type === "G5")[0].value, 10)
            let gs = [g1, g2, g3, g4, g5]; 
            let gcount = gs.filter( g => {if(this.currentGame[0].winningNumbers.indexOf(g) > -1) {return g}})
            if(gcount.length === 5){
                this.hasBingo = true
                return true; 
            }

            let o1 = parseInt(this.meta.attributes.filter(a => a.trait_type === "O1")[0].value, 10)
            let o2 = parseInt(this.meta.attributes.filter(a => a.trait_type === "O2")[0].value, 10)
            let o3 = parseInt(this.meta.attributes.filter(a => a.trait_type === "O3")[0].value, 10)
            let o4 = parseInt(this.meta.attributes.filter(a => a.trait_type === "O4")[0].value, 10)
            let o5 = parseInt(this.meta.attributes.filter(a => a.trait_type === "O5")[0].value, 10)
            let os = [o1, o2, o3, o4, o5]; 
            let ocount = os.filter( o => {if(this.currentGame[0].winningNumbers.indexOf(o) > -1) {return o}})
            if(ocount.length === 5){
                this.hasBingo = true
                return true;
            }

            let row1 = [b1, i1, n1, g1, o1]
            console.log(row1)
            let rowCount = row1.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(rowCount.length === 5){
                this.hasBingo = true
                return true;
            }

            let row2 = [b2, i2, n2, g2, o2]
            rowCount = row2.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(rowCount.length === 5){
                this.hasBingo = true
                return true;
            }

            //this group has a free space 
            let row3 = [b3, i3, g3, o3]
            rowCount = row3.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(rowCount.length === 4){
                this.hasBingo = true
                return true;
            }
            let row4 = [b4, i4, n4, g4, o4]
            rowCount = row4.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(rowCount.length === 5){
                this.hasBingo = true
                return true;
            }

            let row5 = [b5, i5, n5, g5, o5]
            rowCount = row5.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(rowCount.length === 5){
                this.hasBingo = true
                return true;
            }

            let diagonalLeftRight = [b1, i2, g4, o5]
            let diagonalCount = diagonalLeftRight.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(diagonalCount.length === 4){
                this.hasBingo = true
                return true;
            }

            let diagonalRightLeft = [b5, i4, g2, o1]
            diagonalCount = diagonalRightLeft.filter( r => {if(this.currentGame[0].winningNumbers.indexOf(r) > -1) {return r}})
            if(diagonalCount.length === 4){
                this.hasBingo = true
                return true;
            }
            return false;
        },
        checkShowAdvertisement() {
            if(this.winningNumbersCount === 0){
                return false;
            }
            if (this.winningNumbersCount % 10 === 0 && !this.store.state.viewedAdvertisement) {
                this.toggleModal()
            }

            if (!this.winningNumbersCount % 10 === 0 ) {
                this.store.commit('setViewedAdvertisement', false)
            }

           return this.adModalActive
        },
    },
    computed:{
        winningNumbers(){
            if(!this.currentGame){return []}
            let asArray = Array.from(this.currentGame[0].winningNumbers).reverse()
            const reversed = new Set(asArray);
           return reversed// this.currentGame[0].winningNumbers
        },
        isWinner(){
            let hasWin =  this.checkWinner();
            // console.log(hasWin);
            return hasWin;
        },
        showBingoModal(){
            if(this.currentGameBingos?.length > 1) {return true}
            return false;
        },
        anyOneCallBingo() {
            if (this.currentGameBingos?.length > 0) {
                return true
            } else {
                return false
            }
        },
        hasBingoRecord(){
            let matches = []
            if(this.currentGameBingos?.length > 0){
                this.currentGameBingos.forEach((r)=> {
                    console.log(r);
                    if(r.gameId === this.currentGame[0].id && r.edition === this.$store.state.selectedBingoCard.props.no){
                        matches.push(r)
                    }
                })
            }
            // console.log(matches)
            return matches.length > 0
        },
        cardNumbers(){
            let b1 = this.meta.attributes.filter(a => a.trait_type === "B1")[0].value
            let b2 = this.meta.attributes.filter(a => a.trait_type === "B2")[0].value
            let b3 = this.meta.attributes.filter(a => a.trait_type === "B3")[0].value
            let b4 = this.meta.attributes.filter(a => a.trait_type === "B4")[0].value
            let b5 = this.meta.attributes.filter(a => a.trait_type === "B5")[0].value

            let i1 = this.meta.attributes.filter(a => a.trait_type === "I1")[0].value
            let i2 = this.meta.attributes.filter(a => a.trait_type === "I2")[0].value
            let i3 = this.meta.attributes.filter(a => a.trait_type === "I3")[0].value
            let i4 = this.meta.attributes.filter(a => a.trait_type === "I4")[0].value
            let i5 = this.meta.attributes.filter(a => a.trait_type === "I5")[0].value

            let n1 = this.meta.attributes.filter(a => a.trait_type === "N1")[0].value
            let n2 = this.meta.attributes.filter(a => a.trait_type === "N2")[0].value
            let n3 = this.meta.attributes.filter(a => a.trait_type === "N3")[0].value
            let n4 = this.meta.attributes.filter(a => a.trait_type === "N4")[0].value
            let n5 = this.meta.attributes.filter(a => a.trait_type === "N5")[0].value

            let g1 = this.meta.attributes.filter(a => a.trait_type === "G1")[0].value
            let g2 = this.meta.attributes.filter(a => a.trait_type === "G2")[0].value
            let g3 = this.meta.attributes.filter(a => a.trait_type === "G3")[0].value
            let g4 = this.meta.attributes.filter(a => a.trait_type === "G4")[0].value
            let g5 = this.meta.attributes.filter(a => a.trait_type === "G5")[0].value

            let o1 = this.meta.attributes.filter(a => a.trait_type === "O1")[0].value
            let o2 = this.meta.attributes.filter(a => a.trait_type === "O2")[0].value
            let o3 = this.meta.attributes.filter(a => a.trait_type === "O3")[0].value
            let o4 = this.meta.attributes.filter(a => a.trait_type === "O4")[0].value
            let o5 = this.meta.attributes.filter(a => a.trait_type === "O5")[0].value

            console.log(b1);
            return [b1, b2, b3, b4, b5, i1, i2, i3, i4, i5, n1, n2, n3, n4, n5, g1, g2, g3, g4, g5, o1, o2, o3, o4, o5,]
        },
        
        winningNumbersCount(){
            let count = Array.from(this.currentGame[0].winningNumbers).length;
            //let mod = count % 15
            // console.log("Modulo:", mod)
            //  if (mod === 0) {
            //     //this.setShowModal();
            //     console.log("should be modal", this.showModal)
                
            // }
            console.log("Number count called")
            return count;
        },
        showAdvertisementModal() {
            let check = this.checkShowAdvertisement()
            return check
        }
        
    }   
}
</script>