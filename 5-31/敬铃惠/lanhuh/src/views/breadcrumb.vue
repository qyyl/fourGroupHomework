<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(list, index) in currentPath" :key="index">{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb.vue',
  data () {
    return {
    }
  },
  props: ['currentPath']
}
</script>

<style scoped>

</style>
