<template>
  <img class="w-10 min-w-10 h-10 rounded-full" :src="src" />
</template>

<script>
export default {
  props: { src: { type: String, default: '' } }
}
</script>
