<template>
<!-- 顶部通栏 -->
  <AppTopNavbar></AppTopNavbar>
<!-- 头部组件 -->
    <AppHeader></AppHeader>
<!-- 吸顶头部 -->
    <AppHeaderSticky></AppHeaderSticky>
  <!-- n内容 -->
  <div class="appp">
<router-view></router-view>
  </div>
  <AppFooter></AppFooter>

</template>

<script>
import AppTopNavbar from '../components/app-topNavbar.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import AppHeaderSticky from '../components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: 'Layout-a',
  components: {
    AppTopNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getlist')
  }
}
</script>

<style>
.appp{
  min-height: 700px;

}
</style>
