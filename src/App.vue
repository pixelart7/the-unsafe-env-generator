<template lang="pug">
.app.p-8
  .mx-auto(class="max-w-[800px]")
    .text-2xl.font-bold.mb-6 The Unsafe ENV Generator
    label.text-sm.opacity-75.block Config YML (starts with "generator:")
    textarea.border.rounded.mt-2.w-full.p-2.text-xs.font-mono(v-model="config" rows=10)
    .text-right: button.bg-blue-500.px-6.py-2.rounde.text-white.text-sm.rounded(class="hover:bg-blue-600" @click="submit") Generate
    hr.my-8.border-t
    div(v-for="d in display")
      h1.text-xl {{ d[0] }}
      div(v-for="(track, trackName) in d[1]")
        h2.text-lg.mt-3.font-bold Track: {{ trackName }}
        .grid.grid-cols-2.gap-3.mt-3
          .border.rounded.p-2.flex-1(v-for="(app, appName) in track")
            h3.text-base.font-bold.mb-2 {{ appName }}
            textarea.w-full.text-xs.border.rounded.p-1(:value="app" rows=25) 
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { generate } from './env-generator';

const config = ref('');
const display = ref([]);

/* @ts-ignore */
function submit() {
  /* @ts-ignore */
  display.value = generate(config.value); /* @ts-ignore */
}
</script>

<style lang="scss">
// .app {}
</style>
