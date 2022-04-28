import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ui from './components/library'

// 导入消除库自带的样式
// import 'normalize.css'
// 导入自己的全局样式
import 'normalize.css'
import './assets/style/common.less'

createApp(App).use(store).use(router).use(ui).mount('#app')
