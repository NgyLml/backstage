<template>
  <el-container style="height: 500px; border: 1px solid #eee">

    <el-header style="text-align: right; font-size: 12px">
      <span v-text="result.username"></span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-button @click="back()">返回</el-button>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>个人主页</template>
            <el-menu-item-group v-for="item in $router.options.routes" v-bind:key="item.name">
              <router-link v-for="child in item.children" v-bind:key="child.path" v-bind:to="child.path">
                <el-menu-item>{{child.name}}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>


  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>

  import {getHomeData} from "../network/home";

  export default {
    created() {
      getHomeData().then(res => {
        console.log(res);
        console.log(res.username)
        this.result = res;
      })
    },
    methods: {
      back(){
        window.location.href = "http://localhost:8081/index";
      }
    },
    data() {
      return {
        result: {
          username: ''
        }
      }
    }
  };
</script>
