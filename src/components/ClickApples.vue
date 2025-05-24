<template>
  <div class="apple-layer" @click="createApples" ref="container">
    <!-- 點擊產生的閃光 -->
    <div
      v-for="flash in flashes"
      :key="flash.id"
      class="flash-effect"
      :style="{
        left: `${flash.x}px`,
        top: `${flash.y}px`
      }"
    ></div>

    <!-- 蘋果動畫 -->
    <!-- <img
      v-for="apple in apples"
      :key="apple.id"
      class="apple"
      :src="appleImg"
      :style="{
        left: `${apple.x}px`,
        top: `${apple.y}px`,
        width: `${apple.size}px`,
        height: `${apple.size}px`,
        transform: `rotate(${apple.rotation}deg)`,
        animation: `gameClickPop 1.2s ease-out ${apple.delay}s forwards`
      }"
    /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import appleImg from '@/assets/img/apple.png'

const apples = ref([])
const flashes = ref([])
const container = ref(null)

let appleId = 0
let flashId = 0

const createApples = (e) => {
  const rect = container.value.getBoundingClientRect()
  const baseX = e.clientX - rect.left
  const baseY = e.clientY - rect.top

  // 👇 加入閃光特效
  const id = flashId++
  flashes.value.push({ id, x: baseX, y: baseY })
  setTimeout(() => {
    const i = flashes.value.findIndex((f) => f.id === id)
    if (i !== -1) flashes.value.splice(i, 1)
  }, 500)

  // 👇 蘋果拋出效果
  const count = 3 + Math.floor(Math.random() * 3)
  for (let i = 0; i < count; i++) {
    const offsetX = (Math.random() - 0.5) * 100
    const offsetY = (Math.random() - 0.5) * 50
    const size = 30 + Math.random() * 20
    const rotation = Math.random() * 360
    const delay = Math.random() * 0.2
    const id = appleId++

    apples.value.push({
      id,
      x: baseX + offsetX,
      y: baseY + offsetY,
      size,
      rotation,
      delay
    })

    setTimeout(() => {
      const index = apples.value.findIndex((a) => a.id === id)
      if (index !== -1) apples.value.splice(index, 1)
    }, 1600 + delay * 1000)
  }
}
</script>

<style scoped lang="scss">
.apple-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: auto;
  overflow: hidden;
}

.apple {
  position: absolute;
  pointer-events: none;
  opacity: 0.95;
  object-fit: contain;
}

.flash-effect {
  position: absolute;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  margin-top: -40px;
  border-radius: 50%;
  border: 5px solid rgb(243, 228, 210);
  animation: shockwave 0.5s ease-out forwards;
  pointer-events: none;
}

@keyframes shockwave {
  0% {
    transform: scale(0.3);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@keyframes gameClickPop {
  0% {
    transform: scale(0.5) translateY(0px);
    opacity: 0;
  }
  20% {
    transform: scale(1.2) translateY(-20px);
    opacity: 1;
  }
  50% {
    transform: scale(0.9) translateY(-80px);
  }
  100% {
    transform: scale(0.7) translateY(60px);
    opacity: 0;
  }
}

</style>