<template>
  <div class="listBox">
    <img :src="picUrl" alt="" />
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "RecommendListItem",
  data() {
    return {
      picUrl: "",
      name: "",
    };
  },
};
</script>

<style>
</style>