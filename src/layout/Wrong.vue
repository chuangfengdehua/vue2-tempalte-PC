<template>
  <div class="wrong">
    <span>who are you?You're in the wrong place</span>
    <span>404啦~</span>
  </div>
</template>

<script>
export default {
  name: 'Wrong'
}
</script>

<style lang="scss" scoped>
.wrong {
  width: 100%;
  height: 100%;
  > span {
    width: 100%;
    font-size: 40px;
    @include flex(center, center);
    margin-top: 200px;
  }
}
</style>
