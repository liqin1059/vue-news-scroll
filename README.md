# vue-news-scroll
[![NPM version](https://img.shields.io/npm/v/vue-news-scroll.svg)](https://www.npmjs.com/package/vue-news-scroll)

-  vue 滚动消息插件👫
-  滚动样式
-  滚动时间间隔
-  滚动自定义插槽
-  支持异步获取滚动数据

# 效果展示

![avatar](/src/assets/rollmsggif.gif)

## npm

``` bash

# npm install
npm install vue-news-scroll --save

```
## 引入

在main.js中引入

```js
import vueNewsScroll from 'vue-news-scroll'
Vue.use(vueNewsScroll)
```

## 使用

###  滚动消息

``` html
<vue-news-scroll
  :list-data="listData"
  :li-style="liStyle"
  :rollTime="1600">
</vue-news-scroll>
```

| 参数 | 类型 | 备注 | 默认值 |
|  ------ | ------ | ------ | ------ |
| listData | Array | 循环数据 | [] |
| liStyle | Object | 循环数据样式<br>（驼峰命名：backgroundColor） | {} |
| rollTime | Number | 循环数据停顿时间 | 2000 |
| slotShow | Boolean | 是否使用自定义插槽 | false |

###  使用自定义插槽

- 设置属性slotShow为true

``` html
<vue-news-scroll
  :list-data="listData"
  :li-style="liStyle"
  :slot-show="true"
  :rollTime="1600">
  <template slot-scope="scope">
    <div style="position:relative;">
      {{ scope.item.phone }}
      成功下单
      {{ scope.item.money }}元
      <span style="position:absolute;right:0;">
        {{ scope.item.time }}
      </span>
    </div>
  </template>
</vue-news-scroll>
```

属性举例

```
listData: [
  { money: '14000', name: '许小姐', phone: '157****7192', time: '1分钟前' },
  { money: '5000', name: '巢先生', phone: '136****6246', time: '2分钟前' }
]
```

```
liStyle: {
  backgroundColor: '#FFFFFF',
  color: '#C79446',
  fontSize: '14px',
  padding: '10px', // 最好设置一点padding
  paddingLeft: '40px',
  paddingRight: '40px'
}
```

源码地址：[https://github.com/liqin1059/vue-news-scroll](https://github.com/liqin1059/vue-news-scroll)

