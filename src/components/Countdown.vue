<template>
    <div>
        <div class="countdown animated-text">{{ countdownText }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const countdownText = ref('')
const targetDate = new Date(`${new Date().getFullYear()}-06-13T00:00:00`)

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

<style scoped>

</style>