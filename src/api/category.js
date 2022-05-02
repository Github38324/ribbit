// 定义首页需要的接口函数
import request from '../utils/request'

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

// 获取顶级类目的分类信息
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

// 获取二级类目下的筛选
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

// 获取分类下的商品
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
