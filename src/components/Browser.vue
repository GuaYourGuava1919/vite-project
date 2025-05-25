<template>
    <div class="view-counter" v-if="viewCount !== null">
        已有 {{ viewCount }} 位妹寶來過這裡 👀！
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, getDoc, increment, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const viewCount = ref<number | null>(null)

async function updateViewCount() {
  const docRef = doc(db, 'pageViews', 'birthday2025')
  try {
    await setDoc(docRef, { count: increment(1) }, { merge: true })
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      viewCount.value = snapshot.data().count
    }
  } catch (err) {
    console.error('更新瀏覽次數失敗：', err)
  }
}

onMounted(() => {
  updateViewCount()
})

</script>

<style scoped>

</style>