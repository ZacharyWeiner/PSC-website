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
const ordersCollection = firestore.collection('orders').orderBy('createdAt')


export function useOrders() {
    const allOrders = ref([])
    const unsubscribe =  ordersCollection.onSnapshot(snapshot => {
        allOrders.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)

    const sendOrder = (_txid, _paymail, _owner, _edition, _boolean) => {
        ordersCollection.add({
            txid: _txid,
            relayHandle: _paymail,
            runAddress: _owner,
            edition: _edition,
            isMinted: _boolean,
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

    return { allOrders, sendOrder, findOrders, markMinted }
}