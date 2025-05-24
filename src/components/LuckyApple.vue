<template>
  <div class="apple-layer" ref="container">
    <div class="title-container">
      <p class="apple-title">幸運蘋果吃一口</p>
    </div>

    <!-- 幸運蘋果 -->
    <div v-if="showFortune" class="fortune-container">
      <div class="fortune-message">{{ fortuneMessage }}</div>
      <button class="fortune-button" @click="resetFortune">再吃一顆 🍎</button>
    </div>

    <!-- 一開始就顯示的蘋果，會逐步吃掉 -->
    <img
      v-if="!showFortune && eatStage === 0"
      class="initial-apple"
      :src="appleImgWhole"
      @click="nextEatStage"
    />
    <img
      v-if="!showFortune && eatStage === 1"
      class="initial-apple"
      :src="appleImgHalf"
      @click="nextEatStage"
    />
    <img
      v-if="!showFortune && eatStage === 2"
      class="initial-apple"
      :src="appleImgEaten"
      @click="nextEatStage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import appleImgWhole from '@/assets/img/apple.png'
import appleImgHalf from '@/assets/img/apple_half.png'
import appleImgEaten from '@/assets/img/apple_eaten.png'

const showFortune = ref(false)
const fortuneMessage = ref('')
const eatStage = ref(0)

const fortuneTexts = [
  '今天是你幸運的一天！',
  '好運即將降臨！',
  '有人正在默默喜歡你 ',
  '夢想的事情快要實現了！',
  '小確幸正在靠近中 ',
  '你的努力很快就會被看見 ',
  '今天你將成為歐皇！'
]

const nextEatStage = () => {
  if (eatStage.value < 2) {
    eatStage.value++
  } else {
    showFortune.value = true
    fortuneMessage.value = fortuneTexts[Math.floor(Math.random() * fortuneTexts.length)]
  }
}

const resetFortune = () => {
  showFortune.value = false
  eatStage.value = 0
  fortuneMessage.value = ''
}
</script>

<style scoped lang="scss">
.apple-layer {
  position: relative;
  width: 100%;
  height: 30vh;
//   background: #fff5f5;
    background: url('@/assets/img/paper.jpg') no-repeat center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.title-container {
  margin-bottom: 20px;
}

.apple-title {
  font-size: 32px;
  font-weight: bold;
  color: $primary-color;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.initial-apple {
  width: 100px;
//   height: 100px;
  cursor: pointer;
  animation: appleBounce 1s ease-in-out infinite alternate;
}

.fortune-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 240, 0.95);
  padding: 20px 30px;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.3s ease-out;
  z-index: 10000;
  width: 300px;
}

.fortune-message {
  font-size: 28px;
  color: $primary-color;
  margin-bottom: 12px;
}

.fortune-button {
  background: $background-color;
  border: none;
  color: $secondary-color;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}

@keyframes appleBounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style>