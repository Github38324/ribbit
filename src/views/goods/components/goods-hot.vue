<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="hotList">
      <GoodsItem v-for="item in hotList" :key="item.id" :goods="item"/>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findHotGoods } from '@/api/product'
import GoodsItem from '@/views/category/components/goods-item.vue'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    // 判断传入的数字来改标题
    const titleObj = { 1: '24小时热榜', 2: '周热榜', 3: '总热榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    // 获取商品列表
    const hotList = ref([])
    const route = useRoute()
    findHotGoods({ id: route.params.id, type: props.type }).then(data => {
      hotList.value = data.result
    })
    return { hotList, title }
  }
}
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
