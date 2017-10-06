<template>
  <div id="archive-window">
    <div id="archive-container">
      <div id="archive-close-btn" @click="close()"></div>
      <div id="ar-content" v-if="archive">
        <div id="ar-info">
          <div id="ar-wrap">
            <div id="ar-title"># {{archive.title}} #</div>
            <div id="ar-desc">{{archive.description}}</div>
          </div>
        </div>
        <div id="ar-list">
          <Post :posts="posts" :loading="loading" noMore=true />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {urls} from '../config'
import Post from './Post.vue'
export default {
  props: ['archive'],
  data () {
    return {
      posts: [],
      loading: false,
    }
  },
  created () {
    this.loading = true
    fetch(`${urls.issue}?milestone=${this.archive.number}`).then(res => res.json()).then(res => {
      this.posts = res
      this.loading = false
    })
  },
  methods: {
    close () {
      this.$emit('closeArchiveWindow')
    },
  },
  components: {
    Post
  }
}
</script>

<style>
@media screen and (max-width: 768px){
  #ar-info {
    height: 30%;
    width: 100%;
  }
  #ar-content {
    flex-wrap: wrap;
  }
  #archive-container {
    height: 100%;
    width: 100%;
  }
  #ar-list {
    height: 70%;
  }
}
@media screen and (min-width: 768px){
  #ar-info {
    height: 100%;
    min-width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #archive-container {
    height: 80%;
    width: 80%;
  }
  #ar-list {
    height: 100%;
  }
}
#archive-window {
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.5); */
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#archive-container {
  background-color: #fff;
  box-shadow: 0 50px 200px rgba(0, 0, 0, 0.2);
  animation: window-in 0.3s ease-in-out;
  position: relative;
}
#archive-close-btn {
  height: 31px;
  width: 31px;
  position: absolute;
  right: 0;
  top: 0;
  transform: rotate(45deg);
  transition: all ease 0.3s;
  margin: 20px;
  cursor: pointer;
}
#archive-close-btn:hover {
  transform: rotate(45deg) scale(2);
}
#archive-close-btn:before,
#archive-close-btn:after {
  content: ' ';
  display: block;
  background-color: #000;
}
#archive-close-btn:before {
  height: 100%;
  width: 1px;
  transform: translateX(15px);
}
#archive-close-btn:after {
  height: 1px;
  width: 100%;
  transform: translateY(-16px);
}
#ar-content {
  display: flex;
  height: 100%;
}
#ar-info {
  background-color: #eee;
  padding: 20px 15px;
  box-sizing: border-box;
  background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/8e4250cfdc09ada434ee58540106c49070bd6ac6d551f");
  background-size: cover;
}
#ar-title {
  font-size: 26px;
  margin-bottom: 10px;
}
#ar-list {
  width: 100%;
  overflow-y: scroll;
}
#ar-wrap {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  width: 50%;
}
@keyframes window-in {
  from {
    transform: translateY(-1000px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
