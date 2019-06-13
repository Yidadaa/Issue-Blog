<template>
  <div id="milestones">
    <div class="loading" v-if="milestones.length == 0"></div>
    <div class="ms-wrap" v-else v-bind:class="{'msw-hidden': hidden}">
      <div class="milestone" v-for="(ms, index) in milestones" v-bind:class="{'ms-hidden': hidden}" v-bind:key="ms.id" @click="msClick(index)" v-bind:style="style(index)">
        <div class="ms-mask">
          <div class="ms-title"># {{ms.title}} #</div>
          <div class="ms-desc">{{ms.open_issues}}篇文章</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['milestones'],
  data () {
    return {
      hidden: false
    }
  },
  methods: {
    style (index) {
      let len = this.milestones.length
      len = len === 0 ? 1 : len
      const x = index / len * 100
      const y = index / len * 100
      const background = `background-position: ${x}% ${y}%`
      const delay = `transition-delay: ${index * 100}ms`
      return [background, delay].join(';')
    },
    msClick (index) {
      this.$emit('openArchiveWindow', index)
    }
  }
}
</script>
<style>
  @media screen and (max-width: 768px){
    .milestone {
      width: 150px;
      height: auto;
      min-width: 150px;
      margin-right: 5px;
    }
    .ms-wrap {
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: 100%;
      padding: 5px 0;
    }
  }
  @media screen and (min-width: 768px){
    .milestone {
      width: 100%;
      margin-bottom: 10px;
    }
    .ms-wrap {
      flex-wrap: wrap;
    }
  }
  .ms-wrap {
    display: flex;
  }
  .milestone {
    background-image: url("//hbfile.b0.upaiyun.com/img/home/banner/298258a2967dbfcf3cdc4fdcc6daa472ce1c2e2bd35d6");
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  }
  .ms-mask {
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
  }
  .ms-title {
    font-size: 14px;
    text-align: center;
    color: #fff;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
    line-height: 20px;
    padding: 10px 0 5px 0;
    margin: 0 20px;
  }
  .ms-desc {
    font-size: 12px;
    text-align: center;
    color: #fff;
    padding: 5px 0 10px 0;
  }
</style>
