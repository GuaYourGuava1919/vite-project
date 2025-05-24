<template>
  <section class="birthday-story">
    <h2 class="animated-text">{{ name }}0613生日特典</h2>
    <div class="countdown animated-text">{{ countdownText }}</div>
    <div class="story-box">
      <p
        v-for="(line, i) in storyLines"
        :key="i"
        class="animated-line"
        :style="{ animationDelay: `${i * 0.3}s` }"
      >
        {{ line }}
      </p>
      <div class="media-container">
        <img v-if="storyImage && !showVideo" :src="storyImage" class="story-img" @click="handleClick"/>
        <!-- <button @click="handleClick"></button> -->
        <video
          v-if="showVideo && videoUrl"
          class="story-video animated-text"
          autoplay
          muted
          loop
          playsinline
          :src="videoUrl"
        />
      </div>
      <audio v-if="voiceUrl" controls :src="voiceUrl" class="voice-player" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { name, storyLines, storyImage, voiceUrl } = defineProps<{
  name: string
  storyLines: string[]
  storyImage?: string
  voiceUrl?: string
  videoUrl?: string
}>()
import { ref, onMounted, onUnmounted } from 'vue'

const countdownText = ref('')
const showVideo = ref(false)


const targetDate = new Date(`${new Date().getFullYear()}-06-13T00:00:00`)

const handleClick = () => {
  showVideo.value = true
  if (showVideo.value) {
    console.log('播放影片')
  } else {
    console.log('隱藏影片')
  }
}

const updateCountdown = () => {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

  if (diff <= 0) {
    countdownText.value = '🎉 生日快樂！'
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  countdownText.value = `倒數 ${days}天 ${hours}時 ${minutes}分 ${seconds}秒`
}

let timer: number

onMounted(() => {
  updateCountdown()
  timer = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style scoped lang="scss">
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseText {
  0% {
    text-shadow: 0 0 10px rgba(255, 200, 240, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 160, 220, 0.9);
  }
  100% {
    text-shadow: 0 0 10px rgba(255, 200, 240, 0.5);
  }
}

.animated-line {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.animated-text {
  animation: fadeInUp 0.8s ease-out forwards, pulseText 2.5s infinite alternate;
  // display: inline-block;
}

.birthday-story {
  padding: 2rem 1rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  h2 {
    font-size: 36px;
    color: $background-color;
    margin-bottom: 1rem;
    text-align: center;
  }

  .story-box {
    border-radius: 1rem;
    padding: 1.2rem;
    font-size: 24px;
    color: #f5f5f5;
    line-height: 1.6;
    text-align: center;
    .media-container {
      display: flex;
      position: relative;
      // flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 1.5rem;
      .thought-icon {
        position: absolute;
        background-color: $primary-color;
        top: 10px;
        right: 10px;
        width: 100px;
        height: 60px; // 🔥 明確指定高度
        z-index: 1000; // 🔥 確保在最上層
        border-radius: 20px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .story-video {
        display: block;
        width: 80%;
        height: 80vh;
        max-width: 640px;
        margin: 1.5rem auto;
        // border-radius: 1rem;
        // box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
      }
      .story-img {
        display: block;
        width: 300px;
        height: 300px;
        object-fit: cover;
        margin: 1.5rem auto;
        border-radius: 0.8rem;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }}

    .voice-player {
      display: block;
      margin: 1rem auto;
    }
  }
}
.countdown {
  text-align: center;
  font-size: 32px;
  color: pink;
  text-shadow:  0 0 10px rgba(255, 180, 217, 0.8);
  margin-bottom: 1rem;
}




</style>
