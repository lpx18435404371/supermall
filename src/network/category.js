
import { http } from './request';


export function getCategory() {
  return http({
    url: '/api/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return http({
    url: '/api/v1/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return http({
    url: '/api/v1/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
