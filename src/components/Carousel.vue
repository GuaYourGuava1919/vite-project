<template>
  <div class="carousel">
    <div
      class="carousel-wrapper"
      :class="{ 'no-transition': !isTransitioning }"
      :style="{ transform: `translateX(-${offset * 100}%)` }"
    >
      <div class="carousel-slide" v-for="(img, i) in images" :key="i">
        <img :src="img" :alt="`Slide ${i + 1}`" />
        <!-- <p>123</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  imageList: {
    type: Array,
    required: true
  },
  intervalMs: {
    type: Number,
    default: 3000
  }
})

const images = ref([...props.imageList]) // 使用者傳入的圖
const offset = ref(0)
const isTransitioning = ref(true)
let interval = null

const moveLeft = async () => {
  isTransitioning.value = true
  offset.value += 1

  if (offset.value >= images.value.length) {
    setTimeout(async () => {
      isTransitioning.value = false
      offset.value = 0
      const first = images.value.shift()
      images.value.push(first)
      await nextTick()
    }, 500) // 時間應和 CSS transition 時間一致
  }
}

onMounted(() => {
  interval = setInterval(moveLeft, props.intervalMs)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
.carousel {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;

  &.no-transition {
    transition: none !important;
  }
}

.carousel-slide {
  min-width: 100%;
  img {
    width: 100%;
    display: block;
  }
}
</style>
