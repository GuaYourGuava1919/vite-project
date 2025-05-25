<template>
  <div class="birthday-hint" @click="goToBirthdayPage">
    <div class="text">
      <p>留下你對<strong>{{ name }}</strong> 的生日祝福吧！</p>
      <button @click.stop="showDialog = true">馬上祝福</button>
    </div>
  </div>
  <CheckIn v-if="showDialog" @close="showDialog = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CheckIn from './CheckIn.vue'

const showDialog = ref(false)

const props = defineProps({
  name: String,
  avatarUrl: String,
  link: {
    type: String,
    default: '/birthday'
  }
})

const goToBirthdayPage = () => {
  window.location.href = props.link
}
</script>


<style scoped lang="scss">

.birthday-hint {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 3px solid $sunset-color;
  background: $secondary-color;;
  box-shadow: 0 0 10px rgba($sunset-color, 0.4);
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  z-index: 999;
  cursor: pointer;
  animation: popIn 0.8s ease-out;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      margin: 0;
      font-weight: 600;
      color: #f5f5f5;
    }

    button {
      background: $sunset-color;
      border: none;
      color: white;
      border-radius: 999px;
      padding: 0.3rem 0.8rem;
      font-size: 0.85rem;
      margin-top: 0.3rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: darken($sunset-color, 8%);
      }
    }
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
