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


export function userProfiles() {
    const userProfilesCollection = firestore.collection('userProfiles')
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


    const userActionsCollection = firestore.collection('userActions')
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
    const countersCollection = firestore.collection('counters')

    const allCounters = ref([])
    const unsubscribe =  countersCollection.onSnapshot(snapshot => {
        allCounters.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)

    const findCounter = (id) => {
        const counter = ref()
        countersCollection.onSnapshot(snapshot => {
            counter.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.id === id)
         })
         return { counter }
    }

    const findMintCounter = () => {
        const counter = ref()
        countersCollection.onSnapshot(snapshot => {
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
    const orderedOrdersCollection = firestore.collection('orders').orderBy('createdAt', "desc")
    const ordersCollection = firestore.collection('orders');
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
    const redemptionsCollection = firestore.collection('redemptions');
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

export function useBingo() {
    const bingoGamesCollection = firestore.collection('bingoGames')
    const activeBingoGame = bingoGamesCollection.orderBy('gameStart').limitToLast(1)
    const usersBingoCollection = firestore.collection('callBingo')

    const getCurrentGame = () => {
        const currentGame = ref()
        activeBingoGame.onSnapshot(snapshot => {
            currentGame.value = snapshot.docs    
                .map(doc => ({ id: doc.id, ...doc.data() }))
        })
        return currentGame
    }

    const getCurrentGameBingos = (gameId) => {
        const currentGameBingos = ref()
        usersBingoCollection.onSnapshot(snapshot => {
            currentGameBingos.value = snapshot.docs    
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(g => g.gameId === gameId)
                // console.log(gameId)
                // console.log(currentGameBingos)
        })
        return currentGameBingos 
    }

    onUnmounted(getCurrentGame, getCurrentGameBingos)

    const newGame = (_gamesession) => {
        bingoGamesCollection.add({
            gameStart: firebase.firestore.FieldValue.serverTimestamp(),
            gameEnd: '',
            gameComplete: false,
            winningNumbers: [],
            calledBingo: [],
            winners: [],
            gameSession: _gamesession

        })
        console.log('new game started')
    }

    const endGame = (id) => {
        bingoGamesCollection.doc(id).update({
            gameEnd: firebase.firestore.FieldValue.serverTimestamp(),
            gameComplete: true
        })
    }

    const setWinningNumber = (id, number) => {
        bingoGamesCollection.doc(id).update({
            winningNumbers: firebase.firestore.FieldValue.arrayUnion(number)
        })

    }

    const setWinner = (id, _handle, _owner, _loc) => {
        const winner = {
            relayHandle: _handle,
            ownerAddress: _owner,
            cardLocation: _loc
        }
        
        bingoGamesCollection.doc(id).update({
            winners: firebase.firestore.FieldValue.arrayUnion({winner})
        })
        console.log('added winner', winner)
    }

    const userCallBingo = (bingo, cardId, gameId) => {
        usersBingoCollection.add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            relayHandle: bingo.handle,
            ownerAddress: bingo.owner,
            cardLocation: bingo.card,
            edition: cardId,
            gameId: gameId
        })
        console.log('User Called Bingo!', gameId )
    }

    const deleteUserBingo = (id) => {
        // console.log(id)
        usersBingoCollection.doc(id).delete()
    }

    return { getCurrentGame , newGame, endGame, setWinner, setWinningNumber, userCallBingo, deleteUserBingo, getCurrentGameBingos}
}
