import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 全站设计令牌与工具类。放在 element-plus 样式之后，
// 这样 theme.css 里的 body / 重置样式才能覆盖 Element 的默认值。
import './assets/theme.css'

// 导入icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// .use(ElementPlus)使用
app.use(store).use(router).use(ElementPlus).mount('#app')
