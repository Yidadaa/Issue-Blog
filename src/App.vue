<template>
  <div>
    <div id="nav">
      <div class="layout" id="links">
        <a :href="link[1]" v-for="(link, index) in links" :key="index">
          {{link[0]}}
        </a>
      </div>
    </div>
    <div id="banner">
      <div id="motto">Yidadaa</div>
    </div>
    <div class="layout" id="main-container">
      <div id="archives">
        <Archives :milestones="archives" v-on:openArchiveWindow="openArchiveWindow"/>
        <div class="ls-hidden hot-articles">
          <Hot :hotPosts="hotPosts" v-on:readPost="readPost"/>
        </div>
      </div>
      <div id="post-container">
        <Post :posts="posts" :loading="loadingPost" :noMore="noMore"
          v-on:readPost="readPost"
          v-on:loadMorePosts="loadPosts"/>
      </div>
      <div class="xs-hidden hot-articles">
        <Hot :hotPosts="hotPosts" v-on:readPost="readPost"/>
      </div>
    </div>
    <ArchiveDetail v-if="showArchive" :archive="showingArchive"
      v-on:closeArchiveWindow="closeArchiveWindow"
      v-on:readPost="readPost"/>
    <PostDetail v-if="showPost" :post="showingPost"
      v-on:closePostWindow="closePostWindow"/>
    <div id="footer">
      <div class="layout" id="footer-content">
        <div class="footer-info">
          Theme by <a href="https://github.com/Yidadaa/issue-blog">ISSUE-BLOG</a>.
        </div>
        <div class="footer-links">
          <span>友情♂链接:</span>
          <a :href="link[1]" v-for="(link, index) in friendLinks" :key="index">{{link[0]}}</a>
        </div>
      </div>
      <div id="footer-wrap"></div>
    </div>
  </div>

</template>
<script>
import {urls} from './config'
import Post from './compoents/Post.vue'
import Archives from './compoents/Archives.vue'
import Hot from './compoents/Hot.vue'
import ArchiveDetail from './compoents/ArchiveDetail.vue'
import PostDetail from './compoents/PostDetail.vue'

const preventWindowScroll = () => {
  // 阻止弹窗弹出时，窗口滚动
  const [posx, posy] = [window.scrollX, window.scrollY]
  window.onscroll = () => window.scrollTo(posx, posy)
}

const allowWindowScroll = () => {
  // 允许窗口滚动
  window.onscroll = null
}

export default {
  name: 'blog',
  data () {
    return {
      posts: [], // 文章列表
      loadingPost: false, // 是否在加载文章
      curPage: 1, // 当前页
      noMore: false, // 没有更多了
      archives: [], // 分类
      hotPosts: [], // 热门文章

      showArchive: false, // 是否打开分类窗口
      showArchiveIndex: -1,

      showPost: false, // 查看文章内容
      showingPost: {} // 文章详情
    }
  },
  computed: {
    showingArchive () {
      return this.archives[this.showArchiveIndex]
    },
    links () {
      return window.links
    },
    friendLinks () {
      return window.friendLinks
    }
  },
  methods: {
    loadPosts () {
      const url = urls.issue
      if (this.noMore) return // 没有更多内容了

      this.loadingPost = true
      fetch(url + '?page=' + this.curPage).then(res => res.json()).then(res => {
        const posts = res.map(post => {
          const reg = /\!\[.*\]\((.*)\)/
          const match = post.body.match(reg); // 找出文中第一张图
          const sliceNum = 150
          const cnchars = (post.body.slice(0, sliceNum).match(/[^\x00-\xff]/g) || '').length
          // console.log(cnchars)
          return Object.assign({}, post, {
            short: post.body.slice(0, sliceNum - parseInt(cnchars / 2))
                .replace(/[\*\#\-\`\>]/g, ' ') + '...',
            image: match && match[1]
          })
        })
        if (res.length > 0) {
          this.curPage ++
        } else {
          this.noMore = true
        }
        this.posts = [].concat(this.posts, posts)
        this.loadingPost = false
      })
    },
    loadArchives () {
      const url = urls.milestones
      if (!url) return
      fetch(url).then(res => res.json()).then(res => {
        this.archives = res
      })
    },
    loadHotPosts () {
      const url = urls.issue
      fetch(url + '?sort=comments').then(res => res.json()).then(res => {
        const hotPosts = res.filter(post => post.comments > -1) // 过滤掉没有评论的
        this.hotPosts = hotPosts.length > 5 ? hotPosts.slice(0, 5) : hotPosts // 只取前五个
      })
    },
    readPost (post) {
      this.showingPost = post
      this.openPostWindow()
    },
    closeArchiveWindow () {
      allowWindowScroll()
      this.showArchive = false
      this.showArchiveIndex = -1
    },
    openArchiveWindow (index) {
      preventWindowScroll()
      this.showArchive = true
      this.showArchiveIndex = index
    },
    closePostWindow () {
      allowWindowScroll()
      this.showPost = false
      this.showingPost = {}
    },
    openPostWindow () {
      preventWindowScroll()
      this.showPost = true
    },
    onLoaded () {
      // 数据加载完成后，如果url有变，跳转到指定post
      const hash = location.hash.replace('#/', '')
      if (!hash) return
      const hashInfo = hash.split('/')
      if (hashInfo[0] === 'post') {
        this.loadSinglePost(hashInfo[1]).then(res => res.title && this.readPost(res))
      }
    },
    loadSinglePost (number) {
      // 加载指定post
      const url = urls.issue
      return fetch(`${url}/${number}`).then(res => res.json())
    }
  },
  created () {
    this.onLoaded() // 判断是否需要加载指定post
    this.loadPosts(0)
    this.loadArchives()
    this.loadHotPosts()
  },
  components: {
    Post, Archives, Hot, ArchiveDetail, PostDetail
  }
}
</script>
<style>
@import './style/animation.css';
@import './style/global.css';

@media screen and (max-width: 768px){
  /*手机屏幕 <768px*/
  .layout {
    width: 100%;
  }
  #links {
    padding: 0 20px;
  }
  #banner {
    height: 250px;
  }
  #motto {
    font-size: 60px;
    margin-bottom: -25px;
    font-weight: lighter;
  }
  #archives {
    width: 100%;
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
  #footer-content {
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    font-size: 0.8rem;
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
  #footer-content {
    justify-content: space-between;
    margin: 20px auto;
  }
}

#nav {
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
}
#links {
  line-height: 40px;
  box-sizing: border-box;
  padding: 0 15px;
}
#links a {
  color: #eee;
  font-size: 16px;
  position: relative;
  padding-bottom: 5px;
  margin-right: 10px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  text-decoration: none;
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
}

#footer {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2) inset;
}

#footer-wrap {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/298258a2967dbfcf3cdc4fdcc6daa472ce1c2e2bd35d6");
  background-size: cover;
  background-position-x: center;
  box-sizing: border-box;
  filter: blur(20px) brightness(70%);
  transform: scale(1.5);
}

#footer-content {
  display: flex;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  /* border: 2px solid rgba(255, 255, 255, 0.5); */
  /* background: linear-gradient(to bottom right,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.8)
  ); */
  line-height: 1.5;
}
.footer-links {
  margin-left: 10px;
}
.footer-info a {
  color: #fff;
}
.footer-links a {
  color: #fff;
  margin-right: 5px;
}
</style>
