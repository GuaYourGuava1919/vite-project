<template>
  <div class="wrapper">
    <!-- 導航麵包屑 -->
    <button class="breadcrumb">
      <div class="marquee">
        <div class="marquee-text"><img src="/assets/img/sunplane.png" alt="breadcrumb-icon" class="breadcrumb-icon" />夏以晝・生日快樂！</div>
      </div>
    </button>


    <!-- 標題區 -->
    <div class="title">
      <p>哥哥就是應該保護妹妹的</p>
      <img src="/assets/img/oni06.gif" alt="title-image" class="title-image" />
    </div>

    <!-- 長輩圖區塊 -->
    <section class="carousel-section">
      <div class="custom-carousel">
        <div
          class="carousel-slide"
          v-for="(img, index) in imagePaths"
          :key="index"
          :class="{ active: index === activeIndex, left: index === prevIndex, right: index === nextIndex }"
        >
          <img :src="img" alt="carousel-image" />
        </div>
      </div>
    </section>

    <!-- 哥哥影片區塊 -->
    <section class="video-section">
      <h2>🎥 載"哥"載舞</h2>
      <video
        ref="videoRef"
        class="video-player"
        :src="currentVideo"
        autoplay
        playsinline
        loop
        :muted="false"
        controls
      ></video>

      <!-- 魔法按鈕群（四格） -->
      <div class="button-grid">
        <div class="grid-hint">
          <!-- <p>點點看！</p> -->
        </div>
        <button @click="playVideo(character.video)" class="play-audio-btn pink">哥之舞動🕺</button>
        <button @click="playVideo(character.darkVideo)" class="play-audio-btn black">黑魔法詠唱🧙🏼‍♂️</button>
        <button @click="playVideo(character.activateVideo)" class="play-audio-btn purple">喚醒哥哥💋</button>
        <button @click="playVideo(character.puppyVideo)" class="play-audio-btn orange">誰是小狗？🐕</button>
      </div>
    </section>

    <!-- 點擊魔法效果 -->
    <div id="magic-effect-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imagePaths = [
  '/assets/img/14.PNG',
  '/assets/img/15.PNG',
  '/assets/img/16.PNG',
]

const activeIndex = ref(0)
const prevIndex = ref(imagePaths.length - 1)
const nextIndex = ref(1)

const cycleCarousel = () => {
  activeIndex.value = (activeIndex.value + 1) % imagePaths.length
  prevIndex.value = (activeIndex.value - 1 + imagePaths.length) % imagePaths.length
  nextIndex.value = (activeIndex.value + 1) % imagePaths.length
}

setInterval(cycleCarousel, 2000)

const character = {
  name: '夏以畫',
  video: '/assets/video/birthday_video.MP4',
  darkVideo: '/assets/video/dark_magic.MOV',
  activateVideo: '/assets/video/activate_me.MOV',
  puppyVideo: '/assets/video/puppy.MOV',
  audio: '/assets/audio/birthday_message.mp3'
}

const currentVideo = ref(character.video)
const videoRef = ref<HTMLVideoElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)

const playVideo = (v: string) => {
  currentVideo.value = v
  if (videoRef.value) {
    videoRef.value.muted = false
    videoRef.value.play()
  }
  audioRef.value?.play()
}


</script>



<style scoped lang="scss">
.wrapper {
  background: linear-gradient(to bottom, #fff4e6, #ffd6b8);
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

.title {
  p {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #fb923c;
    text-shadow: 1px 1px 2px #fff;
  }
  .title-image {
    max-width: 160px;
    margin-top: 0.5rem;
  }
}

.carousel-section {
  margin-top: 2rem;
  .custom-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    height: 300px;
    position: relative;
    overflow: hidden;
  }
  .carousel-slide {
    position: absolute;
    transition: transform 0.6s ease, opacity 0.6s ease;
    width: 280px;
    padding: 10px;
    img {
      width: 100%;
      border-radius: 20px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    &.active {
      transform: translateX(0) scale(1.1) rotateY(0);
      z-index: 3;
    }
    &.left {
      transform: translateX(-220px) rotateY(45deg) scale(0.9);
      z-index: 2;
    }
    &.right {
      transform: translateX(220px) rotateY(-45deg) scale(0.9);
      z-index: 2;
    }
  }
}

.video-section {
  margin-top: 2rem;
  h2 {
    font-size: 2.5rem;
    color: #f97316;
    margin-bottom: 1rem;
  }
}

.video-player {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  border: 3px solid #ffd1dc;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 1rem auto;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
}

.grid-hint {
  grid-column: span 2;
  margin-bottom: -0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #f97316;
}

.play-audio-btn {
  padding: 1rem;
  font-size: 1.1rem;
  width: 150px;
  height: 150px;
  // border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
  &:hover {
    transform: scale(1.05);
    // box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
}

.pink {
  background-color: #f472b6;
  color: white;
  box-shadow: 6px 4px 2px #ff0084;
  &:active {
    background-color: #ff0084;
    box-shadow: 6px 4px 2px #f472b6;
  }
}
.black {
  background-color: #000000;
  color: #d438ff;
  box-shadow: 6px 4px 2px #6d6d6d;
  &:active {
    background-color: #6d6d6d;
    box-shadow: 6px 4px 2px #000000;
  }
}

.purple {
  background-color: $secondary-color;
  color: white;
  box-shadow: 6px 4px 2px #0066ff;
  &:active {
    background-color: #4c00ff;
    box-shadow: 6px 4px 2px $secondary-color;
  }
}
.orange {
  background-color: $primary-color;
  box-shadow: 6px 4px 2px #ffc343;
  color: white;
  &:active {
    background-color: #ff7300;
    box-shadow: 6px 4px 2px $primary-color;;
  }
}

.breadcrumb {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  background: linear-gradient(to right, #003285, #2A629A);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 30px;
  width: 100%;
  margin-bottom: 40px;
}

.marquee {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 50px;
  img{
    width: 50px;
    margin-right: 10px;
  }
}

.marquee-text {
  display: inline-block;
  white-space: nowrap;
  position: absolute;
  font-size: 2rem;
  animation: marquee 8s linear infinite;
}

@keyframes marquee {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

@keyframes pop-out {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
