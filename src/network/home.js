import { request, http } from './request';

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return http({
    url: '/api/v1/home/data',
    params: {
      type,
      page
    }
  })
}