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

/**
 * 新增用户
 * @param params
 */
export function createUser(data) {
  return request({
    url: 'admin/v1/user',
    method: 'post',
    data: data
  })
}


/**
 * 编辑用户
 * @param params
 */
export function updateUser(id, data) {
  return request({
    url: 'admin/v1/user' + id,
    method: 'put',
    data: data
  })
}


/**
 * 删除用户
 * @param params
 */
export function deleteUser(id) {
  return request({
    url: 'admin/v1/user' + id,
    method: 'delete',
  })
}
