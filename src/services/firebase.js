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
const userProfilesCollection = firestore.collection('userProfiles')
const userActionsCollection = firestore.collection('userActions')
const redemptionsCollection = firestore.collection('redemptions');

export function userProfiles() {

    const findUserProfile = (_owner) => {
        const userProfile = ref([])
        userProfilesCollection.onSnapshot(snapshot => {
            userProfile.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.ownerAddress === _owner)
         })
         console.log(userProfile)
         return { userProfile }
    }

    const setUserProfile = (_handle, _address) => {
        userProfilesCollection.add({
            relay_handle: _handle,
            ownerAddress: _address,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('profile-updated')

    }
    const allActions = ref([])
    const unsubscribe =  userActionsCollection.onSnapshot(snapshot => {
        allActions.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)


    const setUserAction = (_handle, _address, _action) => {
        userActionsCollection.add({
            relay_handle: _handle,
            ownerAddress: _address,
            userAction: _action,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('action-saved')
    }
    
    const findUserActions = (handle) => {
        console.log(handle)
        const userActions = ref([])
        userActionsCollection.onSnapshot(snapshot => {
            userActions.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.relay_handle === handle)
                
         })
         console.log(userActions)
         return {userActions}
    }

    return { findUserProfile, setUserProfile, allActions, setUserAction, findUserActions }
}

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

    const findMintCounter = () => {
        const counter = ref()
        ordersCollection.onSnapshot(snapshot => {
            counter.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.id === "hhVse4scRRUsm9gCGnC9")
         })
         return { counter }
    }
    
    const increment = () => {
        //let incrementer = 0;
        let incrementer = allCounters.value[0].count + 1
        countersCollection.doc('hhVse4scRRUsm9gCGnC9').update({
            count: incrementer
        })
    }

    return {allCounters, findCounter, findMintCounter, increment}

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

    const findReserved = () => {
        const orders = ref([])
        ordersCollection.onSnapshot(snapshot => {
            orders.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.isMinted === false)
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

    return { allOrders, sendOrder, findOrders, deleteOrder, markMinted, findReserved }
}

export function useRedemptions(){
    const allRedemptions = ref([])
    const unsubscribe =  redemptionsCollection.onSnapshot(snapshot => {
        allRedemptions.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)

    const sendRedemption = (_txid, _paymail, _owner, _edition, _amount) => {
        redemptionsCollection.add({
            txid: _txid,
            relayHandle: _paymail,
            runAddress: _owner,
            edition: _edition,
            amount: _amount,
            isRedeemed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('added Redemption')
    }

    const markRedeemed = (redemption) => {
        redemptionsCollection.doc(redemption.id).update({
            isRedeemed: true
        })

    }

    return {allRedemptions, sendRedemption, markRedeemed}
}