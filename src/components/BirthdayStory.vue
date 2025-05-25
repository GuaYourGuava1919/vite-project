<template>
  <div class="birthday-story">
    <img class="corner-deco" src="/assets/img/oni.gif" alt="裝飾圖" />
    <p>
    這裡是由一位獵人工程師小姐創建的<br>
    "2025夏以晝生日特典網頁"<br>
    <strong>【非營利性質，純粹為了慶祝夏以晝的生日而製作】</strong><br>
    因為手作能力不佳，只好發揮自己的其他長才，希望祝福可以順著網線送到二次元去哈哈哈
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.birthday-story {
  position: relative; // 讓內部的絕對定位參考這個元素
  font-size: 1.5rem;
  color: #252d2d;
  text-align: center;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff6dd;
  // opacity: 0.7;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);
  .corner-deco {
    position: absolute;
    top: -30px;
    right: -15px;
    width: 80px;
    height: auto;
    pointer-events: none; // 避免點擊影響其他元素
  }
  strong{
    font-weight: bold;
    color: #fb5d55;
  }
  p{
    margin-top: 10px;
    font-size: 1.2rem;
    color: #666;
  }
}
</style>