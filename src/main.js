import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import Posts from './compoents/Posts.vue'
import Post from './compoents/Post.vue'
import 'whatwg-fetch'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/post/:number',
    component: Post
  },
  {
    path: '/',
    component: Posts
  }
]

const router = new VueRouter({
routes})

const store = new Vuex.Store({
  state: {
    posts: [],
    curPage: 1,
    noMore: false,
    search: null,
    comments: {},
    loading: true,
    urls: {
      issue: null,
      comment: null,
      milestones: null,
      msPost: null,
    },

    milestones: [],
    selected: -1,
    showms: true,
    msPosts: [],

    pos: {} // 保存页面位置
  },
  mutations: {
    loadPosts(state, posts) {
      state.posts = state.posts.concat(posts)
      state.curPage += 1
    },
    updateComments(state, {comments, index}) {
      state.comments = Object.assign({}, state.comments, {
        [index]: comments
      })
    },
    updateLoadingState(state, loading) {
      state.loading = loading
    },
    updateUrls(state, urls) {
      state.urls = urls
    },
    savePos(state, {name, pos}) {
      state.pos = Object.assign({}, state.pos, {
        [name]: pos
      })
    },
    updateMilestones(state, ms) {
      state.milestones = ms;
    },
    msClick(state, id) {
      state.selected = id;
    },
    togglems(state) {
      state.showms = !state.showms;
    }
  },
  actions: {
    loadNewPosts({commit, state}) {
      const reg = /\!\[.*\]\((.*)\)/
      const url = state.urls.issue
      commit('updateLoadingState', true)
      fetch(state.urls.issue + '?page=' + state.curPage).then(res => res.json()).then(res => {
        commit('loadPosts', res.map(post => {
          const match = post.body.match(reg); // 找出文中第一张图
          const sliceNum = 300
          const cnchars = (post.body.slice(0, sliceNum).match(/[^\x00-\xff]/g) || '').length
          return Object.assign({}, post, {
            short: post.body.slice(0, sliceNum - cnchars)
                .replace(/[\*\#\-\`\>]/g, ' ') + '...',
            image: match && match[1]
          })
        }))
        commit('updateLoadingState', false)
      })
    },
    initConfig({commit, state, dispatch}) {
      fetch('./config.json').then(res => res.json()).then(res => {
        const {username, reponame} = res
        const hostname = 'https://api.github.com'
        const rootPath = `${hostname}/repos/${username}/${reponame}/`;
        const urls = {
          issue: `${rootPath}issues`,
          comment: `${rootPath}issues/{number}/comments`,
          milestones: `${rootPath}milestones`,
          msPost: `${rootPath}issues?milestone={number}`
        }
        commit('updateUrls', urls)
        dispatch('loadNewPosts')
        dispatch('loadMilestones')
      })
    },
    loadComments({commit, state}, number) {
      const url = state.urls.comment
      const comments = state.comments
      // 检测时候已经加载了评论
      // 如果是，则直接返回
      if (!url || comments[number] || !number) return
      const commentUrl = url.replace('{number}', number)
      fetch(commentUrl).then(res => res.json()).then(res => {
        commit('updateComments', {
          comments: res,
          index: number
        })
      })
    },
    loadMilestones({commit, state}) {
      const url = state.urls.milestones;
      if (!url) return
      fetch(url).then(res => res.json()).then(res => {
        commit('updateMilestones', res)
      })
    },
    loadmsPosts({commit, state}, number) {
      const url = state.urls.msPost.replace('{number}', number);
    }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('savePos', {
    name: from.path,
  pos: document.body.scrollTop})
  if (to.path === '/') {
    document.title = 'Yidadaa的个人博客'
  } else {
    
  }
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
