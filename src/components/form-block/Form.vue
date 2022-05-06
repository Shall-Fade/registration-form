<template>
  <div class="form-container">
    <FormBlock />
    <FormDescription />
  </div>
</template>

<script>
import FormBlock from "./FormBlock.vue";
import FormDescription from "./FormDescription.vue";

export default {
  components: {
    FormBlock,
    FormDescription,
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* height: 100vh; */
}
</style>
