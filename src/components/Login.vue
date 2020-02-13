<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.png" alt />
    </div>
    <van-cell-group>
      <van-field
        v-model="form.name"
        clearable
        left-icon="contact"
        placeholder="用户名"
        @blur="checkUsername"
        :error-message="msg.username"
      />
      <van-field
        v-model="form.password"
        type="password"
        left-icon="closed-eye"
        placeholder="密码"
        @blur="checkPassword"
        :error-message="msg.password"
      />

      <div class="btn">
        <van-button
          class="btn_login"
          plain
          type="primary"
          size="large"
          color="pink"
          @click="login"
        >登录</van-button>
        <van-button
          class="btn_register"
          plain
          type="primary"
          size="large"
          color="pink"
          @click="register"
        >注册</van-button>
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      msg: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      let { data: res } = await this.$http.post("user/login", this.form);
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      Toast("登录成功");
      window.sessionStorage.setItem("token", res.data.api_token);
      window.sessionStorage.setItem("name", res.data.name);
      console.log(res.data.name);

      this.$router.push("/home");
    },
    register() {
      this.$router.push("/register");
    },
    checkUsername() {
      let TEL_USER = /^.{5,15}$/;
      if (!TEL_USER.test(this.form.name)) {
        this.msg.username = "请输入5-15位的用户名";
      } else {
        this.msg.username = "";
      }
    },
    checkPassword() {
      let TEL_PASSWORD = /^.{6,15}$/;
      if (!TEL_PASSWORD.test(this.form.password)) {
        this.msg.password = "请输入6-15位的密码";
      } else {
        this.msg.password = "";
      }
    }
  },
  created() {
    this.form.name = this.$route.query.name;
  }
};
</script>
<style lang="less">
.login {
  height: 100vh;
  background: url("../assets/beijing.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .van-cell-group {
    width: 300px;
    // border: 1px pink solid;
    opacity: 0.8;
    position: absolute;
    background-color: transparent;
    top: 40%;
    left: -150px;
    margin-left: 50%;
  }
  .van-field__left-icon {
    margin-right: 50px;
  }
  .van-button--large {
    width: 300px;
  }
  .btn {
    opacity: 0.7;
    // position: absolute;
    // margin-left: 50%;
    // top: 52%;
    // left: -150px;
    .van-button {
      background-color: white;
    }
    .btn_login {
      margin-top: 30px;
    }
  }
}
.logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px white solid;
  margin: 70px auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>