<template>
  <div class="birthday-hint" @click="goToBirthdayPage">
    <img class="avatar" :src="avatarUrl" alt="角色頭像" />
    <div class="text">
      <p>🎂 今天是 <strong>{{ name }}</strong> 的生日！</p>
      <button>馬上祝福 🎁</button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  background: $background-color;
  border: 2px solid $sunset-color;
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

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 5px $navy-color;
    border: 2px solid white;
  }

  .text {
    p {
      margin: 0;
      font-weight: 600;
      color: $navy-color;
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
