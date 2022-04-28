// 首页需要的api
import request from '@/utils/request'

// 获取品牌的api 参数表示品牌的数量
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
