<template>
  <transition name="fade">
    <div class="dialog-backdrop" @click.self="$emit('close')">
      <div class="dialog-content">
        <button class="close-btn" @click="$emit('close')">✖</button>
        <h2>🎟️ 打卡專屬入口</h2>

        <input v-model="code" placeholder="請輸入你的專屬序號" :disabled="loading || success" />
        <button v-if="!success" @click="checkCode" :disabled="loading || !code.trim()">
          {{ loading ? '驗證中…' : '打卡' }}
        </button>
        <p v-if="message" :class="{ success, error: !success }">{{ message }}</p>

        <!-- ✅ 驗證成功後顯示畫畫區 -->
        <DrawingPad v-if="success" :code="code" />
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import DrawingPad from '../views/DrawingBordView.vue'

</script>
