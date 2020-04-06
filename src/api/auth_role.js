import request from '@/utils/request'

/**
 * 获取用户列表
 * @param params
 */
export function getAuthRoleList(params) {
  return request({
    url: 'admin/v1/auth_role',
    method: 'get',
    params: params
  })
}

