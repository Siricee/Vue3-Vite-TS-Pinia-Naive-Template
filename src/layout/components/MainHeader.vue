<template>
  <div class="main-header">
    标题
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
.main-header {
  height: 56px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6ebed;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .main-header__right {
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
