<template>
  <div>
    <div id="nav">
      <div class="layout" id="links">
        <a href="./">主页</a>
      </div>
    </div>
    <div id="banner">
      <div id="motto">Yidadaa</div>
    </div>
    <div class="layout" id="main-container">
      <div id="archives">
        <Archives :milestones="archives"/>
        <div class="ls-hidden hot-articles">
        </div>
      </div>
      <div id="post-container">
        <Post :posts="posts" :loading="loadingPost"/>
      </div>
      <div class="xs-hidden hot-articles">fsafsdfs</div>
    </div>
  </div>
</template>
<script>
import {urls} from './config'
import Post from './compoents/post.vue'
import Archives from './compoents/archives.vue'

export default {
  name: 'blog',
  data () {
    return {
      posts: [],
      loadingPost: false,
      archives: []
    }
  },
  methods: {
    loadPosts (page) {
      const reg = /\!\[.*\]\((.*)\)/
      const url = urls.issue

      this.loadingPost = true
      fetch(url + '?page=' + page).then(res => res.json()).then(res => {
        const posts = res.map(post => {
          const match = post.body.match(reg); // 找出文中第一张图
          const sliceNum = 300
          const cnchars = (post.body.slice(0, sliceNum).match(/[^\x00-\xff]/g) || '').length
          return Object.assign({}, post, {
            short: post.body.slice(0, sliceNum - cnchars)
                .replace(/[\*\#\-\`\>]/g, ' ') + '...',
            image: match && match[1]
          })
        })
        this.posts = posts
        this.loadingPost = false
      })
    },
    loadArchives () {
      const url = urls.milestones
      if (!url) return
      fetch(url).then(res => res.json()).then(res => {
        this.archives = res
      })
    }
  },
  created () {
    this.loadPosts(0)
    this.loadArchives()
  },
  components: {
    Post, Archives
  }
}
</script>
<style>
@import './animation.css';

@media screen and (max-width: 768px){
  /*手机屏幕 <768px*/
  .layout {
    width: 100%;
  }
  #links {
    padding: 0 20px;
  }
  #banner {
    height: 300px;
  }
  #motto {
    font-size: 60px;
  }
  #archives {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
  }
  #main-container {
  flex-wrap: wrap;
  }
  #post-container {
    width: 100%;
  }
  .ls-hidden {
    display: none;
  }
}
@media screen and (max-width: 1200px){
  /*平板屏幕 >768px <992x*/
  .layout {
    width: 100%!important;
  }
}
@media screen and (min-width: 768px){
  /*大屏幕 >992px*/
  .layout {
    width: 60%;
  }
  #banner {
    height: 400px;;
  }
  #motto {
    font-size: 100px;
  }
  #archives {
    min-width: 300px;
    width: 39%;
    padding: 10px;
  }
  #main-container {
    flex-direction: row-reverse;
    flex-wrap: nowrap;
  }
  #post-container {
    flex-grow: 1;
    width: 70%;
    padding-top: 10px;
  }
  .xs-hidden {
    display: none;
  }
}
body {
  margin: 0;
}
#nav {
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
}
#links {
  line-height: 50px;
}
#links a {
  color: #eee;
  position: relative;
  padding-bottom: 5px;
  margin-right: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
}

#links a:after {
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

#links a:hover:after {
  transform: translateY(0px);
  opacity: 1;
}

.layout {
  margin: auto;
}

#banner {
  background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/298258a2967dbfcf3cdc4fdcc6daa472ce1c2e2bd35d6");
  background-size: cover;
  background-position-x: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

#motto {
  color: #fff;
  text-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
}

#archives {
  height: auto;
}

#main-container {
  display: flex;
}

#post-container {
  height: auto;
}

.hot-articles {
  width: 100%;
  background-color: blue;
}
</style>
