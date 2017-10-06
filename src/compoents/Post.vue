<template>
  <div class="posts">
    <div class="post" v-for="(post, index) in posts" 
      :key="post.id" v-bind:data-index="index"
      @click="readPost(post)">
    <div class="post-header">
        <span class="user-img">
        <img v-bind:src="post.user.avatar_url">
        </span>
        <span class="user-name">{{post.user.login}}</span>
        <span class="post-time">{{new Date(post.created_at).toLocaleDateString().replace(/\//g, '-')}}</span>
    </div>
    <div class="post-content-wrap">
        <div class="post-content">
        <div class="post-title">
            {{post.title}}
        </div>
        <div class="post-short" v-html="post.short"></div>
        </div>
        <div class="post-img" v-if="post.image">
        <img v-bind:src="post.image">
        </div>
    </div>
    <div class="post-footer">
        <span class="icon-folder-open post-icon" v-if="post.milestone">
          # {{post.milestone.title}} #
        </span>
        <span class="icon-price-tags post-icon" v-if="post.labels.length"></span>
        <span class="post-tags">
            <span class="post-tag" v-for="label in post.labels" v-bind:key="label.id">{{label.name}}</span>
        </span>
        <span class="post-comments icon-bubbles3">
            {{` ${post.comments} 条评论`}}
        </span>
    </div>
    </div>
    <div class="load-more" @click="loadMorePosts()">
      <div class="loading" v-if="loading"></div>
      <div v-else>- {{noMore ? '没有更多了' : '加载更多'}} -</div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['posts', 'loading', 'noMore'],
  methods: {
    readPost (post) {
      this.$emit('readPost', post)
    },
    loadMorePosts () {
      this.$emit('loadMorePosts')
    }
  }
}
</script>

<style>

.load-more {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 10px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
  color: #aaa;
  cursor: pointer;
}

.post-header {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  font-size: 14px;
  border-bottom: 1px dotted #eee;
  padding-bottom: 10px;
  color: #999;
  align-items: center;
}

.post-footer {
  margin-top: 10px;
  border-top: 1px dotted #eee;
  padding-top: 10px;
  font-size: 12px;
  color: #999;
  overflow: auto;
}

.post-tag {
  border-radius: 10px;
  padding: 0px 10px;
  margin-right: 5px;
  display: inline-block;
  background-color: #eee;
  margin-bottom: 5px;
}

.post-content-wrap {
  display: flex;
}

.post-short {
  font-size: 14px;
  padding-right: 15px;
  overflow: hidden;
  color: #888;
}

.post-content {
  width: 100%;
}

.user-img {
  height: 20px;
  width: 20px;
  overflow: hidden;
  display: inline-block;
  border-radius: 20px;
  background-color: #aaa;
}

.user-img img {
  width: 100%;
}

.user-name {
  margin-left: 5px;
}

.post-time {
  margin-left: 5px;
  flex-grow: 1;
  text-align: right;
}

.post-enter-active,
.post-leave-active {
  transition: all 0.55s;
}

.post-enter {
  transform: translateY(-100px);
  opacity: 0;
}

.post-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.post-leave {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.post-leave-to {
  transform: translateY(-100px) scale(2);
  opacity: 0;
}

.post:first-child {
  margin-top: 0;
}

.post {
  text-align: left;
  margin-top: 0px;
  background-color: #fff;
  padding: 15px;
  padding-bottom: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.post-img {
  width: 25%;
  max-height: 150px;
  overflow: hidden;
  display: none;
}

.post-img img {
  max-width: 100%;
  opacity: 0.5;
}

.post-title {
  font-size: 18px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.post-comments {
  float: right;
}
</style>