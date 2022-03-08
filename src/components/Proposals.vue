<template>
    <div class="flex items-center justify-center mb-5">
        <img class="h-5 pr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/face-with-monocle_1f9d0.png">
        <div class="font-bold text-2xl text-white uppercase tracking-2xl">Proposals</div>
    </div>
    <div id="proposals" class="grid grid-cols-1  xl:grid-cols-3">
            <div class="col-span-1 rounded-3xl overflow-hidden text-left bg-white border-solid border-slate-300 m-2"  v-for=" {propId, title, question, photoURL} in proposals"
            :key="propId"
            :name="propId" >
            <div class='flex-col' >
                <div @click="setProposal(propId)"> 
                <img class="w-full object-cover" :src="photoURL" alt="Proposal">
                </div>
                <div @click="setProposal(propId)" class="px-6 py-4 h-full">
                    <div class="h-16 overflow-hidden font-bold text-xl mb-2 text-2xl">{{title.length > 48 ? `${title.substring(0, 48)} ...`:  title}}</div>
                    <p  class="h-36 text-gray-700  text-base">
                        <span class='' v-if="isLoggedIn">
                            {{question.substring(0, 200)}}  ... <span class='text-blue-500 cursor-pointer' @click="setProposal(propId)"> see more </span>
                        </span>
                        <span v-else> Connect wallet to see the full proposal </span>
                    </p>
                </div>
                <div class=' w-full flex items-baseline '>
                <div class="w-full m-4 p-4 rounded-xl ring-2 ring-gray-300">
                    <div class="flex">
                        <div class="text-xs font-bold pr-1">{{positiveVoteDisplay(propId)}}%</div>
                        <div class="bg-green-500 h-1" :class="`${voteBarWidth(propId)[0]}`"></div>
                        <div class="bg-red-500 h-1" :class="`${voteBarWidth(propId)[1]}`"></div>
                        <div class="text-xs font-bold pl-1">{{negativeVoteDisplay(propId)}}%</div>
                    </div>
                    <div class="rounded-lg flex items-center justify-center w-full">
                        <div v-if="isLoggedIn" class='w-full'>
                            <div v-if="!hasVote(propId)" class="flex w-full" >
                                <div class="w-full text-white ">
                                    <div class="w-full flex items-justify-center">
                                        <div class='w-full'>
                                            <button :disabled="!canAccess" class="w-full p-1  m-1 pr-0 mr-0 flex rounded-full rounded-r-none bg-gray-400 font-bold" :class="[canAccess? 'bg-green-400' : 'bg-gray-500' ]" @click="cast(propId,'Yes')">

                                                <div class='p-1 m-1 flex '>
                                                    <div class='pl-6'> 
                                                        <img class="h-5 pr-2 " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-up_1f44d.png"/> 
                                                    </div>
                                                    <div class="text-xs break-none pt-1 ">Vote with </div>
                                                </div>
                                                
                                            </button>
                                        </div>
                                         <div  class='w-full'>
                                        <button :disabled="!canAccess" class="w-full  p-1 m-1 pl-0 ml-0 flex rounded-full rounded-l-none bg-gray-400 font-bold" :class="[canAccess? 'bg-red-400' : 'bg-gray-500 border-l-2' ]" @click="cast(propId,'No')">
                                             <div class='w-full p-1 m-1 flex items-justify-center'>
                                                 <div class='pl-6'> 
                                                    <img class="h-5 pr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-down_1f44e.png"/> 
                                                 </div>
                                                 <div class="text-xs break-none pt-1">Vote against </div>
                                             </div>
                                        </button> 
                                        </div>
                                    </div>
                                    <div class="flex items-justify-center">
                                       
                                    </div>
                                </div>
                            </div>
                            <div v-else id="votes" v-for=" vote in votes "
                            :key="vote.id">

                                <div class='w-full flex' v-if="vote.propId === propId">
                                     <div class=" flex items-justify-center">
                                        <button class="p-1 m-1 ring-1 ring-red-500 flex rounded-full bg-gray-400 font-bold" :class="`${vote.vote === 'Yes'? 'bg-green-400': 'bg-red-500'}`">
                                            <img class="h-5 pr-2 " :src="vote.vote === 'Yes'? 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-up_1f44d.png' : 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-down_1f44e.png' "/> 
                                            <div class="text-sm text-white">Voted: {{vote.vote}}</div>
                                        </button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class='w-full text-center'>
                            <button class="w-full flex rounded-full bg-white-400 font-bold py-2 px-4 m-1 mr-3 ring-4 ring-black font-bold"> <div class='w-full text-center'>  Connect wallet to see more </div> </button>
                        </div>
                    
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useProposals, getVotes, getAllVotes } from './../services/firebase'
import { useStore } from 'vuex'
import {useRun} from './../services/wallet'
// import PropoposalVoteBar from './PropoposalVoteBar.vue'

