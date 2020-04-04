import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getUserList(params) {
  return request({
    url: 'admin/v1/user',
    method: 'get',
    params: params
  })
}

