<script>
export default {
  activated() {
    const pos = this.$store.state.pos;
    const path = this.$route.path;
    window.scrollTo(0, pos[path] || 0);
  }
  // 这里有个坑，浏览器前进后退的时候会自动将页面的scrollTop置零
}
</script>
