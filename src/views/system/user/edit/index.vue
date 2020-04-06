<template>
  <el-dialog title="编辑用户" :visible.sync="editVisible">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="formObj.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formObj.password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formObj.mobile" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="mobile">
        <el-input v-model="formObj.email" placeholder="请输入邮箱"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">
        取消
      </el-button>
      <el-button type="primary" @click="updateData()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "index.vue",
    data() {
      return {
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        formObj: {
          username: "",
          password: "",
          mobile: "",
          email: "",
        }
      }
    },
    computed: {
      ...mapState({
        editVisible: state => state.user.editVisible,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("user/SET_EDITVISIBLE", false);
      }
    }

  }
</script>

<style scoped>

</style>
