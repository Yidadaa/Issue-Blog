<template>
  <div id="pd-window">
    <div id="pd-container">
      <div id="pd-close-btn" @click="close()"></div>
      <div id="pd-content">
        <div id="pd-info">
          <div id="pd-wrap">
            <div id="pd-title">{{post.title}}</div>
            <div id="pd-desc"># {{post.milestone && post.milestone.title}} #</div>
          </div>
        </div>
        <div id="pd-right">
          <div id="pd-html" v-html="content" @click="clickImg"></div>
          <div id="comments">
            <div id="comments-info">
              <span># {{ comments.length }}条评论</span>
              <a :href="commentURL" class="comment-btn">添加评论</a>
            </div>
            <div class="comment" v-for="comment in comments"
              :key="comment.id">
              <div class="comment-left">
                <img :src="comment.user.avatar_url" :alt="comment.user.login" class="comment-avatar">
              </div>
              <div class="comment-right">
                <div class="comment-info">{{ new Date(comment.created_at).toLocaleDateString() }}</div>
                <div class="comment-content">{{ comment.body }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import { urls } from '../config'

export default {
  props: ['post'],
  data () {
    return {
      comments: [],
      oldTitle: '',
      loading: false,
      commentURL: urls.newComment.replace('{number}', this.post.number)
    }
  },
  computed: {
    content () {
      return this.post && this.post.body 
        && this.processImg(marked(this.post.body))
    }
  },
  methods: {
    close () {
      this.$emit('closePostWindow')
    },
    processImg (html) {
      // 处理文章中的图片，变成可点击的链接
      // return html.replace(/<img src="(.*)"\salt(.*)">/g,
      //   (text,href)=>`<a href='${href}' target='_blank'>${text}</a>`)
      return html;
    },
    clickImg (evt) {
      const Viewer = window.Viewer
      const config = window.viewerConfig
      if (evt.target.nodeName === 'IMG') {
        const imgViewer = new Viewer(evt.target, config)
        imgViewer.show()
      }
    },
    loadComments () {
      this.loading = true
      fetch(urls.comment.replace('{number}', this.post.number)).then(res => res.json())
        .then(res => {
          this.comments = res
      })
      this.loading = false
    }
  },
  created () {
    /**Todo:
     * - 加载评论
     */
    
    history.pushState({}, '', `/#/post/${this.post.number}`)
    this.oldTitle = document.title
    document.title = this.post.title
    this.loadComments()
  },
  destroyed () {
    history.pushState({}, '', `/#/`)
    document.title = this.oldTitle
  }
}
</script>

<style>
@media screen and (max-width: 768px){
  #pd-wrap {
    width: 85%;
    box-sizing: border-box;
  }
  #pd-info {
    width: 100%;
  }
  #pd-content {
    flex-wrap: wrap;
    overflow-y: scroll;
  }
  #pd-html {
    padding: 0px 15px;
    line-height: 24px;
  }
  #pd-html pre {
    overflow-x: scroll;
  }
  #pd-container {
    height: 100%;
    width: 100%;
  }
  #pd-list {
    height: 70%;
  }
  #pd-title {
  }
  #comments {
    padding: 20px;
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
  #pd-html {
    padding: 40px;
  }
  #pd-html pre {
    width: 100%;
  }
  #comments {
    padding: 40px;
  }
  #pd-right {
    overflow-y: scroll;
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
  animation: window-in 0.45s ease-in-out;
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
  background-image: url("http://img.zcool.cn/community/012cad59572a46a8012193a3c3048e.jpg@900w_1l_2o_100sh.jpg");
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
}
#pd-html {
  width: 100%;
  box-sizing: border-box;
  color: #444;
}
#pd-html img {
  width: 100%;
  cursor: pointer;
}
#pd-html blockquote {
  border-left: 5px solid #eee;
  -webkit-margin-start: 0;
  padding-left: 10px;
}
#pd-html a {
  color: #67aeeb;
}

#pd-html pre {
  background: #f8f8f8;
  font-size: 1rem;
  padding: .67rem 1.3rem;
  margin: 0;
  box-sizing: border-box;
}
#pd-html pre code {
  color: #666;
}
#pd-html h1:before,
#pd-html h2:before {
  margin-right: 5px;
}
#pd-html h1,
#pd-html h2 {
  font-weight: normal;
}
#pd-html ol,
#pd-html ul {
  -webkit-padding-start: 20px;
}

#pd-right {
  height: 100%;
  width: 100%;
}

#comments {
  border-top: 1px solid #eee;
}

#comments-info {
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.no-comment {
  text-align: center;
}

.comment {
  display: flex;
  border-bottom: 1px #eee dotted;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.comment:last-child {
  border: 0;
}

.comment-left {
  width: 40px;
}

.comment-avatar {
  height: 40px;
  width: 40px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.comment-right {
  padding-left: 15px;
  width: 100%;
}

.comment-info {
  font-size: 14px;
  color: #aaa;
  line-height: 20px;
}

.comment-btn {
  color: dodgerblue;
}

</style>
