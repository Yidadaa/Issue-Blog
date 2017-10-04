<template>
  <div id="milestones" class="post">
    <div class="loading" v-if="milestones.length == 0"></div>
    <div class="ms-wrap" v-else v-bind:class="{'msw-hidden': hidden}">
      <div class="milestone" v-for="(ms, index) in milestones" v-bind:class="{'ms-hidden': hidden}" v-bind:key="ms.id" @click="msClick(ms.id)" v-bind:style="style(index)">
        <div class="ms-content">
          <div class="ms-title">{{ms.title}}</div>
          <div class="ms-desc">{{ms.open_issues}}篇文章</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    milestones: state => state.milestones,
    selected: state => state.selected,
    hidden: state => !state.showms
  }),
  methods: {
    msClick(id) {
      this.$store.commit('msClick', id);
    },
    style(index) {
      let len = this.$store.state.milestones.length;
      len = len == 0 ? 1 : len;
      const x = index / len * 100;
      const y = index / len * 100;
      const background = `background-position: ${x}% ${y}%`;
      const delay = `transition-delay: ${index * 100}ms`;
      return [background, delay].join(';');
    }
  }
}
</script>

<style>
#milestones {
  overflow-x: auto;
  overflow-y: visible;
  white-space: nowrap;
  margin-top: 0;
  text-align: justify;
  box-sizing: border-box;
  padding: 0;
  position: relative;
}

.ms-wrap {
  padding: 5px;
  transition: all ease 0.55s;
  margin-top: 0px;
}

.ms-btn {
  text-align: right;
  font-size: 14px;
  padding: 0 10px 5px 0;
  color: #689;
  user-select: none;
  cursor: pointer;
}

.msw-hidden {
  margin-top: -85px;
}

.ms-hidden {
  transform: translateY(-100px);
}

.milestone {
  line-height: 20px;
  background-color: #7d95b1;
  color: #fff;
  margin-right: 5px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  width: 150px;
  display: inline-block;
  user-select: none;
  overflow: hidden;
  animation: ms-in ease 0.55s;
  cursor: pointer;
  background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/298258a2967dbfcf3cdc4fdcc6daa472ce1c2e2bd35d6");
}

.milestone:active {
  box-shadow: none;
}

.ms-content {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  padding: 10px 10px;
  border: 5px solid #fff;
}

.ms-title {
  border-bottom: 1px dotted rgba(255, 255, 255, 0.3);
}

.ms-desc {
  font-size: 12px;
}

.ms-desc:before,
.ms-desc:after {
  content: ' - ';
}

.ms-selected {
  width: 150px;
}

@keyframes ms-in {
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>