<template>
  <div class="birthday-story">
    <img class="corner-deco" src="/assets/img/oni.gif" alt="裝飾圖" />

    <p v-html="typedText" v-if="currentIndex >= 0"></p>

    <div class="progress-info" v-if="currentIndex >= 0">
      {{ currentIndex + 1 }} / {{ lines.length }}
    </div>
    <div class="progress-bar" v-if="currentIndex >= 0">
      <div
        class="progress-inner"
        :style="{ width: ((currentIndex + 1) / lines.length) * 100 + '%' }"
      ></div>
    </div>

    <div class="button-wrapper">
      <img
        class="next-button"
        :src="isExpanded ? '/assets/img/send.png' : '/assets/img/send.png'"
        :alt="isExpanded ? '下一步' : '收合'"
        @click="handleClick"
        :class="{ disabled: isTyping }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lines = [
  '這裡是由一位獵人工程師小姐創建的',
  '"2025夏以晝生日特典網頁"',
  '非營利性質!!',
  '純粹為了慶祝夏以晝的生日而製作',
  '因為手作能力不佳，只好發揮自己的其他長才，希望祝福可以順著網線送到二次元去哈哈哈'
]

const currentIndex = ref(0)
const typedText = ref('')
const isExpanded = ref(true)
const isTyping = ref(false)

function typeLine(text: string) {
  typedText.value = ''
  isTyping.value = true
  let i = 0

  const tagRegex = /<[^>]+>/g
  const segments: { text: string; isTag: boolean }[] = []
  let lastIndex = 0
  for (const match of text.matchAll(tagRegex)) {
    if (match.index! > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), isTag: false })
    }
    segments.push({ text: match[0], isTag: true })
    lastIndex = match.index! + match[0].length
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isTag: false })
  }

  let fullText = ''
  let segIndex = 0
  let charIndex = 0

  function typeNext() {
    if (segIndex >= segments.length) {
      isTyping.value = false
      return
    }
    const seg = segments[segIndex]
    if (seg.isTag) {
      fullText += seg.text
      segIndex++
      typeNext()
    } else {
      fullText += seg.text[charIndex]
      charIndex++
      if (charIndex >= seg.text.length) {
        segIndex++
        charIndex = 0
      }
      typedText.value = fullText
      setTimeout(typeNext, 40) // 打字速度
    }
  }

  typeNext()
}

function handleClick() {
  if (isTyping.value) return

  if (!isExpanded.value) {
    currentIndex.value = 0
    isExpanded.value = true
    typeLine(lines[0])
  } else {
    if (currentIndex.value < lines.length - 1) {
      currentIndex.value++
      typeLine(lines[currentIndex.value])
    } else {
      // 收合
      currentIndex.value = -1
      typedText.value = ''
      isExpanded.value = false
    }
  }
}

// 初始化打字第一段
typeLine(lines[0])
</script>

<style scoped lang="scss">
.birthday-story {
  position: relative;
  font-size: 1.5rem;
  color: #252d2d;
  text-align: center;
  margin: 20px;
  min-width: 300px;
  padding: 20px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff6dd;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);

  .corner-deco {
    position: absolute;
    top: -30px;
    right: -15px;
    width: 80px;
    height: auto;
    pointer-events: none;
  }

  p {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #666;
    min-height: 50px;
    white-space: pre-wrap;
  }

  .progress-info {
    font-size: 1rem;
    color: #888;
    margin: 10px 0 4px;
  }

  .progress-bar {
    width: 80%;
    height: 8px;
    margin: 0 auto 16px;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;

    .progress-inner {
      height: 100%;
      background-color: #fb5d55;
      transition: width 0.3s ease;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  .next-button {
    width: 50px;
    height: auto;
    cursor: pointer;
    transition: transform 0.2s;
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    &:hover {
      transform: scale(1.1);
    }
  }

  strong {
    font-weight: bold;
    color: #fb5d55;
  }
}
</style>
