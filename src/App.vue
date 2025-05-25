<script setup lang="ts">
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

import Carousel from './components/Carousel.vue'
import BirthdayHint from './components/BirthdayHint.vue'
import LuckyApple from './components/LuckyApple.vue'
import ClickApples from './components/ClickApples.vue'
import GetCard_modified from './components/GetCard_modified.vue'
import Intro from './components/Intro.vue'

const imagePaths = [
  '/assets/img/01.jpeg',
  '/assets/img/02.jpeg',
  '/assets/img/03.jpeg',
  '/assets/img/04.jpeg',
  '/assets/img/05.jpeg',
  '/assets/img/06.jpeg',
  '/assets/img/07.jpeg',
]
</script>

<template>
  <!-- 點擊效果 -->
  <ClickApples />
  <!-- 頁首 -->
  <Header/>
  <div class="app">
    <!-- 輪播 -->
    <Carousel :image-list="imagePaths" :interval-ms="3000"/>
    <!-- 簽名區 -->
    <BirthdayHint name="夏以晝" avatarUrl="/assets/img/avatar.png" link="/birthday"/>
    <!-- 介紹 -->
    <Intro/>
    <!-- 故事卡 -->
    <!-- <BirthdayStory 
      name="夏以晝" 
      :storyLines="[
        '『大概是因為... 追隨溫暖是本能，我也不例外』',
        '『我聽見你說 「現身吧！夏以晝」了』',
      ]" 
      storyImage="/assets/img/avatar.png" 
      voiceUrl="/assets/audio/birthday_message.mp3"
      videoUrl="/assets/video/birthday_video.MP4"
      /> -->
    <!-- 幸運蘋果 -->
    <LuckyApple/>
    <!-- 手寫信 -->
    <GetCard_modified/>
  </div>
  <!-- 頁尾 -->
  <Footer/>
</template>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: linear-gradient(120deg, #f9d4ec, #fcd3b6, #d5f0ff);
  // background: linear-gradient(150deg, #FFDA78, #FF7F3E, #2A629A);
  background: linear-gradient(to bottom, #fcd3b6 0%, #FFDA78 80%, #FF7F3E 100%);


  min-height: 100vh;
}

</style>
