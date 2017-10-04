<template>
  <div id="app">
    <div class="header">
      <div class="nav">
        <router-link to="/">主页</router-link>
        <a @click="toggle">归档</a>
      </div>
      <div class="text-pop-up-top">
        Yidadaa
      </div>
      <div class="colors">
        <div class="colors-blue"></div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app',
  created: function () {
    const store = this.$store;
    store.dispatch('initConfig');
  },
  methods: {
    toggle() {
      this.$store.commit('togglems');
    }
  }
}
</script>

<style>
.nav a {
  color: #eee;
  position: relative;
  padding-bottom: 5px;
  margin-right: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
}

.nav a:after {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #eee;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(10px);
  opacity: 0;
  transition: all ease 0.5s;
}

.nav a:hover:after {
  transform: translateY(0px);
  opacity: 1;
}

.nav {
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 100px;
}
</style>