export default {
    components:{},
     setup() {
        const store = useStore()
        let {canAccess} = useRun();
        const { proposals, sendVote } = useProposals(store.state.relayx_handle, store.state.user_address)
        const cast = (propId,vote) => {
            sendVote(propId,vote)  
        }
      

        const { votes } =  getVotes(store.state.user_address)
        const allVotes  = getAllVotes()
        console.log('proposals', proposals)
        return { proposals, cast, votes, allVotes, canAccess }

    }, 
    methods:{
        hasVote(propId){
            if (this.votes.filter(v => v.propId === propId).length) {
                return true
                }
            return false   
        },
        relatedVotes(propId){
            return this.allVotes.filter((v) => v.propId === propId)
        },
        positiveVotesByProposal(propId){
            let related = this.relatedVotes(propId)
            return related.filter(v => v.vote === "Yes").length
        },
        negativeVotesByProposal(propId){
            let related = this.relatedVotes(propId)
            return related.filter(v => v.vote === "No").length
        },
        voteBarWidth(propId){
            let _up = this.positiveVotesByProposal(propId)
            let _down = this.negativeVotesByProposal(propId)
            let _relatedTotal = this.relatedVotes(propId).length;
            console.log(_up, _down, _relatedTotal)
            if((_up === 0 && _down === 0) || _relatedTotal === 0){
                return ['w-1/2', 'w-1/2']
            }
            if(_up === 0 || _relatedTotal === 0){
                return ['w-0/2', 'w-2/2']
            }
            let intPercentage = parseInt((_up / _relatedTotal  ) * 100)
            console.log(intPercentage)
            if(intPercentage < 20){
                return ['w-1/5','w-4/5']
            }
            else if(intPercentage < 40){
                return ['w-2/5','w-3/5']
            }else if(intPercentage < 55 ){
                return ['w-1/2','w-1/2']
            }
            else if(intPercentage < 80 ){
                return ['w-3/4','w-1/4']
            }
            else if(intPercentage < 90 ){
                return ['w-4/5','w-1/5']
            }
            else{
                return ['w-full','']
            }
            
        },
        setProposal(propId) {
            this.$store.commit('setSelectedProposalId', propId)
            this.$router.push('/prop-detail')
        },
        positiveVoteDisplay(propId){
            if (propId === undefined) return "0";
            if(this.positiveVotesByProposal(propId) === 0){
                return "0.00"
            } else{ 
                 return ( ( this.positiveVotesByProposal(propId) / this.relatedVotes(propId).length) * 100).toString().substring(0,4)
            }
        },
        negativeVoteDisplay(propId){
            if (propId === undefined) return "0";
            if(this.negativeVotesByProposal(propId) === 0){
                return "0.00"
            } else{ 
                 return ( ( this.negativeVotesByProposal(propId) / this.relatedVotes(propId).length) * 100).toString().substring(0,4)
            }
        }
       
    },
    computed: {
        isLoggedIn(){
            if(this.$store.state.user_address !== ""){return true}
            return false;
        }
        
    }
}
</script>