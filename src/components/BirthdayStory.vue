<template>
  <section class="birthday-story">
    <ClickApples />
    <h2>{{ name }}0613生日特典</h2>
    <div class="story-box">
      <p
        v-for="(line, i) in storyLines"
        :key="i"
        class="animated-line"
        :style="{ animationDelay: `${i * 0.3}s` }"
      >
        {{ line }}
      </p>
      <img v-if="storyImage" :src="storyImage" class="story-img" />
      <audio v-if="voiceUrl" controls :src="voiceUrl" class="voice-player" />
    </div>
  </section>
</template>

<script setup>
import ClickApples from '@/components/ClickApples.vue'
const props = defineProps({
  name: String,
  storyLines: Array,
  storyImage: String,
  voiceUrl: String
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

.animated-line {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
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

    .story-img {
      display: block;
      width: 300px;
      height: 300px;
      object-fit: cover;
      margin: 1.5rem auto;
      border-radius: 0.8rem;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    .voice-player {
      display: block;
      margin: 1rem auto;
    }
  }
}
</style>
