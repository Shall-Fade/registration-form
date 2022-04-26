<template>
  <button class="base-btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-btn {
  border: none;
  background: none;
  outline: none;

  cursor: pointer;
  color: #fff;
  background-color: #437ae0;
  padding: 8px 20px;
  border-radius: 5px;
  transition: 0.2s ease;
}
.base-btn:hover {
  background-color: #1e66ec;
  transition: 0.2s ease;
}
.base-btn:active {
  background-color: #0139a0;
  transition: 0.3s ease;
}
</style>
