<template>
  <div class="wrapper">
    <!-- 背景音樂 -->
    <audio src="/assets/audio/bgm.mp3" autoplay loop />

    <!-- 開場卡片 -->
    <div class="intro-card">
      <div class="top-note">
        歡迎來到特別來賓的魔法祝福空間
      </div>
      <div class="base-info">
        <h1 class="character-name">讓哥哥跳舞給你看XD</h1>
        <!-- <img :src="character.image" alt="角色圖片" class="avatar" /> -->
      </div>
    </div>

    <!-- 影片播放 -->
    <video
      ref="videoRef"
      class="video-player"
      :src="character.video"
      autoplay
      muted
      playsinline
      loop
    ></video>

    <!-- 播放語音 -->
    <button @click="playAudio" class="play-audio-btn">
      ✨ 開啟生日魔法 ✨
    </button>
    <button @click="playAudio" class="play-audio-btn">
      ✨ 黑魔法詠唱 ✨
    </button>

    <audio ref="audioRef" :src="character.audio" />

    <!-- 櫻花動畫容器 -->
    <div id="sakura-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const character = {
  name: '夏以畫',
  image: '/assets/img/pic.jpg',
  video: '/assets/video/birthday_video.MP4',
  audio: '/assets/audio/birthday_message.mp3'
}

const videoRef = ref<HTMLVideoElement | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)

const playAudio = () => {
  audioRef.value?.play()
}

onMounted(() => {
  // 語音播放完跳轉
  audioRef.value?.addEventListener('ended', () => {
    setTimeout(() => {
      router.push('/blessing')
    }, 1500)
  })

  // 櫻花動畫生成
  const sakuraContainer = document.getElementById('sakura-container')
  const createPetal = () => {
    const petal = document.createElement('div')
    petal.className = 'sakura-petal'
    petal.style.left = `${Math.random() * 100}vw`
    petal.style.animationDuration = `${5 + Math.random() * 5}s`
    sakuraContainer?.appendChild(petal)
    setTimeout(() => petal.remove(), 10000)
  }
  setInterval(createPetal, 300)

  // 點擊爆炸心型粒子
  document.addEventListener('click', (e) => {
    const heart = document.createElement('div')
    heart.className = 'magic-heart'
    heart.style.left = `${e.clientX}px`
    heart.style.top = `${e.clientY}px`
    document.body.appendChild(heart)
    setTimeout(() => heart.remove(), 1000)
  })
})
</script>

<style scoped lang="scss">
@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1.1);
  }
}
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 12px #fcd1e6;
  }
  50% {
    box-shadow: 0 0 24px #ffd6eb;
  }
}
@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
@keyframes pop {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

/* 基礎背景 */
.wrapper {
  background: linear-gradient(100deg, #fde2f3cc, #e4d0f0cc, #d3e0ffcc);
  background-size: 200% 200%;
  animation: gradientFlow 10s ease infinite;
  backdrop-filter: blur(6px);
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
  position: relative;
  z-index: 10;
}

/* 卡片區 */
.intro-card {
  // background: rgba(255, 255, 255, 0.25);
  background: url('/assets/img/pic.jpg') no-repeat center/cover;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(255, 192, 203, 0.3);
  animation: popIn 1s ease-out;
  animation: float 4s ease-in-out infinite;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 標題浮動 */
.top-note {
  font-size: 1.5rem;
  color: $secondary-color;
  margin-bottom: 1rem;
  animation: float 4s ease-in-out infinite;
  text-shadow: 0 2px 4px rgba(255, 182, 193, 0.5);
}

/* 名稱與頭像 */
.base-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 4s ease-in-out infinite;
}
.character-name {
  font-size: 2rem;
  font-weight: bold;
  color: #f472b6;
  margin-bottom: 0.5rem;
}

/* 魔法頭像 */
.avatar {
  width: 500px;
  height: 500px;
  // border-radius: 50%;
  border: 4px solid #f9dbe3;
  box-shadow: 0 4px 8px rgba(255, 182, 193, 0.3);
  margin-bottom: 1rem;
  object-fit: cover;
  position: relative;
  z-index: 5;
  animation: glow 6s ease-in-out infinite;
}
.avatar::after {
  content: '';
  position: absolute;
  top: -6px;
  left: -6px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed #ffd6eb;
  animation: spin 10s linear infinite;
  box-shadow: 0 0 8px #ffd6eb;
  z-index: -1;
}

/* 影片區 */
.video-player {
  width: 90%;
  max-width: 480px;
  border-radius: 12px;
  border: 2px solid #f9dbe3;
  box-shadow: 0 4px 8px rgba(255, 182, 193, 0.3);
  margin: 1rem auto;
  display: block;
}

/* 播放按鈕 */
.play-audio-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  margin: 1rem auto;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  color: white;
  width: fit-content;
  min-width: 200px;
}

/* 第一顆：生日魔法（粉紅） */
.play-audio-btn:nth-of-type(1) {
  background-color: #f472b6;
}
.play-audio-btn:nth-of-type(1):hover {
  background-color: #ec4899;
}

/* 第二顆：黑魔法（紫） */
.play-audio-btn:nth-of-type(2) {
  background-color: #8b5cf6;
}
.play-audio-btn:nth-of-type(2):hover {
  background-color: #7c3aed;
}

@keyframes neonGlow {
  0% {
    text-shadow: 0 0 8px #ffc0cb, 0 0 12px #f9c2d5;
  }
  100% {
    text-shadow: 0 0 12px #fcd1e6, 0 0 20px #ffd6eb;
  }
}

.top-note,
.character-name {
  animation: neonGlow 2s ease-in-out infinite alternate;
}


/* RWD */
@media (max-width: 600px) {
  .avatar {
    width: 96px;
    height: 96px;
  }
  .character-name {
    font-size: 1.5rem;
  }
  .play-audio-btn {
    width: 100%;
    font-size: 1rem;
  }
}

/* 櫻花動畫 */
#sakura-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.sakura-petal {
  position: absolute;
  top: -2rem;
  width: 20px;
  height: 20px;
  background: url('/assets/img/sakura.png') no-repeat center/contain;
  opacity: 0.8;
  animation: fall linear infinite;
}

/* 點擊魔法心型 */
.magic-heart {
  position: fixed;
  width: 30px;
  height: 30px;
  background: url('https://emojiapi.dev/api/v1/heart_decoration/128.png') no-repeat center/contain;
  animation: pop 1s ease-out forwards;
  pointer-events: none;
  z-index: 9999;
}
</style>
