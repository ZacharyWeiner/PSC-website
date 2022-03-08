<template>
   <div> 
                   <Message
                    v-for="{ id, text, userName, userId, gopnikId } in filteredMessages"
                    class='justify-end'
                    :key="id"
                    :name="userName"
                    :sender='userId === currentUserID'
                    :gopnikId="gopnikId"
                >
                    <Markdown 
                    :source="text"
                    :linkify="true"
                    :html="true"
                    :break="true"  />
                </Message>
    </div>       
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useChat } from './../services/firebase'
import { useRun } from '../services/wallet' 
import { useStore } from 'vuex'

//import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
import Markdown from 'vue3-markdown-it'


export default {
    components:{ Message, Markdown}, 
    setup() {
        const store = useStore()
        const showNewMessage = ref(true)
        //if(props.showForm === false){showNewMessage.value = false}
        //console.log("is Trollbox", this.isTrollbox)
        const { messages, sendMessage } = useChat(store.state.relayx_handle, store.state.user_address)
        const { canAccess } = useRun()
        const currentUserID = store.state.user_address
        const bottom = ref(null)

        watch(
            messages,
            () => {
                nextTick(() => {
                    //bottom.value?.scrollIntoView({ behavior: 'smooth' })
                })
            },
            {deep: true}
        )

        const message = ref('')
        const send = (propCode) => {
            if(store.state.relayx_handle !== ""){
                console.log('Sending Started')
                sendMessage(message.value, propCode, store.state.gopnikId)
                console.log('Sending Complete')
                message.value = ''
                //bottom.value?.scrollIntoView({ behavior: 'smooth' })
            } else{
                alert('you are not logged in')
            }
            
        }
        
        return { messages, bottom, message, send, currentUserID, canAccess, showNewMessage}

    },
    methods:{
        getChatCode() {
            if (this.isTrollbox) return 'Public'
            else return this.$store.state.selected_proposalId
        },
    },
    computed: {
        chatPlaceholder() {
            if (this.isLoggedIn) {
                return 'Type to chad'
            } 
            else {
                return 'Buy Gopnik to chad'
            }
        },
        isLoggedIn(){
            return this.$store.state.relayx_handle !== "";
        },
        chatEnabled(){
            return this.isLoggedIn ? true : false
        },
        filteredMessages (){
            console.log(this.$store.state.selected_proposalId)
            let _messages = []
            if(this.isTrollbox){_messages = this.messages.filter(m => ( m.propId === 'Public'))}
            if(this.$store.state.selected_proposalId !== '' && this.isTrollbox !== true){ _messages =  this.messages.filter( m => m.propId &&  m.propId === this.$store.state.selected_proposalId)}
            else {_messages = this.messages.filter(m => ( m.propId === 'Public'))}
            return _messages

        },
        
        getChatTitle() {
            if (this.isTrollbox) return 'Trollbox'
            else return 'Proposal Discussion'
        },
        getChatEmoji(){
            if (this.isTrollbox) return 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png'
            else return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/face-with-monocle_1f9d0.png"
        }
    },
    props: ['isTrollbox', "showForm"]
}
</script>
