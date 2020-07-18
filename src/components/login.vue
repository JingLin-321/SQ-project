<template>
  <div class="container1">
    <div class="mainid"></div>
    <div class="login">
      <div class="inputType1">
        <img
          style="margin-left: 33px;
    margin-top: 12px;margin-right:18px;margin-bottom:11px;"
          src="../assets/userIcon.png"
          alt
        />
        <input
          type="text"
          style="height:50px;background:none;color:#fff;  
    outline:none;  
    border:none;"
          class="qxs-ic_user qxs-icon"
          placeholder="请输入用户名"
          v-model="userName"
        />
      </div>
      <div class="inputType2">
        <img
          style="margin-left: 33px;
    margin-top: 12px;margin-right:18px;margin-bottom:11px;"
          src="../assets/mm.png"
          alt
        />

        <input
          type="password"
          style="height:50px;background:none; color:#fff; 
    outline:none;  
    border:none;"
          class="qxs-ic_password qxs-icon"
          placeholder="请输入密码"
          v-model="password"
        />
      </div>
      <div class="login-to">
        <div class="remember">
          <el-checkbox v-model="isRemember" class="check">记住密码</el-checkbox>
        </div>
        <div class="forget">忘记密码？</div>
      </div>
      <div class="login-add" @click="getAll1">
        <el-button>登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import base64 from "../../libs/base.js";
import md5 from "js-md5";
export default {
  data() {
    return {
      isRemember: true,
      password: "",
      userName: ""
    };
  },
  created() {
    this.userName = localStorage.getItem("userNameSa");
    this.password = localStorage.getItem("passwordSa");
    document.onkeydown = event => {
      //回车登录
      if (event.keyCode === 13&&this.$route.path == "/login") {
        this.getAll1();
      }
    };
  },
  mounted() {},
  methods: {
    //记住密码
    rememberPasswordS() {
      if (this.isRemember) {
        localStorage.setItem("userNameSa", this.userName);
        localStorage.setItem("passwordSa", this.password);
      } else {
        localStorage.removeItem("userNameSa");
        localStorage.removeItem("passwordSa");
      }
    },
    getAll1() {
      if (this.userName === "" || this.password === "") {
        alert("账号或密码不能为空");
      } else {
        let timeNumber = new Date().getTime();
        let b = new base64();
        let obj = {
          username: this.userName,
          password: b.encode(this.password)
        };
        this.$fetchPost("login", obj).then(res => {
          console.log(res);
          if (res.status == 1) {
            this.rememberPasswordS();
            this.$router.push({ path: "/Home" });
          } else if (res.status == 0) {
            this.$message.error(res.msg);
          }
        });
        // this.$router.push({ path: "/Home" });
      }
    }
  }
};
</script>
<style>
.remember .el-checkbox__inner {
  width: 24px;
  height: 24px;
  border: 1px solid rgba(9, 110, 233, 1);
  border-radius: 4px;
  background: none;
}
.remember .el-checkbox__label {
  height: 30px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
}
.login-add .el-button {
  background: none;
  outline: none;
  border: none;
  width: 437px;
  height: 50px;
  font-size: 24px;
  font-family: SimHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}

.check .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: none;
}
.login-add .el-button:hover {
  background: linear-gradient(
    0deg,
    rgba(1, 111, 221, 1) 0%,
    rgba(9, 57, 168, 1) 100%
  );
}
.login-add .el-button:focus {
  background: linear-gradient(
    0deg,
    rgba(1, 111, 221, 1) 0%,
    rgba(9, 57, 168, 1) 100%
  );
}

.remember .el-checkbox__inner::after {
  position: absolute;
  left: 10px;
  top: 5px;
}
</style>

<style type="text/css" scoped>
.container1 {
  width: 100%;
  height: 100%;
  background: black;
}
.mainid {
  width: 1402px;
  height: 294px;
  background: url("../assets/denglu.png") no-repeat;
  position: absolute;
  left: 259px;
  top: 393px;
}
.login {
  width: 557px;
  height: 452px;
  background: rgba(0, 35, 149, 0.2);
  border: 1px solid rgba(0, 101, 178, 1);
  position: absolute;
  left: 1065px;
  top: 314px;
}
.inputType1 {
  width: 437px;
  height: 50px;
  border: 1px solid rgba(9, 110, 233, 1);
  opacity: 0.8;
  border-radius: 4px;
  margin-left: 60px;
  margin-top: 72px;
  display: flex;
  flex-direction: row;
}
.inputType2 {
  width: 437px;
  height: 50px;
  border: 1px solid rgba(9, 110, 233, 1);
  opacity: 0.8;
  border-radius: 4px;
  margin-top: 41px;
  margin-left: 60px;
  display: flex;
  flex-direction: row;
}
.login-to {
  display: flex;
  justify-content: space-between;
}
.remember {
  width: 130px;
  height: 30px;
  margin-left: 60px;
  margin-top: 39px;
}
.check:checked {
  /* background-position: -48px 0; */
  background: none; /*复选框的背景图*/
}
.forget {
  width: 90px;
  height: 30px;
  margin-right: 60px;
  margin-top: 39px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  cursor: pointer;
}
.login-add {
  width: 437px;
  height: 50px;
  background: linear-gradient(
    0deg,
    rgba(1, 111, 221, 1) 0%,
    rgba(9, 57, 168, 1) 100%
  );
  border: 2px solid rgba(60, 98, 192, 1);
  border-radius: 6px;
  margin-left: 60px;
  margin-top: 55px;
}
</style>