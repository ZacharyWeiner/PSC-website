<template>
  <div id="ProposalDetail " class="max-w-4xl mx-auto xs:flex-1 mt-10 px-10 justify-center mt-40 overscroll-contain">
    <div>
      <div v-on:click="goBack()" class="text-left mb-10"> 
        <button class="font-bold px-6 py-3 border-4 border-white text-white rounded-lg"> Back</button>
      </div>
      <div class="">
        <div class="text-2xl font-bold tracking-2xl text-white mb-5">{{selectedProposal.title}}</div>
        <img class="w-full object-cover max-h-96 rounded-2xl " :src="selectedProposal.photoURL" alt="Proposal">
      </div>
      
      <div class="flex justify-center text-white mt-4">
        <span class="w-1/2">Posted Date: {{postedDate}} </span>
        <span class="w-1/2">Voting {{selectedProposal.endsOn}}</span>
      </div>
      <div class=' w-full flex items-baseline text-white'>
                <div class="w-full m-4 p-4 rounded-xl ring-2 ring-gray-300">
                    <div class="flex">
                        <div class="text-xs font-bold pr-1">{{positiveVoteDisplay(selected_proposalId)}}%</div>
                        <div class="bg-green-500 h-1" :class="`${voteBarWidth(selected_proposalId)[0]}`"></div>
                        <div class="bg-red-500 h-1" :class="`${voteBarWidth(selected_proposalId)[1]}`"></div>
                        <div class="text-xs font-bold pl-1">{{negativeVoteDisplay(selected_proposalId)}}%</div>
                    </div>
                    <div class="rounded-lg flex items-center justify-center w-full">
                        <div v-if="canAccess" class='w-full'>
                            <div v-if="!hasVote(selected_proposalId)" class="flex w-full" >
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
                            :key="vote.id" class='flex items-justify-center'>

                                <div class='' v-if="vote.propId === selected_proposalId">
                                     <div class="">
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

      <div class="rounded-3xl bg-gray-100 p-6 mt-20 ">
        <div class="text-black">
          {{selectedProposalQuestionText}}
        </div>
        <div class="text-left mt-6 ">
          <div class="font-bold mb-2">Proposed by</div>
          <div class="flex mb-8">
            <img class="block h-16 w-auto rounded-full mr-2" src="../assets/gopnick.png" alt="DAO">
              <div class="block">
                <div class="author">{{selectedProposal.proposedBy ? selectedProposal.proposedBy[0] : selectedProposal.authorNumber}}</div>
                <div class="font-bold">{{selectedProposal.proposedBy ? selectedProposal.proposedBy[1] : selectedProposal.authorName}}</div>
              </div>
          </div>
          <div class="flex items-justify justify-between">
            <div>Requesting</div>
            <div>Wallet Address</div>
          </div>
          <div class="flex ring-1 ring-gray-300 flex rounded-full items-justify justify-between font-bold py-2 px-4 m-1">
                <div>{{selectedProposal.requestedAmount}} BSV</div>
                <div>{{selectedProposal.payoutAddress}}</div>
          </div>
        </div>
      </div>
      <div class="propchat mt-6 mb-6 overflow-y-scroll flex-col ring-gray-400 ring-2 rounded-xl" >
        <div class="flex items-center justify-center mb-5">
          <div> <img class='h-5 mx-auto' src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png"/></div>
          <div class="font-bold text-2xl text-white uppercase tracking-2xl"> Propsal Chat</div>
        </div>
        <div class=" pt-2  overflow-y-scroll" style='max-height:600px;'>
          <Messages />
          <div ref="bottom"></div>
        </div>
        <div v-if='true' class="w-full bg-white rounded-b-lg ">
          <form @submit.prevent="send(selectedProposal.propId)" class="w-full text-lg flex ">
              <input class='w-full rounded-2xl h-16' rows="2" v-model="message" placeholder="type to chad" :disabled="!canAccess"  required>
              <button>
                  <SendIcon></SendIcon>
              </button>
          </form>
        </div>
      </div>
      <div class="break2"></div>
      
        <div class="propchat mt-6 mb-6 overflow-y-scroll flex-col ring-gray-400 ring-2 rounded-xl" >
        <div class="flex items-center justify-center mb-5">
          <div> <img class='h-5 mx-auto' src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png"/></div>
          <div class="font-bold text-2xl text-white uppercase tracking-2xl"> Trollbox</div>
        </div>
        <div class=" pt-2  overflow-y-scroll" style='max-height:600px;'>
          <Messages :isTrollbox="true"/>
          <div ref="bottom"></div>
        </div>
        <div v-if='true' class="w-full bg-white rounded-b-lg ">
          <div  class="w-full text-lg flex ">
              <input class='w-full rounded-2xl h-16' rows="2" v-model="message" placeholder="type to chad" :disabled="!canAccess"  required>
              <button @click="send('Public')" >
                  <SendIcon></SendIcon>
              </button>
          </div>
        </div>
      </div>
        
    </div>
    </div>
  
</template>

<script>
import {ref} from 'vue'
import { mapState } from 'vuex'
import { useProposals, getVotes, getAllVotes } from './../services/firebase'
import { useChat } from './../services/firebase'
import { useStore } from 'vuex'
import { useRun } from './../services/wallet'
import Messages from '@/components/Messages.vue'
import SendIcon from '../components/SendIcon.vue'

export default {
  name: 'Proposal-Detail',
  components: {
    Messages,
    SendIcon
  },
  setup() {
    const message = ref ('');
    const store = useStore()
    const {canAccess} = useRun();
    const { proposals, sendVote } = useProposals(store.state.relayx_handle, store.state.user_address)
     const {sendMessage } = useChat(store.state.relayx_handle, store.state.user_address)
    const cast = (propId,vote) => {
        sendVote(propId,vote)  
    }

    console.log(proposals)
  

    const { votes } =  getVotes(store.state.user_address)
    const allVotes  = getAllVotes()
  
    return { proposals, cast, votes, allVotes, canAccess, sendMessage, message }  


  },
  methods:{
    goBack(){
      this.$router.push('/');
    },
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
    },
    send(propCode) {
      if(this.$store.state.relayx_handle !== ""){
          console.log('Sending Started', this.message, propCode, this.$store.state.gopnikId)
          this.sendMessage(this.message, propCode, this.$store.state.gopnikId)
          console.log('Sending Complete')
          this.message= ''
          //bottom.value?.scrollIntoView({ behavior: 'smooth' })
      } else{
          alert('you are not logged in')
      }
    }
  },
  computed: {
    ...mapState(['selected_proposalId']),
    postedDate(){
      try{
         let date = new Date(this.selectedProposal.createdOn.seconds * 1000);
         return date.toDateString()
      }catch(err){
        console.log(err)
      }
      return '';
      
    },
    selectedProposal() {
      if(this.proposals.length === 0){
        return {propsal: {title: '', photoURL: '', proposedBy: ['', ''], createdOn: '',endsOn: '', question: '' }}
      }
      let sp = this.proposals.filter(p => p.propId === this.$store.state.selected_proposalId)[0]
      console.log(sp)
      return sp;
    },
    selectedProposalQuestionText(){
      if(!this.canAccess){
        return "Connect wallet to see the proposal details..." 
      }
      return this.selectedProposal.question;
    }
  }
}
</script>