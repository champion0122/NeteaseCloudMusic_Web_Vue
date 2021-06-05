<template>
  <div class="rotate-container">
    <div class="outer">
      <img src="@/assets/img/logo.jpeg" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@keyframes rotate360 {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate-container {
  width: 320px;
  height: 320px;
  background-color: #f5f5f5;
  border-radius: 50%;
  z-index: 2;
  position: relative;
}
.outer {
  width: 95%;
  height: 95%;
  background-color: #090a0d;
  border-radius: 50%;
  position: absolute;
  left: 2.5%;
  top: 2.5%;
}
.outer img {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 25%;
  top: 25%;
  /* transform: rotate(360deg);
  transition:transform 2s; */
  /* 匀速 linear */
  animation: rotate360 5s infinite linear;
}
</style>