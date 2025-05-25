<template>
    <div class="app-header">
        <p>戀與 X 夏以晝</p>
        <Countdown/>
    </div>
</template>

<script setup lang="ts">
import Countdown from './Countdown.vue';

</script>

<style scoped lang="scss">
.app-header {
    width: 100%;
    font-size: 20px;
    padding: 10px;
    color: $secondary-color;
    background:#f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>