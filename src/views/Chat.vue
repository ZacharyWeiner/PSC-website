<template>
  <div class="chat container-lg">
    <h1>Chat amongst your Gopnicks</h1>
    <Messages />
  </div>
</template>

<script>

import Messages from '@/components/Messages.vue'

export default {
  name: 'Chat',
  components: { Messages }
}
</script>