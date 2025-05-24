<template>
    <div class="voice-selector">
    <h3>🎙️ 選擇語音互動</h3>
    <div class="voice-buttons">
        <button @click="playVoice('birthday')">🧁 戳我聽祝福</button>
        <button @click="playVoice('cute')">🐾 撒嬌一下</button>
        <button @click="playVoice('memory')">📼 語音回顧</button>
    </div>
    <audio ref="audioPlayer"></audio>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const audioPlayer = ref<HTMLAudioElement | null>(null)

    const voiceMap = {
    birthday: '/voice/birthday.mp3',
    cute: '/voice/cute.mp3',
    memory: '/voice/memory.mp3'
    }

    function playVoice(type: keyof typeof voiceMap) {
    const player = audioPlayer.value
    if (player) {
        player.src = voiceMap[type]
        player.play()
    }
    }

</script>

<style lang="scss" scoped>
    .voice-selector {
  text-align: center;
  margin: 2rem 0;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #444;
  }

  .voice-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;

    button {
      background: #ffe2e2;
      border: none;
      padding: 0.8rem 1.2rem;
      border-radius: 12px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);

      &:hover {
        background: #ffb3b3;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}

</style>