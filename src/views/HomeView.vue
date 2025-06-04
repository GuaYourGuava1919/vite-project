<template>
    <div class="app">
        <!-- 輪播 -->
        <Carousel :image-list="imagePaths" :interval-ms="3000"/>
        <!-- 簽名區 -->
        <!-- 介紹 -->
        <Intro/>
        <!-- 幸運蘋果 -->
        <LuckyApple/>
        <!-- 手寫信 -->
        <GetCard_modified/>
        <!-- 前往樂園 -->
        <GotoRakuen/>
  </div>
</template>

<script setup lang="ts">
import Intro from '../components/Intro.vue'
import Carousel from '../components/Carousel.vue'
import LuckyApple from '../components/LuckyApple.vue'
import GotoRakuen from '../components/GotoRakuen.vue'
import GetCard_modified from '../components/GetCard_modified.vue'

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