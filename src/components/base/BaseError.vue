<template>
  <span class="error-message">
    <slot></slot>
  </span>
</template>

<style scoped>
.error-message {
  font-weight: 600;
  font-size: 12px;
  color: red;
  transition: 0.3s ease;
  animation: slide 1.5s;
}

@keyframes slide {
  from {
    opacity: 0;
    margin-left: 50%;
    width: 300%;
  }

  to {
    opacity: 1;
    margin-left: 0%;
    width: 100%;
  }
}
</style>
