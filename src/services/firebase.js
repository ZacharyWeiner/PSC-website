import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firestore'
import { ref, onUnmounted } from 'vue'
import  {config}  from './../config'


firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
})


 const firestore = firebase.firestore()
 const messagesCollection = firestore.collection('messages')
 const messagesQuery = messagesCollection.orderBy('createdAt','desc').limit(100)
 const proposalsCollection = firestore.collection('proposals')
 const proposalsQuery = proposalsCollection.orderBy('propId')
 const votesCollection = firestore.collection('votes')
 const jackpotsCollection = firestore.collection('jackpots')

 export function useChat(_paymail, _owner) {
    const messages = ref([])
    const unsubscribe =  messagesQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            //.reverse()
    })
    onUnmounted(unsubscribe)
    
    const sendMessage = (text, propId, gopId) => {
        if (!propId) propId = ''
        if (!text.length) return

         messagesCollection.add({
            userName: _paymail,
            userId: _owner,
            userPhotoURL: '',
            text: text,
            gopnikId: gopId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            propId: propId
        })
    }
    

    return { messages, sendMessage }

 }

 export function useProposals(_paymail, _owner) {
    const proposals = ref([])
    const unsubscribe =  proposalsQuery.onSnapshot(snapshot => {
        proposals.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))

    })
    onUnmounted(unsubscribe)


    const sendVote = (propId,vote) => {
        console.log('working', _paymail, _owner )
        votesCollection.add({
            propId: propId,
            userId: _owner,
            userName: _paymail,
            vote: vote,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const sendProposal = (prop) => {
        if (!prop.title.length && !prop.question.length) return

        proposalsCollection.add({
            title: prop.title,
            photoURL: prop.photoURL,
            propId: prop.propId,
            question: prop.question,
            requestedAmount: prop.requestedAmount,
            authorName: prop.authorName,
            authorNumber: prop.authorNumber,
            payoutAddress: prop.payoutAddress,
            endOnDate: prop.endOnDate,
            createdOn: firebase.firestore.FieldValue.serverTimestamp()
            
        })
    }

    return { proposals, sendVote, sendProposal }

 }

 export function getVotes(_owner) {
    const votes = ref([])
    const unsubscribe = votesCollection.where('userId', '==', _owner).onSnapshot(snapshot => {
        votes.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            
    })
    onUnmounted(unsubscribe)

    return { votes } 
    
}

export function getAllVotes() {
    const allVotes = ref([])
   votesCollection.onSnapshot(snapshot => {
        allVotes.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            
    })
    // onUnmounted(unsubscribe)
    //console.log(response)
    return  allVotes
    
}

export function getJackpots(_paymail) {
    const jackpots = ref([])
    jackpotsCollection.onSnapshot(snapshot => {
        jackpots.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(j => j.userName === _paymail)
     })

     const addjackpot = (slavetteId) => {
        jackpotsCollection.add({
            userName: _paymail,
            slavetteId: slavetteId,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
     }
     
     const deleteJackpot = async (jackpotId) => {
        const res = await jackpotsCollection.doc(jackpotId).delete();
        return res;
     }


     return  { jackpots, addjackpot, deleteJackpot}
}

export function getAllJackpots() {
    const allJackpots = ref([])
    jackpotsCollection.onSnapshot(snapshot => {
        allJackpots.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
     })
     return  { allJackpots}
}