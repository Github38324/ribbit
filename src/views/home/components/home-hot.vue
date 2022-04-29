<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 进行页面加载的动画 -->
    <Transition>
    <ul  ref="pannel" class="goods-list" v-if="goods.length">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img v-lazyload="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <!-- 页面加载的骨架 -->
    <HomeSkeleton v-else></HomeSkeleton>
    </Transition>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findHot } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // 实现懒加载 只需要传入要请求的api和设定监听target可视区进行请求
    const { result, target } = useLazyData(findHot)
    return { goods: result, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
