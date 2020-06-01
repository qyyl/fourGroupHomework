<template>
  <div id="app">

      <div id="nav">
      <router-view></router-view>
    </div>
    <!--导航-->
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      userId: '111'
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color:#FD6A30;
}
  .active{
    color:#FD6A30;
    text-decoration: none;
  }
</style>
