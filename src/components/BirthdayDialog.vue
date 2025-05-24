<template>
  <div class="dialog-container">
    <div class="dialog-box" @click="nextLine">
      <p class="dialog-text">{{ displayedText }}</p>
      <button class="next-button" v-if="!isTyping">
        <img src="@/assets/img/plane.png" alt="Next" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  lines: Array,
  font: {
    type: String,
    default: '"Zhi Mang Xing", cursive'
  }
})

let currentIndex = ref(0)
let displayedText = ref('')
let isTyping = ref(false)

const typeLine = async (line) => {
  displayedText.value = ''
  isTyping.value = true
  for (let i = 0; i < line.length; i++) {
    displayedText.value += line[i]
    await new Promise(res => setTimeout(res, 45))
  }
  isTyping.value = false
}

watch(() => props.lines, () => {
  typeLine(props.lines[currentIndex.value])
}, { immediate: true })

const nextLine = () => {
  if (isTyping.value) return
  if (currentIndex.value < props.lines.length - 1) {
    currentIndex.value++
    typeLine(props.lines[currentIndex.value])
  }
}
</script>

<style scoped lang="scss">
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.dialog-box {
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  font-family: var(--font-hand);
  font-size: 24px;
  line-height: 1.8;
  color: #f5f5f5;
  min-height: 150px;
  cursor: pointer;
  transition: all 0.4s;
}

.dialog-text {
  white-space: pre-wrap;
}

.next-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: $secondary-color;
  font-size: 1.2rem;
  cursor: pointer;
  img{
    width: 30px;
  }
}
</style>
