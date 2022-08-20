<template>
    <Menu />
    
    <div class="text-center w-full text-4xl text-white pt-12">
        <img class="w-64 mx-auto" src="https://slavettes-layers.s3.amazonaws.com/pewnicorns/HowToQR.png" /> 
    </div>
    <div class="text-center w-full text-4xl text-white p-12"> How To Get A Card: </div>
    <div class="flex pl-12 w-full text-white font-bold">
          <div class="flow-root mx-auto text-white">
            <ul role="list" class="-mb-8">
            <li v-for="(event, eventIdx) in timeline" :key="event.id">
                <div class="relative pb-12">
                <span v-if="eventIdx !== timeline.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                <div class="relative flex space-x-3">
                    <div>
                    <span :class="[event.iconBackground, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                        <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                        <p class="text-sm text-white">
                        {{ event.content }} <a :href="event.href" target="_blank" class="font-medium text-blue-500">{{ event.target }}</a>
                        </p>
                    </div>
                    <!-- <div class="text-right text-sm whitespace-nowrap text-white">
                        <time :datetime="event.datetime">{{ event.date }}</time>
                    </div> -->
                    </div>
                </div>
                </div>
            </li>
            </ul>
        </div>
    </div>
    <div class="text-center w-full text-2xl text-white"> Play Bingo! </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Menu from "./../../components/MenuComponent2.vue"
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/vue/solid'
const timeline = [
  {
    id: 1,
    content: 'Create A Relay X Wallet',
    target: 'Click Here',
    href: 'https://www.relayx.com',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-blue-400',
  },
  {
    id: 2,
    content: 'Use The Login Button In The Top Menu on this page To Login with your Relay Wallet:',
    target: '',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: ThumbUpIcon,
    iconBackground: 'bg-gray-500',
  },
  {
    id: 3,
    content: 'Tweet @ iampewnicorn for a card. Add your RelayX handle to the tweet before sending.',
    target: 'Click To Tweet',
    href: 'https://twitter.com/intent/tweet?text=Hi%20%40iampewnicorn%2C%20can%20you%20send%20a%20%23BingoCard%20to%20my%20relayx%20wallet%3F%20My%20Relay%20handle%20is%20%24',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Get a Card within 15 minutes ',
    target: '',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: ThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
]
export default {
    components:{Menu, CheckIcon, ThumbUpIcon, UserIcon},
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            timeline,
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>