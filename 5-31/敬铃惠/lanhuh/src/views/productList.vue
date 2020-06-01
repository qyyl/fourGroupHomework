<template>
    <div class="productList">
      <!--导航-->
      <el-row>
        <div class="grid-content bg-purple-dark"><h1>商品列表</h1></div>
      </el-row>
      <!--搜索-->
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="输入搜索" >
          <el-input v-model="searchData.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRestart">重置</el-button>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12"><h3>数据列表</h3></el-col>
        <el-col :span="12">
            <router-link to="/addProduct">
              <el-button>添加</el-button>
            </router-link>
        </el-col>
      </el-row>
      <!--表格-->
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id"
          width="100">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          prop=""
          label="商品图片"
          width="100">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://106.12.22.92:8080'+scope.row.goodsImgs"
              ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsPrice"
          label="价格/货号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsTitle"
          label="标签"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="排序"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsScore"
          label="SKU库存"
          width="100">
        </el-table-column>
        <el-table-column
          prop="goodsScore"
          label="销量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
          width="100">
          <template slot-scope="scope">
            {{scope.row.status | memberStatus(scope.row.status)}}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          >
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
                <h3>商品列表</h3>
                <el-form-item label="商品id">
                  <el-input v-model="updateData.id"></el-input>
                </el-form-item>
                <el-form-item label="商品品牌">
                  <el-input v-model="updateData.brandId"></el-input>
                </el-form-item>
                <el-form-item label="商品名字">
                  <el-input v-model="updateData.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品详情">
                  <el-input type="textarea" v-model="updateData.goodsDetail"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                  <el-input v-model="updateData.goodsImgs"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                  <el-input v-model="updateData.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                  <el-input v-model="updateData.goodsTitle"></el-input>
                </el-form-item>
                <el-form-item label="关键字">
                  <el-input v-model="updateData.keywords"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐">
                  <el-input v-model="updateData.recommend"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="updateData.status" placeholder="请选择">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="锁定" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="large">
                  <el-button type="primary" @click="onUpdate">修改</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference"  @click=" handleEdit (scope.$index, scope.row) ">编辑</el-button>
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
  name: 'productList',
  props: ['text'],
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      updateData: [],
      searchData: {
        goodsName: ''
      },
      //   分页
      currentPage: 1,
      pagesize: 3, // 每页显示的条数
      total: '',
      // 判断是添加还是修改
      editors: 0
    }
  },
  methods: {
    //   分页
    handleSizeChange (val) {
      this.pagesize = val
      this.$axios.post('/goods/list', {
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
      this.$axios.post('/goods/list', {
        page: val,
        pageSize: this.pagesize
      }, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then((res) => {
        console.log('请求回来的数据')
        console.log(res)
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        // this.pageSize = res.data.data.pageSize
        console.log('总条数')
        console.log(this.total)
        // console.log(this.pageSize)
      }).catch((err) => {
        console.log(err)
      })
      console.log(`当前页: ${val}`)
    },
    //   查询
    onSearch () {
      // 先获得值
      this.$axios.post('/goods/list', {
        // brandId: this.searchData.brandId,
        goodsName: this.searchData.goodsName
        // catId: this.searchData.catId,
        // status: this.searchData.status
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
    onRestart () {
      this.searchData.brandId = ''
      this.searchData.goodsName = ''
      this.searchData.catId = ''
      this.searchData.status = ''
    },
    //  修改
    handleEdit (index, row) {
      this.updateData = row
      this.editors = 1
    },
    onUpdate () {
      if (this.editors === 0) {
        //   添加
        this.$axios.post('api/goods/add', {
          id: this.updateData.id,
          brandId: this.updateData.brandId,
          catId: this.updateData.catId,
          goodsDetail: this.updateData.goodsDetail,
          goodsImgs: this.updateData.goodsImgs,
          goodsPrice: this.updateData.goodsPrice,
          goodsScore: this.updateData.goodsScore,
          goodsTitle: this.updateData.goodsTitle,
          keywords: this.updateData.keywords,
          recommend: this.updateData.recommend,
          status: this.updateData.status
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
      } else if (this.editors === 1) {
        this.$axios.post('api/goods/edit', {
          id: this.updateData.id,
          brandId: this.updateData.brandId,
          catId: this.updateData.catId,
          goodsDetail: this.updateData.goodsDetail,
          goodsImgs: this.updateData.goodsImgs,
          goodsPrice: this.updateData.goodsPrice,
          goodsScore: this.updateData.goodsScore,
          goodsTitle: this.updateData.goodsTitle,
          keywords: this.updateData.keywords,
          recommend: this.updateData.recommend,
          status: this.updateData.status
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
    //  添加
    addPro () {
      this.editors = 0
    },
    handleDelete (index, row) {
      console.log('删除进入')
      this.$axios.post('/goods/delete', { id: row.id }, {
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
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  filters: {
    memberStatus (value) {
      let status
      if (value === 1) {
        status = '正常'
      } else {
        status = '锁定'
      }
      return status
    }
  },
  created: function () {
    this.$axios.post('/goods/list', {
      page: this.currentPage,
      pageSize: this.pagesize
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => {
      this.tableData = res.data.data.list
      this.total = res.data.data.total
      // this.pageSize = res.data.data.pageSize
      console.log('总条数')
      console.log(this.total)
      // console.log(this.pageSize)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
