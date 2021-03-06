import {getAuthRoleList, createAuthRole, getAuthRoleInfo, updateAuthRole } from "@/api/auth_role.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  roleList: [], // 用户列表
  total: 0,
  id: "",
  listQuery: {
    page: 1,
    size: 10,
    role_name: undefined,
    order: "role_id desc",
  },
  datainfo: {
    role_name: "",
    role_desc: "",
  }, // 用户信息
  listLoading: false,
}

const mutations = {
  SET_EDITVISIBLE: (state, editVisible) => {
    state.editVisible = editVisible;
  },
  SET_ADDVISIBLE: (state, addVisible) => {
    state.addVisible = addVisible;
  },
  SET_ROLELIST: (state, roleList) => {
    state.roleList = roleList;
  },
  SET_LISTQUERY: (state, listQuery) => {
    state.listQuery = listQuery;
  },
  SET_TOTAL: (state, total) => {
    state.total = total;
  },
  SET_LISTLOADING: (state, listLoading) => {
    state.listLoading = listLoading
  },
  SET_DATAINFO: (state, datainfo) => {
    state.datainfo = datainfo;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  RESET_LISTQUERY: (state, listQuery) => {
    state.listQuery = {
      page: 1,
      size: 10,
      role_name: undefined,
      order: "role_id desc",
    }
  }
}

const actions = {
  // 获取列表
  async getAuthRoleList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getAuthRoleList(state.listQuery).then(response => {
      if (response.errno === 0) {
        commit("SET_ROLELIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getAuthRoleInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getAuthRoleInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          role_name: response.data.role_name,
          role_desc: response.data.role_desc,
        });
        commit("SET_ID", response.data.role_id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createAuthRole({commit, dispatch}, data) {
    var that = this;
    const result = await createAuthRole(data).then((e) => {
      if (e.errno === 0) {
        commit("SET_ADDVISIBLE", false);

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 编辑用户
  async updateAuthRole({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateAuthRole({ role_id: state.id, data: data }).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO",{
          role_name: "",
          role_desc: "",
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleAuthRole({ commit, dispatch, state }, data) {
    const result = await dispatch("updateAuthRole", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

