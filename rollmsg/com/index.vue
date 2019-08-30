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
  name: '',
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      },
      required: false
    },
    liStyle: {
      type: Object,
      default: () => {
        return {
        };
      },
      required: false
    },
    rollTime: {
      type: Number,
      default: 2000,
      required: false
    },
    slotShow: {
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
      offsetHeight: 0
    };
  },
  computed: {
    rollHeight() {
      let fontSize = this.liStyle.fontSize;
      let padding = this.liStyle.padding;
      return fontSize ? (padding ? ((parseInt(fontSize) + parseInt(padding) * 2) + 'px') : fontSize) : '16px';
    }
  },
  created() {
    this.$data.rollData.push(this.listData);
    this.$data.rollData.push(this.listData);
  },
  mounted() {
    this.$data.offsetHeight = this.$refs.rollmsgul.offsetHeight;
    this.$data.rollDataLength = this.$data.rollData[0].length * this.$data.rollData.length;
    this.ScrollUp();
  },
  methods: {
    ScrollUp() {
      let _this = this;
      this.intNum = setInterval(() => {
        // 每隔一个li停顿一下
        if (_this.$data.ulMarginTop % (_this.$data.offsetHeight/_this.$data.rollDataLength) === 0) {
          console.log(_this.$data.ulMarginTop + 'ulMarginTop');
          console.log(_this.$data.offsetHeight/_this.$data.rollDataLength + 'offsetHeight');
          clearInterval(this.intNum);
          this.intTimeOut = setTimeout(() => {
            _this.ScrollUp();
            _this.$data.ulMarginTop++;
          }, _this.rollTime);
        }
        // 循环ul
        if (_this.$data.ulMarginTop === _this.$data.offsetHeight) {
          _this.$data.ulMarginTop = 0;
        } else if (_this.$data.ulMarginTop === (_this.$data.offsetHeight / 2  + _this.$data.offsetHeight / _this.$data.rollDataLength)) {
        // 循环ul 到达第二个列表的第一个结束时 把第一个列表拼接到第二个后面
          _this.rollData.push(this.rollData[0]);
          _this.rollData.shift();
          // 更新当前外层盒子的marigntop 否则会将整个列表替换到之前的位置
          _this.$data.ulMarginTop = _this.$data.offsetHeight / _this.$data.rollDataLength;
          _this.$data.ulMarginTop++;
        } else {
          _this.$data.ulMarginTop++;
        }
      }, 20);
    },
    // 鼠标移上去停止
    Stop() {
      clearInterval(this.intNum);
    },
    Up() {
      this.ScrollUp();
    }
  },
  watch: {},
  destroyed() {
    clearTimeout(this.intTimeOut);
    clearInterval(this.intNum);
  }
};
</script>
<style lang="scss" scoped>
.roll-msg-box{
  margin-top: 200px;
  width: 100%;
  // height: 40px;
  height: 16px;
  overflow: hidden;
  .roll-msg{
    background: #ffffff;
    li {
      // padding: 12px;
      font-size: 16px;
    }
  }
}
</style>

