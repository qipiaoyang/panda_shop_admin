<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入渠道名称" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        添加用户
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh"
                 @click="resetList">
        重置
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="基本信息" prop="id" sortable="custom" align="center" width="180"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.channel_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.idcard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="返点" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rates }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.updateline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="选择渠道用户" v-if="dialogStatus === 'create'">
          <el-select v-model="temp.id" class="filter-item" placeholder="请选择渠道用户">
            <el-option v-for="(item,index) in userOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道名称" prop="email">
          <el-input v-model="temp.channel_name" placeholder="请输入渠道名称"/>
        </el-form-item>
        <el-form-item label="渠道费率" prop="email">
          <el-input v-model="temp.rates" placeholder="请输入渠道费率"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { getUserList } from "@/api/user.js";
  import Pagination from '@/components/Pagination'


  export default {
    name: 'user_list',

    components: {
      Pagination,
    },
    data() {

      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          size: 10,
          name: undefined,
          sortOrder: null,
        },
        userOptions: [],
        temp: {
          id: "",
          channel_name: "",
          rates: 0
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑渠道',
          create: '新增渠道'
        },
        dialogPvVisible: false,
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapState({
        token: state => state.user.token
      }),
      headers() {
        return {
          token: this.$store.state.user.token
        };
      }
    },
    methods: {
      getAllChannel() {
        let that = this;
        getAllChannel().then(response => {
          if(response.errno === 0) {
            that.userOptions = response.data;
          }
        })
      },
      // 重置功能
      resetList() {
        this.listQuery = {
          page: 1,
          size: 10,
          name: undefined,
          sortOrder: null,
        };
        this.getList();
      },
      getList() {
        this.listLoading = true
        getUserList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.count

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        })
      },
      resetTemp() {
        this.temp = {
          id: "",
          channel_name: "",
          rates: 0
        }
      },
      sortChange(data) {
        const {prop, order} = data
        console.log(data)
        if (prop === 'id') {
          if(order === "ascending") {
            this.listQuery.sortOrder = "asc"
          } else if(order === "descending") {
            this.listQuery.sortOrder = "desc";
          } else {
            this.listQuery.sortOrder = null;
          }
          this.getList();
        }
      },
      // 添加分类
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const data = {
              id: this.temp.id,
              channel_name: this.temp.channel_name,
              rates: this.temp.rates
            };
            channelStore(data).then((e) => {
              if (e.errno === 0) {
                this.dialogFormVisible = false
                this.$notify({
                  title: '添加渠道用户成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '添加渠道用户失败',
                  message: e.data.errmsg,
                  type: 'fail',
                  duration: 2000
                })
              }
              that.getList();
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, {
          id: row.id,
          channel_name: row.channel_name,
          rates: row.rates
        }) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp = Object.assign({}, {
              id: this.temp.id,
              channel_name: this.temp.channel_name,
              rates: this.temp.rates
            }) // copy obj
          //   channelStore(this.temp).then((e) => {
          //     if (e.errno === 0) {
          //       this.dialogFormVisible = false
          //       this.$notify({
          //         title: '修改渠道成功',
          //         type: 'success',
          //         duration: 2000
          //       })
          //     } else {
          //       this.$notify({
          //         title: '修改渠道失败',
          //         message: e.data.errmsg,
          //         type: 'fail',
          //         duration: 2000
          //       })
          //     }
          //     that.getList();
          //   })
          }
        })
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  };
</script>
