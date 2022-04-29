<template>
  <div class="home-entry">
    <div class="container">
<!-- 左侧目录 -->
<HomeCategory></HomeCategory>
<!-- 右侧轮播图 -->
<HomeBanner></HomeBanner>
    </div>
 </div>
  <!-- 新鲜好物 -->
<HomeNew></HomeNew>
<!-- 人气推荐 -->
<HomeHot></HomeHot>
<!-- 品牌推荐 -->
<HomeBrand></HomeBrand>
<!-- 好物推荐 -->
<HomeProduct></HomeProduct>
<!-- 最新专题 -->
<HomeSpecial></HomeSpecial>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: 'Home-a',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped>

</style>
