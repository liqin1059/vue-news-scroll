import vueNewsScroll from './vue-news-scroll'

vueNewsScroll.install = Vue => Vue.component(vueNewsScroll.name, vueNewsScroll);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueNewsScroll);
}

export default vueNewsScroll