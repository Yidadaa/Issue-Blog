<template>
  <div class="posts">
    <Milestones/>
    <transition-group v-on:beforeEnter="beforeEnter">
      <div class="post" v-for="(post, index) in posts" :key="post.id" v-bind:data-index="index">
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
              <router-link v-bind:to="'/post/'+post.number">
                {{post.title}}
              </router-link>
            </div>
            <div class="post-short" v-html="post.short"></div>
          </div>
          <div class="post-img" v-if="post.image">
            <img v-bind:src="post.image">
          </div>
        </div>
        <div class="post-footer">
          <span class="icon-folder-open post-icon" v-if="post.milestone">
            {{post.milestone.title}}
          </span>
          <span class="icon-price-tags post-icon" v-if="post.labels.length"></span>
          <span class="post-tags">
            <span class="post-tag" v-for="label in post.labels" v-bind:key="label.id">{{label.name}}</span>
          </span>
          <span class="post-comments icon-bubbles3">
            {{` ${post.comments}`}}
          </span>
        </div>
      </div>
    </transition-group>
    <div class="load-more" @click="loadMore">
      <div class="loading" v-if="loading"></div>
      <div v-else>加载更多</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Position from './Position.vue';
import marked from 'marked';
import Milestones from './Milestones.vue';

export default {
  computed: mapState({
    posts: state => state.posts,
    loading: state => state.loading
  }),
  methods: {
    beforeEnter(el) {
      el.style.transitionDelay = el.dataset.index * 100 + 'ms';
    },
    loadMore() {
      this.$store.dispatch('loadNewPosts');
    }
  },
  mixins: [Position],
  components: {
    Milestones
  }
}
</script>

<style>
.load-more {
  text-align: center;
  margin-top: 10px;
  background-color: #fff;
  margin: 15px 0;
  padding: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  color: #42b983;
}

.post-header {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  font-size: 14px;
  border-bottom: 1px dotted #eee;
  padding-bottom: 10px;
  color: #666;
  align-items: center;
}

.post-footer {
  margin-top: 10px;
  border-top: 1px dotted #eee;
  padding-top: 10px;
  font-size: 12px;
  color: #666;
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

.post {
  text-align: left;
  margin-top: 10px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
}

.post-img {
  width: 25%;
  max-height: 150px;
  overflow: hidden;
}

.post-img img {
  max-width: 100%;
  opacity: 0.5;
}

.post-title {
  font-size: 18px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>

