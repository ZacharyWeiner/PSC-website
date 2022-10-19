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
    const userActionsCollection = firestore.collection('userActions')
    const profile = ref()

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

    const addUserProfile = (_handle, _address, _handcash, _twitter, _email, _phone) => {
        userProfilesCollection.add({
            relay_handle: _handle,
            ownerAddress: _address,
            handcashHandle: _handcash,
            twitterHandle: _twitter,
            email: _email,
            phone: _phone,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        console.log('profile-updated')

    }
    const findProfile = (id) => {
        userProfilesCollection.onSnapshot(snapshot => {
            profile.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.id === id)
         })
         return { profile }
    }
    const findProfileByHandle = (_relayHandle) => {
        userProfilesCollection.onSnapshot(snapshot => {
            profile.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.relay_handle === _relayHandle)
         })
         return profile
    }
    const updateUserProfile = (profileId, _handle, _address, _handcash, _twitter, _email, _phone, _twetch) => {
        userProfilesCollection.doc(profileId).update({
            relay_handle: _handle,
            ownerAddress: _address,
            handcashHandle: _handcash,
            twitterHandle: _twitter,
            email: _email,
            phone: _phone,
            twetchHandle: _twetch,
        })

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
    const unclaimed = ref([])
    const findUnclaimed = () => {
       
        userActionsCollection.onSnapshot(snapshot => {
            unclaimed.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(o => o.claimed !== true)
                
         })
         console.log(unclaimed)
         return unclaimed
    }

    const markClaimed = (claim) => {
        userActionsCollection.doc(claim.id).update({
            claimed: true
        })

    }

    return { findUserProfile, findProfile, findProfileByHandle, addUserProfile, updateUserProfile,  allActions, setUserAction, findUserActions, findUnclaimed, markClaimed }
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
    
    // const getCurrentGame = () => {
    //     const currentGame = ref()
    //     activeBingoGame.onSnapshot(snapshot => {
    //         currentGame.value = snapshot.docs    
    //             .map(doc => ({ id: doc.id, ...doc.data() }))
    //     })
    //     return currentGame
    // }

    const getCurrentGame = () => {
        const currentGame = ref([])
        const unsubscribe =  activeBingoGame.onSnapshot(snapshot => {
            currentGame.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
        })
        onUnmounted(unsubscribe)
        return currentGame
    }

   

    const getCurrentGameBingos = (gameId) => {
        const currentGameBingos = ref([])
        const  unsubscribeCurrentBingos  = usersBingoCollection.onSnapshot(snapshot => {
            currentGameBingos.value = snapshot.docs    
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(g => g.gameId === gameId)
                console.log("finding bingos for game ", gameId)
                console.log(currentGameBingos)
        })
        onUnmounted(unsubscribeCurrentBingos)
        return currentGameBingos 
    }

    const newGame = (session) => {
        bingoGamesCollection.add({
            gameStart: firebase.firestore.FieldValue.serverTimestamp(),
            gameEnd: '',
            gameComplete: false,
            winningNumbers: [],
            calledBingo: [],
            winners: [],
            session: session

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

    const setWinner = (id, _handle, _owner, _loc, _edition, _txid) => {
        const winner = {
            relayHandle: _handle,
            ownerAddress: _owner,
            cardLocation: _loc,
            edition: _edition,
            txid: _txid
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
            txid: bingo.txid,
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

export function gameSessionCards(handle, session){
    const userGameSessionCardsCollection = firestore.collection('userGameSessionCards')
    const userGameSessionCards = ref([]);

    const fetchUserGameSessionCards = () => { 
        userGameSessionCardsCollection.onSnapshot(snapshot => {
            userGameSessionCards.value = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(gc => gc.handle === handle && gc.session === session)
        })
        console.log("fetched cards");
    }
    onUnmounted(fetchUserGameSessionCards)

    const addCardToSession = (session, handle, edition, user_address) => {
        userGameSessionCardsCollection.add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            handle: handle,
            edition: edition,
            user_address: user_address,
            session: session

        })
        console.log("card added")
    }
    return {addCardToSession, fetchUserGameSessionCards, userGameSessionCards}

}
export function useAdvertisements() {
    const advertisementCollection = firestore.collection('advertisements')
    const allAdvertisements = ref([])
    const unsubscribe =  advertisementCollection.onSnapshot(snapshot => {
        allAdvertisements.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(unsubscribe)


    const newAdvertisment = () => {
        advertisementCollection.add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            title: '',
            description: '',
            linkURL: '',
            photoURL: '',
            orderId: 0,
            viewCount: 0,
            clickCount: 0
        })
        console.log('new advertisement')
    }

    const updateCount = (id, count) => {
        advertisementCollection.doc(id).update({
            clickCount: ++count
        })
        console.log('updated count')
    }

    const updateView = (id, _viewCount) => {
        advertisementCollection.doc(id).update({
            viewCount: ++_viewCount
        })
        console.log('updated view')
    }



    return {allAdvertisements, newAdvertisment, updateCount, updateView}
}