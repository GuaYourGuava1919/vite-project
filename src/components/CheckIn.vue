<template>
  <transition name="fade">
    <div class="dialog-backdrop" @click.self="$emit('close')">
      <div class="dialog-content">
        <button class="close-btn" @click="$emit('close')">✖</button>
        <h2>🎟️ 打卡專屬入口</h2>

        <input
          v-model="code"
          placeholder="請輸入你的專屬序號"
          :disabled="loading"
        />
        <button @click="checkCode" :disabled="loading || !code.trim()">
          {{ loading ? '驗證中…' : '打卡' }}
        </button>

        <p v-if="message" :class="{ success, error: !success }">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { db } from '../firebaseConfig'
import {
  doc,
  updateDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore'

const code = ref('')
const message = ref('')
const success = ref(false)
const loading = ref(false)

import { collection, query, where, getDocs } from 'firebase/firestore'
import router from '@/router'

async function checkCode() {
  if (!code.value.trim()) return
  loading.value = true

  const codeInput = code.value.trim().toUpperCase()
  const q = query(collection(db, 'serialCodes'), where('code', '==', codeInput))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    message.value = '❌ 無效的序號，請再確認一次'
    success.value = false
  } else {
    const docSnap = snapshot.docs[0]
    const docRef = docSnap.ref
    const data = docSnap.data()

    if (data.used) {
      message.value = '⚠️ 這個序號已經打過卡囉！'
      success.value = false
    } else {
      await updateDoc(docRef, { used: true })
      await setDoc(doc(db, 'checkins', codeInput), {
        code: codeInput,
        timestamp: serverTimestamp()
      })
      message.value = '✅ 打卡成功，感謝你的祝福！'
      success.value = true
      router.push(`/special/${codeInput}`)
    }
  }

  loading.value = false
}

</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px); /* 🌫️ 背景模糊 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-content {
  background: #fffdf0;
  border-radius: 12px;
  padding: 24px 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  animation: scaleIn 0.3s ease-out;
  

  input {
    width: 90%;
    padding: 10px;
    font-size: 1rem;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    margin-top: 12px;
    padding: 8px 18px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #fb5d55;
    border: none;
    border-radius: 8px;
    color: white;
    transition: background 0.2s;
    &:hover {
      background-color: #e94d47;
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  p {
    margin-top: 12px;
  }

  .success {
    color: green;
  }
  .error {
    color: red;
  }

  .close-btn {
    position: absolute;
    top: 12px;
    right: 14px;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
