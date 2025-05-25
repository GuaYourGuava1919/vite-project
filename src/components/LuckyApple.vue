<template>
  <div class="apple-layer" ref="container">
    <div class="title-container">
      <p class="apple-title">哥哥蘋果咬一口</p>
      <p class="apple-title">吃掉蘋果，看看哥哥想說什麼～</p>
    </div>

    <!-- 幸運蘋果 -->
    <div v-if="showFortune" class="fortune-container">
      <div class="fortune-message">{{ fortuneMessage }}</div>
      <button class="fortune-button" @click="resetFortune">再吃一顆</button>
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

<script setup lang="ts">
import { ref } from 'vue'
import appleImgWhole from '/assets/img/oni02.gif'
import appleImgHalf from '/assets/img/oni03.gif'
import appleImgEaten from '/assets/img/oni04.gif'

const showFortune = ref(false)
const fortuneMessage = ref('')
const eatStage = ref(0)

const fortuneTexts = [
  '汪！',
  '你第一次拉住我的手的那一天我就已經跑不掉了，再讓我保護你一回。',
  '你有沒有想過，我從來都不是你的哥哥。（嚼嚼嚼）',
  '所有朝你打來的風雨都不該出現在你面前。',
  '既然長大了，那哥哥這次就不幫你兜底了。 ',
  '你願意給的就是我想要的，你想得到的就是我願意付出的。 ',
  '如果每一個問題都通向遠離你的結局，那就用一輩子的時間來回答。',
  '我不會交女朋友。有你和奶奶就足夠了，我沒有多餘的心力去在意別人。所以不用擔心，我不會的。',
  '說好了...生與死都...不再分開',
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
  font-size: 30px;
  // font-weight: bold;
  text-align: center;
  color: #444545;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.initial-apple {
  width: 150px;
  cursor: pointer;
  z-index: 9999;
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
  .fortune-message {
  font-size: 20px;
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