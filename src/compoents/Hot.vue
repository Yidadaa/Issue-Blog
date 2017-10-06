<template>
  <div id="hot">
    <div id="hot-tip">
      <span># 热门文章</span>
      <span id="hot-en">——Hot Articles</span>
    </div>
    <div class="loading" v-if="hotPosts.length == 0"></div>
    <div class="hot-post" v-for="(post, index) in hotPosts" :key="index">
      <span class="hot-index">{{index + 1}}. </span>
      <span class="hot-title">{{post.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['hotPosts']
}
</script>
<style>
#hot {
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}
#hot-tip {
  text-align: left;
  font-size: 20px;
  padding: 20px 15px;
  font-weight: bold;
  color: #608aa5;
}
#hot-en {
  font-weight: lighter;
  font-style: italic;
  font-size: 12px;
}
.hot-post {
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 -10px 50px rgba(0, 0, 0, 0.05);
}
.hot-index {
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  color: #eb9686;
}
.hot-title {
  color: #608aa5;
  font-size: 14px;
  font-weight: bold;
}
</style>
