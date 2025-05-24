<script setup lang="ts">
import  Carousel  from './components/Carousel.vue'
import BirthdayHint from './components/BirthdayHint.vue'
import BirthdayStory from './components/BirthdayStory.vue'
import BirthdayDialog from './components/BirthdayDialog.vue'
import LuckyApple from './components/LuckyApple.vue'
import Footer from './components/Footer.vue'

const imagePaths = [
  '/src/assets/img/01.jpeg',
  '/src/assets/img/02.jpeg',
  '/src/assets/img/03.jpeg',
  '/src/assets/img/04.jpeg',
  '/src/assets/img/05.jpeg',
  '/src/assets/img/06.jpeg',
  '/src/assets/img/07.jpeg',
]
</script>

<template>
  <div class="app">
  <Carousel :image-list="imagePaths" :interval-ms="3000"/>
  <BirthdayHint name="夏以晝" avatarUrl="/src/assets/img/avatar.png" link="/birthday"/>
  <BirthdayStory 
    name="夏以晝" 
    :storyLines="[
      '今天是夏以晝的生日！',
      '『大概是因為... 追隨溫暖是本能，我也不例外』',
      '『我聽見你說 「現身吧！夏以晝」了』',
    ]" 
    storyImage="/src/assets/img/avatar.png" 
    voiceUrl="/src/assets/audio/birthday_message.mp3" />
    <LuckyApple/>
    <BirthdayDialog
    :lines="[
      '今天，是我的生日。',
      '妳還記得嗎？',
      '其實，比起收到禮物，\n我更想見到妳。',
      '謝謝妳，讓這一天，變得不一樣了。'
    ]"
  />
</div>
<Footer/>
</template>

<style lang="scss">


</style>
