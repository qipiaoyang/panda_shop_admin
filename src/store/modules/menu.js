import {getMenuList, createMenu, getMenuInfo, updateMenu } from "@/api/menu.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  menuList: [], // 用户列表
  total: 0,
  id: "",
  listQuery: {
    page: 1,
    size: 10,
    desc: undefined,
    order: "id desc",
  },
  datainfo: {
    desc: "",
    description: "",
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
  SET_ROLELIST: (state, menuList) => {
    state.menuList = menuList;
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
      desc: undefined,
      order: "id desc",
    }
  }
}

const actions = {
  // 获取列表
  async getMenuList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getMenuList(state.listQuery).then(response => {
      if (response.errno === 0) {
        commit("SET_ROLELIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getMenuInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getMenuInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          desc: response.data.desc,
          description: response.data.description,
        });
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createMenu({commit, dispatch}, data) {
    var that = this;
    const result = await createMenu(data).then((e) => {
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
  async updateMenu({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateMenu({ id: state.id, data: data }).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO",{
          desc: "",
          description: "",
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleMenu({ commit, dispatch, state }, data) {
    const result = await dispatch("updateMenu", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

