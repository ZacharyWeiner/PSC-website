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
const orderedOrdersCollection = firestore.collection('orders').orderBy('createdAt', "desc")
const ordersCollection = firestore.collection('orders');
const countersCollection = firestore.collection('counters')


export function useCounters(){
    const allCounters = ref([])
    const unsubscribe =  countersCollection.onSnapshot(snapshot => {
        allCounters.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)

    const findCounter = (id) => {
        const counter = ref()
        ordersCollection.onSnapshot(snapshot => {
            counter.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.id === id)
         })
         return { counter }
    }

    const increment = () => {
        let incrementer; 
        let counter = allCounters.value.find(c => c.id === "hhVse4scRRUsm9gCGnC9").count
        incrementer = counter +1
        countersCollection.doc('hhVse4scRRUsm9gCGnC9').update({
            count: incrementer
        })

    }

    return {allCounters, findCounter, increment}

}
export function useOrders() {
    const allOrders = ref([])
    const unsubscribe =  orderedOrdersCollection.onSnapshot(snapshot => {
        allOrders.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)

    const sendOrder = (_txid, _paymail, _owner, _edition, _isMinted) => {
        ordersCollection.add({
            txid: _txid,
            relayHandle: _paymail,
            runAddress: _owner,
            edition: _edition,
            isMinted: _isMinted,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('added Order')
    }

    
    const findOrders = (_handle) => {
        const orders = ref([])
        ordersCollection.onSnapshot(snapshot => {
            orders.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.relayHandle === _handle)
         })
         return { orders }

    }

    const markMinted = (order) => {
        ordersCollection.doc(order.id).update({
            isMinted: true
        })

    }

    const deleteOrder = (order) => {
        ordersCollection.doc(order.id).delete();
     }

    return { allOrders, sendOrder, findOrders, deleteOrder, markMinted }
}