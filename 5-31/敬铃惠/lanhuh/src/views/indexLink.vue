<template>
  <div class="indexLink" width="1094px">
    <el-row>
      <div class="grid-content bg-purple-dark"><h1>首页</h1></div>
    </el-row>
      <!--图+文字-->
    <el-col>
        <!--以前订单-->
        <el-row type="flex" class="row-bg" justify="space-between" :gutter="20">
          <el-col :span="6">
            <div class="orderF">
              <div class="left">
                <p>今日订单总数</p>
                <h2>{{this.dataS.orderTotalCount}}</h2>
              </div>
              <div class="right">
                <span class="el-icon-s-order"></span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="orderF">
              <div class="left">
                <p>今日销售总额</p>
                <h2>￥{{this.dataS.todaySaleMoney}}</h2>
              </div>
              <div class="right">
                <span class="">￥</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="orderF">
              <div class="left">
                <p>昨日销售总额</p>
                <h2>￥{{this.dataS.lastDaySaleMoney}}</h2>
              </div>
              <div class="right">
                <span class="el-icon-coin"></span>
              </div>
            </div>
          </el-col>
        </el-row>
        <!--商品+用户-->
        <el-row type="flex" class="row-bg" justify="space-between" :gutter="20">
          <el-col :span="10" class="goodView">
            <h3>商品总览</h3>
            <div class="grid-content bg-purple">
              <el-row  type="flex" class="row-bg" justify="space-between">
                <el-col :span="2.5">
                  <p><span class="el-icon-sold-out icons"></span></p>
                  <p class="viewWord"><span>已下架商品</span></p>
                  <h3>100</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-sell icons"></span></p>
                  <p class="viewWord"><span>已上架商品</span></p>
                  <h3>100</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-warning-outline icons"></span></p>
                  <p class="viewWord"><span>库存紧张</span></p>
                  <h3>50</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-help icons"></span></p>
                  <p class="viewWord"><span>全部商品</span></p>
                  <h3>50</h3>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="10" class="goodView">
            <h3>用户总览</h3>
            <div class="grid-content bg-purple">
              <el-row  type="flex" class="row-bg" justify="space-between">
                <el-col :span="2.5">
                  <p><span class="el-icon-sold-out icons"></span></p>
                  <p class="viewWord"><span>今日新增</span></p>
                  <h3>{{this.dataS.todayNewMemberCount}}</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-sell icons"></span></p>
                  <p class="viewWord"><span>昨日新增</span></p>
                  <h3>{{this.dataS.lastDayNewMemberCount}}</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-warning-outline icons"></span></p>
                  <p class="viewWord"><span>本月新增</span></p>
                  <h3>{{this.dataS.nowMonthNewMemberCount}}</h3>
                </el-col>
                <el-col :span="2.5">
                  <p><span class="el-icon-help icons"></span></p>
                  <p class="viewWord"><span>会员总数</span></p>
                  <h3>{{this.dataS.memberCount}}</h3>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!--比较-->
        <el-row :gutter="20">
          <el-col :span="6" >
            <div class="grid-content bg-purple comprise">
              <div class="left">
                <p>本月订单总数</p>
                <h3>1000</h3>
              </div>
              <div class="right">
                <p>10%</p>
                <p>同比上月</p>
              </div>
            </div>
            <div class="grid-content bg-purple comprise">
              <div class="left">
                <p>本月订单总数</p>
                <h3>1000</h3>
              </div>
              <div class="right">
                <p>10%</p>
                <p>同比上月</p>
              </div>
            </div>
            <div class="grid-content bg-purple comprise">
              <div class="left">
                <p>本月订单总数</p>
                <h3>1000</h3>
              </div>
              <div class="right">
                <p>10%</p>
                <p>同比上月</p>
              </div>
            </div>
            <div class="grid-content bg-purple comprise">
              <div class="left">
                <p>本月订单总数</p>
                <h3>1000</h3>
              </div>
              <div class="right">
                <p>10%</p>
                <p>同比上月</p>
              </div>
            </div>
          </el-col>
          <!--echart-->
          <el-col :span="15">
            <div id="myChart" :style="{width: '700px', height: '300px'}"></div>
          </el-col>
        </el-row>
      </el-col>

  </div>
</template>

<script>
export default {
  name: 'indexLink',
  data () {
    return {
      dataS: {}
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '数量统计' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  },
  mounted () {
    this.drawLine()
  },
  created () {
  }
}
</script>
<style scope>
  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*订单详情开始*/
  .orderF{
    overflow: hidden;
    position: relative;
    width: 280px;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .orderF .left{
    margin: 0 80px;
  }
  .orderF .right{
    width:50px;
    height:50px;
    background:rgba(96,51,221,1);
    border-radius:8px;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 20px;
    position: absolute;
    top:calc(50% - 20px);
    right: 0;
  }
  /*订单详情结束*/
  /*比较开始*/
  .comprise{
    margin-top: 10px;
    width: 180px;
    height: 100px;
  }
  /*比较结束*/
  /*待处理事务开始*/
  .checkThing li{
    list-style: none;
    font-size: 10px;
    overflow: hidden;
    margin-top: 10px;
  }
  .checkThing li>div:nth-of-type(1){
    width:40px;
    height:40px;
    background:rgba(178,156,242,1);
    border-radius:50%;
    line-height: 40px;
    text-align: center;
    color: white;
    float: left;
  }
  .checkThing li>div:nth-of-type(2){
    float: right;
  }

  /*待处理事务结束*/
</style>
