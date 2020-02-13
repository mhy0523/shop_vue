<template>
  <div class="register">
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
        v-model="form.email"
        left-icon="envelop-o"
        placeholder="邮箱"
        @blur="checkEmail"
        :error-message="msg.email"
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
          class="btn_register"
          plain
          type="primary"
          size="large"
          color="pink"
          @click="isRegister"
        >确认注册</van-button>
        <van-button plain type="primary" size="large" color="pink" @click="back">返回</van-button>
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
        email: "",
        password: ""
      },
      msg: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async isRegister() {
      let { data: res } = await this.$http.post("user/register", this.form);
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg);
      Toast("用户注册成功");

      this.$router.push({
        path: "/login",
        query: {
          name: this.form.name
        }
      });
    },
    back() {
      this.$router.back();
    },
    checkUsername() {
      let TEL_USER = /^.{5,15}$/;
      if (!TEL_USER.test(this.form.name)) {
        this.msg.username = "请输入5-15位的用户名";
      } else {
        this.msg.username = "";
      }
    },
    checkEmail() {
      let TEL_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!TEL_EMAIL.test(this.form.email)) {
        this.msg.email = "请输入正确的邮箱地址";
      } else {
        this.msg.email = "";
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
  }
};
</script>
<style lang="less">
.register {
  height: 100vh;
  background: url("../assets/beijing.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .van-cell-group {
    width: 300px;
    margin: 0 auto;
    // border: 1px pink solid;
    margin-bottom: 20px;
    opacity: 0.8;
    position: absolute;
    top: 40%;
    left: -150px;
    margin-left: 50%;
    background-color: transparent;
  }
  .van-field__left-icon {
    margin-right: 50px;
  }
  .van-button--large {
    width: 300px;
  }
  .btn {
    //     position: absolute;
    //     top: 68%;
    // left: -150px;
    opacity: 0.7;
    // margin-left:50%;
    .van-button {
      background-color: white;
    }
    .btn_register {
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