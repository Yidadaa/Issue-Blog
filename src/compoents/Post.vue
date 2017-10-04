<template>
  <div id="detail">
    <div class="post-detail" name="post-detail" v-if="detail">
      <div class="comment-header">
        <span class="comment-img">
          <img v-bind:src="detail.user && detail.user.avatar_url">
        </span>
        <a class="comment-user" v-bind:href="detail.user && detail.user.html_url" target="_blank">
          {{detail.user.login}}
        </a>
        <span class="comment-time">发布于{{getTime(detail.created_at)}}</span>
      </div>
      <div class="post-detail-title">
        {{detail.title}}
      </div>
      <div class="post-detail-content" v-html="getHTML(detail.body)"></div>
    </div>
    <div class="loading" v-else></div>
    <div class="comments-wrap post-detail" v-if="comments">
      <div class="comment-info">
        <span class="icon-bubbles3">
          {{detail.comments}}条评论
        </span>
        <a class="add-comment" v-bind:href="`${detail.html_url}#partial-timeline-marker`">
          添加评论
        </a>
      </div>
      <div class="comments" v-for="comment in comments" v-bind:key="comment.id">
        <div class="comment-header">
          <span class="comment-img">
            <img v-bind:src="comment.user && comment.user.avatar_url">
          </span>
          <a class="comment-user" v-bind:href="comment.user && comment.user.html_url" target="_blank">
            {{comment.user && comment.user.login}}
          </a>
          <span class="comment-time">回复于{{getTime(comment.created_at)}}</span>
        </div>
        <div class="comment" v-html="getHTML(comment.body)"></div>
      </div>
    </div>
    <div class="loading" v-else></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import marked from 'marked';
import Position from './Position.vue';
import dateFromNow from '../utils.js';

export default {
  computed: mapState({
    detail(state) {
      const number = this.$route.params.number;
      return state.posts.filter(v => v.number == number)[0] || '';
    },
    comments(state) {
      const number = this.$route.params.number;
      return state.comments[number];
    }
  }),
  methods: {
    getHTML(text) {
      return text && marked(text).replace(/@\w*\b/g, (str) => {
        const username = str.replace('@', '');
        return `<a href="https://github.com/${username}" class="comment-link">${str}</a>`;
      });
    },
    getTime(date) {
      return dateFromNow(date);
    },
    loadComments() {
      const number = this.$route.params.number;
      const comments = this.$store.state.comments;
      if (!comments[number]) {
        this.$store.dispatch('loadComments', number);
      }
    }
  },
  mixins: [Position],
  updated() {
    this.loadComments()
    const title = this.detail.title
    if (title) {
      document.title = title
    }
  },
  created() {
    this.loadComments()
  }
}
</script>
<style>
.comment-info {
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.add-comment {
  color: #666;
  text-decoration: underline;
}

.comment {
  padding-left: 23px;
}

.comments {
  border-bottom: 1px dotted #eee;
  margin-bottom: 15px;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-user {
  margin: 0 5px;
}

.comment-time {
  color: #666;
}

.comment-img {
  display: inline-block;
  height: 18px;
  width: 18px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #eee;
}

.comment-img img {
  height: 100%;
}

.post-detail {
  background-color: #fff;
  margin: 15px 0;
  /* margin-bottom: 10px; */
  padding: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  animation: post-in ease 0.5s;
  transform-origin: 50% 0;
  font-size: 14px;
}

.post-detail-title {
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  border-top: 1px dotted #eee;
  margin-top: 10px;
  border-bottom: 1px dotted #eee;
  padding-top: 20px;
  padding-bottom: 25px;
  margin-bottom: 5px;
  color: #42b983;
}

.post-detail-content {
  width: 100%;
  overflow: hidden;
  line-height: 26px;
}

.post-detail-content a {
  color: #42b983;
}

.post-detail-content img,
.comment img {
  max-height: 300px;
  display: block;
  margin: auto;
  max-width: 100%;
}

@media screen and (max-width: 768px) {
  .post-detail-content img,
  .comment img {
    width: 100%;
    max-height: none;
  }
}

@keyframes post-in {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
