<template>
    <div class="app-header">
        <p>戀與 X 夏以晝</p>
        <Countdown/>
        <!-- <Browser/> -->
    </div>
</template>

<script setup lang="ts">
import Countdown from './Countdown.vue';
// import Browser from './Browser.vue';

</script>

<style scoped lang="scss">
.app-header {
    width: 100%;
    font-size: 24px;
    padding: 20px;
    color: $secondary-color;
    background:#f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>