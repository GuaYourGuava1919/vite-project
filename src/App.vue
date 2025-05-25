<template>
  <!-- 點擊效果 -->
  <ClickApples />
  <!-- 頁首 -->
  <Header/>
  <router-view/>
  <!-- 頁尾 -->
  <Footer/>
  
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ClickApples from './components/ClickApples.vue'
</script>
