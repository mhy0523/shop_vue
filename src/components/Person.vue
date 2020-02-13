<template>
  <div class="person">
    <div class="top">
      <div class="topInner">
        <div class="touxiang">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="pleaseLogin" @click="toLogin" v-if="this.token==null">点击登录账户</div>
        <div class="pleaseLogin" v-else>{{ this.userName }}</div>
        <div class="youhui">
          <div class="hongbao">
            <p>{{ this.token ==null?'0.00':'8.31' }}</p>
            <span>现金红包(元)</span>
          </div>
          <div class="youhuiquan">
            <p>{{ this.token ==null?'0':'5' }}</p>
            <span>优惠券</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <van-cell title="全部订单" is-link @click="allorder" />
      <div class="linkclass">
        <div class="scorll">
          <div class="link_item">
            <van-icon name="peer-pay" />
            <p>待发货</p>
          </div>
          <div class="link_item">
            <van-icon name="tosend" />
            <p>待收货</p>
          </div>
          <div class="link_item">
            <van-icon name="flower-o" />
            <p>评价</p>
          </div>
          <div class="link_item">
            <van-icon name="contact" />
            <p>会员</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-cell class="upload" v-if="token == null" title="上传头像" @click="nullicon" />
      <input class="upload" v-else @change="changeicon($event)" type="file" value="上传头像" />
      <van-cell title="收货地址管理" is-link @click="toAddressList" />
      <van-cell title="修改头像" is-link />
      <van-cell title="账户设置" is-link @click="allorder" />
      <van-cell title="退出登录" is-link @click="singout" />
    </div>
    <van-tabbar v-model="active" active-color="#F88EA0">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classification">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/shoppingcar">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/person">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 3,
      isLogin: false,
      token: "",
      userName: "",
      pic: ""
    };
  },
  methods: {
    //没有头像
    nullicon() {
      Toast("请登录后修改");
    },
    toLogin() {
      this.$router.push("/login");
    },
    //改变用户头像
    async changeicon(e) {
      let img = e.target.files[0];
      let form = new FormData();
      form.append("pic", img, img.name);
      let { data: res } = await this.$http.post("user/upload", form);
      console.log(img);
    },
    //全部订单
    allorder() {
      if (this.token == null) {
        Toast("请登录后查看");
      }
    },
    //跳转到地址列表页
    toAddressList() {
      if (this.token == null) {
        Toast("请登录后查看");
      } else {
        this.$router.push("/addresslist");
      }
    },
    //退出登录
    singout() {
      window.sessionStorage.removeItem("name");
      window.sessionStorage.removeItem("token");
      this.token = null;
      Toast("退出成功");
    }
  },
  created() {
    this.token = window.sessionStorage.getItem("token");
    this.userName = window.sessionStorage.getItem("name");
    console.log(this.token);
  }
};
</script>
<style lang="less">
.person {
  .top {
    width: 100%;
    height: 200px;
    background-image: url("../assets/personbeijing.jpg");
    position: relative;
  }
  .topInner {
    width: 90%;
    height: 170px;
    background-color: white;
    border-radius: 20px;
    position: absolute;
    top: 90px;
    left: 5%;
    box-shadow: 5px 10px 15px 2px rgba(0, 0, 0, 0.1);
  }
  .touxiang {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: -60px;
    left: 50%;
    margin-left: -45px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pleaseLogin {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%, -15%);
    background-color: #f29c9f;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
  }
  .youhui {
    display: flex;
    width: 100%;
    margin-top: 80px;
    p {
      display: inline-block;
      margin: 10px auto 10px;
    }
    span {
      display: inline-block;
      margin: 0 auto;
      color: #999;
    }
    .hongbao {
      width: 50%;
      height: 80px;
      display: flex;
      flex-direction: column;
      border-right: 1px #eeeeee solid;
    }
    .youhuiquan {
      width: 50%;
      height: 80px;
      display: flex;
      flex-direction: column;
    }
  }
  .main {
    margin-top: 80px;
    padding: 0 20px;
    .van-cell {
      border-top: 1px #eee solid;
    }
    .linkclass {
      width: 100%;
      overflow: scroll;
      height: 90px;
      border-top: 1px #eee solid;
      border-bottom: 1px #eee solid;
      .scorll {
        display: flex;
        height: 100%;
        justify-content: space-around;
      }
      .link_item {
        display: flex;
        flex-direction: column;
        width: 77px;
        height: 100%;
        color: rgb(75, 75, 75);
        text-align: center;
        .van-icon {
          font-size: 30px;
          margin: 10px auto;
          margin-top: 20px;
        }
      }
    }
  }
  .footer {
    padding: 0 20px;
    position: relative;
    .upload {
      position: absolute;
      bottom: 88px;
      left: 0;
      width: 100vw;
      height: 45px;
      opacity: 0;
      z-index: 10;
    }
  }
}
</style>