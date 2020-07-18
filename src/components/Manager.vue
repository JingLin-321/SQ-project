<template>
  <div class="container">
    <div class="top">
      <div class="top-name">浦东新区智慧水情运维系统-后台管理</div>
      <div class="top-menu">
        <div class="top-indexbtn" @click="goIndex">
          <img src="../assets/back.png" alt />
        </div>
        <div class="top-loginbtn">
          <img src="../assets/user.png" alt />
          <div class="loginbtn-wz">{{rows.realName}}</div>
        </div>
        <div class="top-backbtn" @click="goback">
          <img src="../assets/back1.png" alt />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="mainleft">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="$store.state.defaultActive"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="rgba(1,30,60,1)"
              text-color="rgba(255,255,255,1)"
              unique-opened
              :default-openeds="openeds"
            >
              <el-menu-item index="1" @click="goTotal">
                <img src="../assets/sqtj.png" alt />
                <span>运维统计</span>
              </el-menu-item>
              <el-menu-item index="2" @click="gosqTotal">
                <img src="../assets/sqtj.png" alt />
                <span>水情统计</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <img src="../assets/ywjl.png" alt />
                  <span slot="title">运维记录</span>
                </template>

                <el-menu-item index="3-1" @click="go1">日常维护记录表</el-menu-item>
                <el-menu-item index="3-2" @click="go2">数据修正登记表</el-menu-item>

                <el-menu-item index="3-3" @click="go3">应用程序及设备故障登记表</el-menu-item>

                <el-menu-item index="3-4" @click="go4">测站故障情况记录表</el-menu-item>
                <el-menu-item index="3-5" @click="go5">检查维护记录表</el-menu-item>
                <el-menu-item index="3-6" @click="go6">雨量计滴水实验记录表</el-menu-item>
                <el-menu-item index="3-7" @click="go7">降水量数据对比表</el-menu-item>
                <el-menu-item index="3-8" @click="go8">设备变更记录表</el-menu-item>
              </el-submenu>
              <!-- <el-menu-item index="3" @click="goConfiguration">
                <img src="../assets/sbpz.png" alt />
                <span slot="title">设备配置</span>
              </el-menu-item>-->

              <el-submenu index="4">
                <template slot="title">
                  <img src="../assets/sbpz.png" alt />
                  <span slot="title">设备配置</span>
                </template>

                <el-menu-item index="4-1" @click="goConfiguration">资产配置管理表</el-menu-item>
              </el-submenu>

              <el-menu-item index="5" @click="goNone">
                <img src="../assets/xtgl.png" alt />
                <span slot="title">系统管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="mainright">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeList: ["2"],
      openeds: ["3"],

      rows: []
    };
  },
  mounted() {
    this.getAll();
    console.log(this.$store.state.defaultActive);

    if (this.$store.state.defaultActive == "3-1") {
      this.$router.push({ path: "/Run1" });
    }
  },
  methods: {
    //获取用户数据接口
    getAll() {
      this.$fetchGet("getUser")
        .then(response => {
          this.rows = response;
        })
        .catch(function(error) {});
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    go1() {
      this.$router.push({ path: "/Run1" });
      this.$store.state.defaultActive = "3-1";
    },
    go2() {
      this.$router.push({ path: "/Data2" });
      this.$store.state.defaultActive = "3-2";
    },
    go3() {
      this.$router.push({ path: "/device3" });
      this.$store.state.defaultActive = "3-3";
    },
    go4() {
      this.$store.state.defaultActive = "3-4";
      this.$router.push({ path: "/Error4" });
    },
    go5() {
      this.$router.push({ path: "/TableList5" });
      this.$store.state.defaultActive = "3-5";
    },
    go6() {
      this.$store.state.defaultActive = "3-6";
      console.log(this.$store.state.defaultActive);
      this.$router.push({ path: "/Test6" });
    },
    go7() {
      this.$router.push({ path: "/rain7" });
      this.$store.state.defaultActive = "3-7";
    },
    go8() {
      this.$router.push({ path: "/Change8" });
      this.$store.state.defaultActive = "3-8";
    },
    goback() {
      this.$router.push({ path: "/" });
    },
    goIndex() {
      this.$router.push({ path: "/Home" });
    },
    goTotal() {
      this.$router.push({ path: "/Total" });
    },
    goConfiguration() {
      this.$router.push({ path: "/Configuration" });
    },
    gosqTotal() {
      this.$router.push({ path: "/sqTotal" });
    },
    goNone() {
      this.$message("抱歉！系统暂不开放");
    }
  }
};
</script>
<style lang="scss">
.tac {
  width: 260px;
  height: 1010px;
  .el-col-12 {
    width: 100%;
    height: 100%;
  }
  .el-menu-item {
    width: 260px;
    font-size: 16px;
  }
  .el-submenu {
    width: 260px;
  }
  .el-submenu__title {
    font-size: 16px;
  }
  .el-submenu .el-menu-item {
    padding-left: 50px !important;
  }
}
.el-menu-item.is-active {
  background: rgba(33, 140, 246, 1) !important;
  color: white !important;
}
.el-menu-item:hover {
  background: rgba(33, 140, 246, 1) !important;
}
.el-submenu__title:hover {
  background: rgba(33, 140, 246, 1) !important;
}
.el-submenu.is-opened .el-menu-item{
  background: rgba(2, 45, 88, 0.6) !important;
}
.el-submenu.is-opened .el-submenu__title{
  background: rgba(2, 45, 88, 0.6) !important;
}
.el-submenu.is-opened .el-menu-item:hover {
  background: rgba(33, 140, 246, 1) !important;
}
.el-submenu.is-opened .el-submenu__title:hover {
  background: rgba(33, 140, 246, 1) !important;
}
.el-submenu.is-opened .el-menu-item.is-active {
  background: rgba(33, 140, 246, 1) !important;
  color: white !important;
}
</style>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    height: 70px;
    background: rgba(2, 45, 88, 1);
    box-shadow: 0px 2px 4px 0px rgba(1, 25, 12, 0.35);
    display: flex;
    justify-content: space-between;
    .top-name {
      width: 480px;
      margin-left: 42px;
      height: 70px;
      font-size: 26px;
      font-family: SimHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 70px;
    }

    .top-menu {
      width: 260px;
      height: 70px;
      display: flex;
      flex-direction: row;
      .top-indexbtn {
        width: 35px;
        margin-right: 40px;
        height: 70px;
        background: rgba(0, 40, 88, 1);
        box-shadow: 0px 2px 4px 0px rgba(1, 25, 12, 0.35);
        cursor: pointer;
        img {
          margin-top: 21px;
        }
      }
      .top-loginbtn {
        width: 80px;
        height: 70px;
        display: flex;
        flex-direction: row;
        margin-right: 45px;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          margin-top: 20px;
          margin-right: 8px;
        }
        .loginbtn-wz {
          height: 70px;
          font-size: 20px;
          font-family: SimHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 70px;
        }
      }
      .top-backbtn {
        width: 20px;
        height: 70px;
        cursor: pointer;
        img {
          margin-top: 25px;
        }
      }
    }
  }
  .main {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .mainleft {
      width: 260px;
      height: 100%;
      background: rgba(1, 30, 60, 1);
      .tac {
        width: 260px;
        img {
          margin-left: 29px;
          margin-right: 12px;
        }
      }
    }
    .mainright {
      flex: 1;
      width: 0;
      height: 100%;
      box-sizing: border-box;
      background: #EEEEEE;
    }
  }
}
</style>