<template>
  <div>
    <roll-msg :list-data="listData" :li-style="liStyle" :slot-show="true" :rollTime="1600">
      <template slot-scope="scope">
        <div style="position:relative;">
          {{ scope.item.phone }}成功下单{{ scope.item.money }}元
          <span style="position:absolute;right:0;">{{ scope.item.time }}</span>
        </div>
      </template>
    </roll-msg>
  </div>
</template>
<script>
import rollMsg from './com/index';

export default {
  name: '',
  components: {
    rollMsg
  },
  data() {
    return {
      listData: [
        { money: "14000", name: "许小姐", phone: "157****7192", time: "1分钟前"},
        { money: "5000", name: "巢先生", phone: "136****6246", time: "2分钟前"}
      ],
      liStyle: {
        backgroundColor: '#FFFFFF',
        color: '#C79446',
        fontSize: '14px',
        padding: '10px',
        paddingLeft: '40px',
        paddingRight: '40px',
      }
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  created() {
  },
  watch: {},
  destroyed() {
  }
};
</script>
<style lang="scss" scoped>
</style>

