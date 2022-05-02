
<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for='(item,index) in sliders' :key="index" :class="{fade:i===index}">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 切换上一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 切换下一张 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span @click="i=index" v-for='(item,index) in sliders' :key="index" :class="{active:i===index}"></span>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图的数据
    sliders: {
      type: Array,
      default: () => {}
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 设置默认显示图片的索引
    const i = ref(0)
    // 1 定义轮播图的自动播放
    // eslint-disable-next-line no-unused-vars
    let timer = null
    const autoPlayFn = () => {
      // 防止定时器的重复
      clearInterval(timer)
      timer = setInterval(() => {
        i.value++
        if (i.value >= props.sliders.length) {
          i.value = 0
        }
      }, props.duration)
    }
    // 监听数据的变化
    watch(() => props.sliders, (newval) => {
      // 有数据才能自动播放
      if (newval.length && props.duration) {
        i.value = 0
        autoPlayFn()
      }
    }, { immediate: true })
    // 2 鼠标进入暂停自动轮播
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    // 鼠标离开开启自动轮播
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 3 点击切换图片
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = i.value + step
      // 出错的两种可能
      if (newIndex >= props.sliders.length) {
        i.value = 0
        return
      }
      if (newIndex < 0) {
        i.value = props.sliders.length - 1
        return
      }
      // 正常的时候
      i.value = newIndex
    }
    return { i, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
