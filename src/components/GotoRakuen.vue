<template>
    <div class="goto-rakuen">
        <p>我保證...這是最後一次的逃離...</p>
        <button @click="goToRakuen">前往樂園</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRakuen = () => {
    router.push('/special')
}
</script>

<style scoped lang="scss">
.goto-rakuen {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    width: 80%;
    p{
        font-size: 24px;
        color: #333;
        text-align: center;
        margin-bottom: 10px;
    }
}
button {
    background-color: $secondary-color;
    color: white;
    width: 100%;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

</style>