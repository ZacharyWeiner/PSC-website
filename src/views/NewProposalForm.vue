<template>
<div class='max-w-2xl mx-auto'>
    <div class="pt-20 m-1 text-white text-left text-2xl font-bold text-center">
        Submit New Proposal
    </div>

    <form @submit.prevent="sendNewProposal" class="w-full max-w-lg bg-white rounded-lg px-5 py-10">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Title
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="title"  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text">
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Question
            </label>
            </div>
            <div class="md:w-2/3">
                <textarea v-model="question" id="about" name="about" rows="3" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                <p class="mt-2 text-sm text-gray-500">Enter your proposal details.</p>
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Requested Amount
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="requestedAmount" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" >
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Payout Address
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="payoutAddress" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" >
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Photo URL
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="photoURL" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" >
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Ends On Date
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="endOnDate" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 date-picker" id="inline-full-name" type="date" >
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Proposed By Name
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="authorName" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" >
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Proposed By Number
            </label>
            </div>
            <div class="md:w-2/3">
            <input v-model="authorNumber" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" >
            </div>
        </div>
        <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
            <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
            </button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useProposals } from './../services/firebase'
const approved = ["gopniks", "metadesk", "pewparty", "stevenk", "lexssit", "claudia"]
export default {
    setup(){
     
        const payoutAddress = ref('')
        const photoURL = ref('')
        const propId = ref('')
        const title = ref('')
        const question = ref('')
        const requestedAmount = ref('')
        const authorName = ref('')
        const authorNumber = ref('')
        const endOnDate = ref('')

        const store = useStore()
        const { sendProposal } = useProposals(store.state.relayx_handle, store.state.user_address)
        
        const randomString = (length, chars) => {
            let result = '';
            for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result

        }
        let rString = randomString(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')

        const constructJSON = () => {
            let proposal = {
                payoutAddress: payoutAddress.value, 
                photoURL: photoURL.value, 
                propId: rString, 
                title: title.value, 
                question: question.value, 
                requestedAmount: requestedAmount.value,
                authorName: authorName.value,
                authorNumber: authorNumber.value,
                endOnDate: endOnDate.value
            }    

            return proposal 
        }


        const sendNewProposal = () => {
            if(store.state.relayx_handle !== "") {

                let _prop = constructJSON()
                console.log({_prop})

                sendProposal(_prop)
                
            } else {
                alert('you are not logged in')
            }
            
        }

        return { store, sendNewProposal, payoutAddress, photoURL, propId, title, question, requestedAmount, authorName, authorNumber, endOnDate  }

    },
    mounted(){
        if(approved.indexOf(this.$store.state.relayx_handle) === -1){
            alert('You need to be whitelisted to add a proposal while we are in beta. Please reach out to @Gopnikz to be added.')
            this.$router.push('/')
        }
    }

}

</script>
