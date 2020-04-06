import { getUserList, createUser } from "@/api/user.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  userList: [], // 用户列表
  total: 0,
  listQuery: {
    page: 1,
    size: 10,
    name: undefined,
    sortOrder: null,
  },
  listLoading: false,
}

const mutations = {
  SET_EDITVISIBLE: (state, editVisible) => {
    state.editVisible = editVisible;
  },
  SET_ADDVISIBLE: (state, addVisible) => {
    state.addVisible = addVisible;
  },
  SET_USERLIST: (state, userList) => {
    state.userList = userList;
  },
  SET_LISTQUERY: (state, listQuery) => {
    state.listQuery = listQuery;
  },
  SET_TOTAL: (state, total) => {
    state.total = total;
  },
  SET_LISTLOADING: (state, listLoading) => {
    state.listLoading = listLoading
}
}

const actions = {
  async getUserList({ commit, state }) {
    commit("SET_LISTLOADING", true);
    await getUserList(state.listQuery).then(response => {
      if(response.errno === 0) {
        commit("SET_USERLIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  async createUser({ commit, dispatch }, data) {
    var that = this;
    const result = await createUser(data).then((e) => {
      if (e.errno === 0) {
        commit("SET_ADDVISIBLE", false);
        commit("SET_LISTQUERY",{
          page: 1,
            size: 10,
            name: undefined,
            sortOrder: null,
        });
        dispatch("getUserList");
        return { success: true };
      } else {
        return { success: false };
      }
    })
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

