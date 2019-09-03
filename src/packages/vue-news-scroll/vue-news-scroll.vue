<template>
<div style="position: relative;">
  <div class="roll-msg-box"
       :style="{'height': rollHeight}">
    <div ref="rollmsgul"
         class="roll-msg-limit-box"
         :style="[{marginTop: -(ulMarginTop) + 'px'}]">
      <!-- @mouseenter="Stop()"
          @mouseleave="Up()" -->
      <ul class="roll-msg"
          v-for="(item, index) in rollData"
          :key="index">
        <li v-for="(items, indexs) in item"
            :key="indexs"
            :style="[liStyle]">
          <span v-if="!slotShow">{{ items }}</span>
          <slot v-else :item="items"></slot>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'vue-news-scroll',
  props: {
    listData: { // 循环数据
      type: Array,
      default: () => {
        return [];
      },
      required: false
    },
    liStyle: { // 循环数据样式
      type: Object,
      default: () => {
        return {
        };
      },
      required: false
    },
    rollTime: { // 循环数据停顿时间
      type: Number,
      default: 2000,
      required: false
    },
    slotShow: { // 是否自定义内容
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      rollDataLength: 0,
      ulMarginTop: 0,
      rollData: [],
      intNum: undefined,
      intTimeOut: undefined,
      offsetHeight: 0,
      rollHeight: '32px'
    };
  },
  computed: {
  },
  created() {
    this.$data.rollData.push(this.listData);
    this.$data.rollData.push(this.listData);
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      _this.ScrollUp();
    });
  },
  methods: {
    ScrollUp() {
      let _this = this;
      // console.log('执行方法');
      this.$nextTick(() => {
        // 异步获取数据高度问题
        _this.$data.offsetHeight = _this.$refs.rollmsgul.offsetHeight;
        // console.log(_this.$refs.rollmsgul.offsetHeight);
        _this.$data.rollDataLength = _this.$data.rollData[0].length * _this.$data.rollData.length || 1;
      });
      // console.log(this.intNum);
      this.intNum = setInterval(() => {
        // 每隔一个li停顿一下
        if (_this.$data.ulMarginTop % (_this.$data.offsetHeight/_this.$data.rollDataLength) === 0) {
          // console.log(_this.$data.ulMarginTop + 'ulMarginTop');
          // console.log(_this.$data.offsetHeight + '_this.$data.offsetHeight');
          // console.log(_this.$data.rollDataLength + '_this.$data.rollDataLength');
          // console.log(_this.$data.offsetHeight/_this.$data.rollDataLength + '每段');
          // console.log(_this.$data.rollData);
          _this.$data.rollHeight = _this.$data.offsetHeight/_this.$data.rollDataLength + 'px';
          // console.log(_this.$data.rollHeight);
          clearInterval(_this.intNum);
          _this.intTimeOut = setTimeout(() => {
            _this.ScrollUp();
            _this.$data.ulMarginTop++;
          }, _this.rollTime);
        }
        // 循环ul
        if (_this.$data.ulMarginTop === _this.$data.offsetHeight) {
          _this.$data.ulMarginTop = 0;
        } else if (_this.$data.ulMarginTop === (_this.$data.offsetHeight / 2  + _this.$data.offsetHeight / _this.$data.rollDataLength)) {
        // 循环ul 到达第二个列表的第一个结束时 把第一个列表拼接到第二个后面
          _this.rollData.push(_this.rollData[0]);
          _this.rollData.shift();
          // 更新当前外层盒子的marigntop 否则会将整个列表替换到之前的位置
          _this.$data.ulMarginTop = _this.$data.offsetHeight / _this.$data.rollDataLength;
          _this.$data.ulMarginTop++;
        } else {
          _this.$data.ulMarginTop++;
        }
      }, 20);
    },
    // 滚动消息高度
    scrollHeight(val) {
      if (this.liStyle.padding) {
        this.$data.rollHeight = ((parseInt(val) + parseInt(this.liStyle.padding) * 2) + 'px');
      } else {
        this.$data.rollHeight = val;
      }
    },
    // 鼠标移上去停止
    Stop() {
      clearInterval(this.intNum);
    },
    Up() {
      this.ScrollUp();
    }
  },
  watch: {
    // 如果数据是从后端拉取回来异步更新的
    listData(val) {
      this.$data.rollData = [val, val];
      if (this.intNum) {
        clearInterval(this.intNum);
      }
      this.ScrollUp();
    }
  },
  beforeDestroy() {
    if (this.intTimeOut) {
      clearTimeout(this.intTimeOut);
    }
    if (this.intNum) {
      clearInterval(this.intNum);
    }
  }
};
</script>
<style>
.roll-msg-box{
  width: 100%;
  height: 39px;
  overflow: hidden;
}
.roll-msg{
  padding: 0;
  list-style:none;
}
.roll-msg-box > .roll-msg{
  background: #ffffff;
}
.roll-msg > li {
  /* // padding: 12px; */
  font-size: 16px;
  text-align: left;
}
</style>

