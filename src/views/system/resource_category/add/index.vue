<template>
  <el-dialog title="新增角色" :visible.sync="addVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="角色名" prop="desc">
        <el-input v-model="formObj.desc" placeholder="请输入角色名"/>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formObj.description" placeholder="请输入描述"/>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">
        取消
      </el-button>
      <el-button type="primary" @click="createData()">
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
          desc: "",
          description: "",
        }
      }
    },
    computed: {
      ...mapState({
        addVisible: state => state.resource_category.addVisible,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("resource_category/SET_ADDVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("resource_category/createResourceCategory", this.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '添加用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                  desc: "",
                  description: "",
                };
                that.$store.commit("resource_category/RESET_LISTQUERY");
                that.$store.dispatch("resource_category/getResourceCategoryList");
              } else {
                that.$notify({
                  title: '添加用户失败',
                  message: e.data.errmsg,
                  type: 'fail',
                  duration: 2000
                });
              }
            });
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
