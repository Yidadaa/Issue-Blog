<template>
  <div id="pd-window">
    <div id="pd-container">
      <div id="pd-close-btn" @click="close()"></div>
      <div id="pd-content" v-if="true">
        <div id="pd-info">
          <div id="pd-wrap">
            <div id="pd-title"># {{post.title}} #</div>
            <div id="pd-desc"></div>
          </div>
        </div>
        <div id="pd-content">
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'

export default {
  props: ['post'],
  data () {
    comments: []
  },
  methods: {
    close () {
      this.$emit('closePostWindow')
    },
  },
  onCreated () {

  }
}
</script>

<style>
@media screen and (max-width: 768px){
  #pd-info {
    height: 30%;
    width: 100%;
  }
  #pd-content {
    flex-wrap: wrap;
  }
  #pd-container {
    height: 100%;
    width: 100%;
  }
  #pd-list {
    height: 70%;
  }
}
@media screen and (min-width: 768px){
  #pd-info {
    height: 100%;
    min-width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #pd-container {
    height: 80%;
    width: 80%;
  }
  #pd-list {
    height: 100%;
  }
}
#pd-window {
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.5); */
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pd-container {
  background-color: #fff;
  box-shadow: 0 50px 200px rgba(0, 0, 0, 0.2);
  animation: window-in 0.3s ease-in-out;
  position: relative;
}
#pd-close-btn {
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
#pd-close-btn:hover {
  transform: rotate(45deg) scale(2);
}
#pd-close-btn:before,
#pd-close-btn:after {
  content: ' ';
  display: block;
  background-color: #000;
}
#pd-close-btn:before {
  height: 100%;
  width: 1px;
  transform: translateX(15px);
}
#pd-close-btn:after {
  height: 1px;
  width: 100%;
  transform: translateY(-16px);
}
#pd-content {
  display: flex;
  height: 100%;
}
#pd-info {
  background-color: #eee;
  padding: 20px 15px;
  box-sizing: border-box;
  background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/8e4250cfdc09ada434ee58540106c49070bd6ac6d551f");
  background-size: cover;
}
#pd-title {
  font-size: 26px;
  margin-bottom: 10px;
}
#pd-list {
  width: 100%;
  overflow-y: scroll;
}
#pd-wrap {
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
