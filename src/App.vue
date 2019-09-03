<template>
  <div id="app">
    <vue-news-scroll :list-data="listData" :li-style="liStyle" :slot-show="true" :rollTime="1600">
      <template slot-scope="scope">
        <div style="position:relative;">
          {{ scope.item.phone }}成功下单{{ scope.item.money }}元
          <span style="position:absolute;right:0;">{{ scope.item.time }}</span>
        </div>
      </template>
    </vue-news-scroll>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      listData: [
        { money: '14000', name: '许小姐', phone: '157****7192', time: '1分钟前' },
        { money: '5000', name: '巢先生', phone: '136****6246', time: '2分钟前' }
      ],
      liStyle: {
        backgroundColor: '#FFFFFF',
        color: '#C79446',
        fontSize: '14px',
        padding: '10px',
        paddingLeft: '40px',
        paddingRight: '40px'
      }
    }
  },
  mounted() {
    let _this = this;
    setTimeout(() => {
      _this.$data.listData = [
        { money: '11111', name: '许小姐', phone: '157****7192', time: '1分钟前' },
        { money: '22222', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '3333', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '44444', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '55555', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '6666', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '77777', name: '巢先生', phone: '136****6246', time: '2分钟前' },
        { money: '888888', name: '巢先生', phone: '136****6246', time: '2分钟前' }
      ];
    }, 2000);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dcdcdc;
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}
ul, li{
  list-style: none;
}
</style>
