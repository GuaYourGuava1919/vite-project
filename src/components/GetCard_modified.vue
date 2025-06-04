<template>
  <div class="gacha-container">
    <p>遊戲抽不到沒關係，來這裡抽XD<br/>（記得開聲音，有驚喜！）</p>
    <img class="corner-deco" src="/assets/img/oni05.gif" alt="裝飾圖" />

    <div
      class="card-display"
      :class="{
        flipped: isFlipping,
        'shiny-flash': isRare,
        'shake': isRare
      }"
      @click="drawCard"
    >
      <div class="card-content" v-if="currentCard">
        <img :src="currentCard.image" :alt="currentCard.name" />
        <!-- <div v-if="isRare" class="rare-text">稀有卡！</div> -->
      </div>
      <div v-else>
        <p style="color: aliceblue;">按一下來抽卡吧！</p>
      </div>
    </div>

    <!-- 🎉 恭喜畫面 -->
    <div v-show="showCongrats" class="congrats-overlay">
      <div class="congrats-modal">
        <p>其實不管你有沒有抽到五星<br />哥哥都愛你</p>
        <button @click="hideCongrats">知道了！</button>
      </div>
    </div>

    <!-- 語音播放元素（隱藏） -->
    <audio ref="audioRef" src="/assets/audio/birthday_message.mp3" preload="auto" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Card {
  name: string
  image: string
}

const cards: Card[] = [
  { name: '夏以晝・生日快樂ver', image: '/assets/img/08.png' },
  { name: '夏以晝・哥哥的叮嚀', image: '/assets/img/09.png' },
  { name: '夏以晝・溫柔守護', image: '/assets/img/10.png' },
  { name: '稀有卡！抱抱券', image: '/assets/img/11.png' },
  { name: '夏以晝・生日祝福', image: '/assets/img/12.png' },
  { name: '夏以晝・甜蜜微笑', image: '/assets/img/13.png' },
]

const currentCard = ref<Card | null>(null)
const isFlipping = ref(false)
const isRare = ref(false)
const showCongrats = ref(false)

const audioRef = ref<HTMLAudioElement | null>(null)

function drawCard() {
  isFlipping.value = true
  isRare.value = false
  showCongrats.value = false

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * cards.length)
    const drawnCard = cards[randomIndex]
    currentCard.value = drawnCard
    isRare.value = drawnCard.name.includes('稀有卡')
    isFlipping.value = false

    // 顯示恭喜畫面＋語音
    setTimeout(() => {
      showCongrats.value = true
      playAudio()
    }, 300)
  }, 800)
}

function playAudio() {
  if (audioRef.value) {
    audioRef.value.currentTime = 0
    audioRef.value.play()
  }
}

function hideCongrats() {
  showCongrats.value = false
}
</script>

<style scoped lang="scss">
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes flash {
  0%, 100% { background-color: #fffbe6; }
  50% { background-color: #fff176; }
}

@keyframes shake {
  0% { transform: translate(0); }
  20% { transform: translate(-4px, 2px); }
  40% { transform: translate(4px, -2px); }
  60% { transform: translate(-3px, 1px); }
  80% { transform: translate(3px, -1px); }
  100% { transform: translate(0); }
}

@keyframes boom {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.gacha-container {
  position: relative;
  text-align: center;
  padding: 20px;

  p {
    font-size: 1.5rem;
    color: #444545;
    margin-bottom: 20px;
  }

  .corner-deco {
    position: absolute;
    top: -30px;
    left: -10px;
    width: 60px;
    height: auto;
    pointer-events: none;
    // opacity: 0.9;
    // z-index: 1;
    rotate: -15deg;
    animation: float 2s ease-in-out infinite;
  }
}

.card-display {
  position: relative;
  width: 200px;
  min-height: 280px;
  margin: 0 auto 20px;
  border: 2px solid #ccc;
  border-radius: 12px;
  // background-color: #f5f5f5;
  background: url('/assets/img/appletree.jpg') no-repeat center center;
  background-size: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
  cursor: pointer;

  &.flipped {
    transform: rotateY(180deg);
  }

  &.shiny-flash {
    animation: flash 1.5s ease-in-out 2;
    border: 2px solid gold;
    box-shadow: 0 0 30px rgba(255, 193, 7, 0.7);
  }

  &.shake {
    animation: shake 0.4s ease-in-out;
  }

  img {
    width: 80%;
    height: auto;
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

  .rare-text {
    position: absolute;
    top: 10px;
    right: -30px;
    transform: rotate(15deg);
    background-color: gold;
    color: white;
    font-weight: bold;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 1.2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: boom 1.2s ease-out;
    // z-index: 2;
  }
}

.congrats-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  // z-index: 20;

  pointer-events: none;
  .congrats-modal {
    pointer-events: auto;
  }
}

.congrats-modal {
  background-color: #fffdf8;
  border: 2px solid #ffb84c;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  p {
    font-size: 1.3rem;
    font-weight: bold;
    color: #d35a28;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  button {
    padding: 10px 20px;
    background-color: #ff7f3e;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #e5672a;
    }
  }
}
</style>
