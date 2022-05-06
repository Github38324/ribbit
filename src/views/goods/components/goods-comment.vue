<template>
  <div class="goods-comment">
    <div class="head" v-if="commentList">
      <div class="data">
        <p>
          <span>{{ commentList.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentList.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            @click="toggleCurrentTag(i)"
            v-for="(item, i) in commentList.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currentTag === i }"
            >{{item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a @click="changeShort(null)" href="javascript:;" :class="{active:reqParams.sortField===null}">默认</a>
      <a @click="changeShort(createTime)" href="javascript:;" :class="{active:reqParams.sortField==='createTime'}">最新</a>
      <a @click="changeShort(praiseCount)" href="javascript:;" :class="{active:reqParams.sortField==='praiseCount'}">最热</a>
    </div>
      <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentLists" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 图片的预览 -->
           <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i> {{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
     <XtxPagination @current-change="changePager" :total="total" :current-page="reqParams.page"  />
  </div>
</template>
<script>
import { findCommentInfoByGoods, findCommentGoods } from '@/api/product'
import GoodsCommentImage from './goods-comment-image.vue'
import { inject, ref, reactive, watch } from 'vue'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage
  },
  setup () {
    // 激活按钮的变量
    const currentTag = ref(0)
    const goods = inject('goods')
    const commentList = ref(null)
    findCommentInfoByGoods(goods.value.id).then((data) => {
      // 要往list里面追加全部和有有图的选项方便以后的渲染
      data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount,
        type: ''
      })
      data.result.tags.unshift({
        title: '全部评论',
        tagCount: data.result.evaluateCount
      })
      // console.log(data.result)
      commentList.value = data.result
    })

    // 激活tag
    const toggleCurrentTag = (i) => {
      currentTag.value = i
      // 设置有图和标签条件
      const currTag = commentList.value.tags[i]
      if (currTag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = currTag.title
      }
      // 将页码改为1
      reqParams.page = 1
    }
    // 改变升降序
    const changeShort = (sortField) => {
      reqParams.sortField = sortField
      // 将页码改为1
      reqParams.page = 1
    }
    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })
    // 监听tag的变化并请求数据的
    const commentLists = ref(null)
    watch(reqParams, () => {
      findCommentGoods(goods.value.id, reqParams).then(data => {
        commentLists.value = data.result.items
      })
    }, { immediate: true })

    // 定义转化数据的函数
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}:${c}`, '').trim()
    }
    // 定义用户名的隐藏
    const formatNickname = (nikename) => {
      return nikename.substr(0, 1) + '****' + nikename.substr(-1)
    }
    // 实现分页切换
    const changePager = (newPage) => {
      reqParams.page = newPage
    }
    return { commentList, currentTag, toggleCurrentTag, reqParams, commentLists, changeShort, formatSpecs, formatNickname, changePager }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
    .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
