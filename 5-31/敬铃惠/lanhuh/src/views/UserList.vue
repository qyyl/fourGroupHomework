<template>
  <div class="userList">
    <!--导航-->
    <el-row>
      <div class="grid-content bg-purple-dark"><h1>会员列表</h1></div>
    </el-row>
    <!--查询-->
    <el-row>
      <el-col :span="24">
        <!--会员列表-->
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-form-item >
            <el-input v-model="searchData.memberName" placeholder="会员昵称"></el-input>
          </el-form-item>
          <el-form-item >
            <el-input v-model="searchData.memberPhone" placeholder="电话号码"></el-input>
          </el-form-item>
          <el-form-item >
            <el-select v-model="searchData.status" placeholder="会员状态">
              <el-option label="正常" value="1">正常</el-option>
              <el-option label="异常" value="0">异常</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onReset">重置</el-button>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="memberName"
        label="会员昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="memberPhone"
        label="会员手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="memberHeader"
        label="会员头像"
        width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.memberHeader"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="会员状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="changeStaus(scope.$index, scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value=1
            :nactive-value=0>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{dateFormat('YYYY-mm-dd HH:MM:SS', scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" style="margin: 10px">删除</el-button>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form ref="form" :label-position="updateData" :model="updateData.id" label-width="80px" size="mini">
            <h3>修改会员</h3>
            <el-form-item label="会员昵称">
            <el-input v-model="updateData.memberName"></el-input>
            </el-form-item>
              <el-form-item label="会员id">
                <el-input v-model="updateData.id"></el-input>
              </el-form-item>
            <el-form-item label="会员手机">
            <el-input v-model="updateData.memberPhone"></el-input>
            </el-form-item>
            <el-form-item label="会员状态">
              <el-select v-model="updateData.status" placeholder="请选择">
                <el-option label="正常" value="1"></el-option>
                <el-option label="锁定" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="updateData.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="会员头像">
            <el-input v-model="updateData.memberHeader"></el-input>
            </el-form-item>
            <el-form-item size="large">
            <el-button type="primary" @click="onUpdate">修改</el-button>
            <el-button>取消</el-button>
            </el-form-item>
            </el-form>
            <el-button slot="reference"  @click=" handleEdit (scope.$index, scope.row) " size="mini"  style="margin: 10px">编辑</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userList',
  data () {
    return {
      formInline: {
        nickName: '',
        tel: '',
        state: ''
      },
      tableData: [],
      updateData: [],
      searchData: [],
      //   分页
      currentPage: 1,
      pagesize: 3, // 每页显示的条数
      total: ''
      // changeState: false

      // 用于判断是修改还是添加
    }
  },
  methods: {
    //   时间格式化
    dateFormat (fmt, date) {
      let ret = ''
      date = new Date(date)
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
          )
        }
      }
      return fmt
    },

    //   改变状态
    changeStaus (index, row) {
      this.$axios.post('/member/edit', {
        id: row.id,
        status: Number(row.status)
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      console.log('改变之后')
      console.log(row.status)
    },
    //   分页
    handleSizeChange (val) {
      this.pagesize = val
      this.$axios.post('/member/list', {
        page: this.currentPage,
        pageSize: val
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }).catch((err) => {
        console.log(err)
      })
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log('currentPage')
      console.log(this.currentPage)
      this.$axios.post('/member/list', {
        page: val,
        pageSize: this.pagesize
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        // this.pageSize = res.data.data.pageSize
        // console.log(this.pageSize)
      }).catch((err) => {
        console.log(err)
      })
      console.log(`当前页: ${val}`)
    },
    onReset () {
      this.searchData.memberName = ''
      this.searchData.memberPhone = ''
      this.searchData.status = ''
    },
    onSearch () {
      this.$axios.post('/member/list', {
        memberName: this.searchData.memberName,
        memberPhone: this.searchData.memberPhone,
        status: this.searchData.status,
        page: 1,
        pageSize: 3
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log('查询结果')
        console.log(res)
        if (res.data.code === 200) {
          this.$message(res.data.msg)
          this.tableData = res.data.data.list
          console.log('表格数据')
          console.log(this.tableData)
        }
        console.log(res)
      })
    },
    handleEdit (index, row) {
      console.log(row)
      console.log(row)
      this.updateData = row
    },
    handleDelete (index, row) {
      this.$axios.post('/member/delete', { id: row.id }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        if (res.data.code === 200) {
          console.log('删除成功')
          this.$message(res.data.msg)
        }
        console.log(res)
      })
    },
    onUpdate () {
      //   修改传递参数
      this.$axios.post('api/member/edit', {
        id: this.updateData.id,
        status: this.updateData.status,
        memberName: this.updateData.memberName,
        memberPhone: this.updateData.memberPhone,
        memberHeader: this.updateData.memberHeader,
        createTime: this.updateData.createTime
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log('修改数据')
        console.log(res)
        if (res.data.code === 200) {
          this.$message(res.data.msg)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created: function () {
    this.$axios.post('/member/list', {
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      if (res.data.code === 200) {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

</script>

<style scoped>

  /*导航会员列表*/
  el-row:nth-of-type(1)>el-col img{
    width:40px;
    height:40px;
    border-radius:50%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .icons{
    width: 50px;
    text-align: center;
  }
  .nav-word{
    display: inline-block;
    width: 70px;
    margin-left: 10px;
  }
  .navs:hover .icons{
    color:#FD6A30;
  }
  .navs:hover .nav-word{
    color:#FD6A30;
  }

</style>
